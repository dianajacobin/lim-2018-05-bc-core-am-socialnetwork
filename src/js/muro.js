
let currentUser = {};

window.onload = () => {
    verificateUserAuth();
}

const verificateUserAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
                if(snapshot.val()){
                    currentUser.uid = snapshot.val().uid;
                    currentUser.displayName = snapshot.val().displayName;
                    currentUser.photoURL = snapshot.val().photoURL;

                    let userImage = document.getElementById('userImage');
                    userImage.src = currentUser.photoURL;

                    listAllPost();
                }else{
                    console.log("no hay datos del usuario autenticado");
                }
            });
        }else{
            location.href = '/index.html';
        }
    }); 
};

const btnSave = document.getElementById("btnSave");
if(btnSave){
    btnSave.addEventListener('click',()=>{
        let post = document.getElementById('post');
        let mensaje = post.value;
        if(mensaje.trim().length == 0){
            alert('Debes ingresar un mensaje!');
            return;
        }
        const isPublic = document.getElementById('sel').value === 'Publico' ? true : false ;
        writeNewPost(currentUser.uid, currentUser.displayName, currentUser.photoURL, mensaje.trim(), isPublic, 0);
        post.value = '';
    });
}

//creación de nuevo post
const writeNewPost = (uid, displayName, photoURL, mensaje, isPublic, likes) => {
    const postData = {
      uid: uid,
      displayName: displayName,
      photoURL: photoURL,
      mensaje: mensaje,
      isPublic: isPublic,
      likes: likes
    };  
    // Get a key for a new Post
    let newPostKey = firebase.database().ref().child('posts').push().key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    let updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    listAllPost();
}

//creación de nuevo post
const editar = (userUid, postUid) => {
    const postData = {
        uid: userUid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        mensaje: document.getElementById('post-'+postUid).value,
        isPublic: document.getElementById('sel').value === 'Publico' ? true : false ,
        likes: 0
    };  
    let updates = {};
    updates['/posts/' + postUid] = postData;
    updates['/user-posts/' + userUid + '/' + postUid] = postData;

    firebase.database().ref().update(updates);
    listAllPost();
}

const eliminar = (userUid, postUid) => {
    if (confirm('¿Estas Seguro de Eliminar tu publicación?')){
        firebase.database().ref().child('/posts/' + postUid).remove();
        firebase.database().ref().child('/user-posts/' + userUid + '/' + postUid).remove();
        listAllPost();
    }else{
       console.log('Se procedió a cancelar la eliminación');
    }
}

const listAllPost = () => {
    let data = '';
    let postRef = firebase.database().ref('posts/');
    postRef.on('value', function(snapshot){
        let allPosts = document.getElementById('allPosts');
        const posts = snapshot.val();
        if(posts){
            const postKeys = Object.keys(posts);
            postKeys.forEach( (post, index) => {
                data += `
                        <div class="row justify-content-center postSolo">
                            <div class="col-2">
                            <img id="userImage" src="${posts[post].photoURL}" height="44" width="44" >
                            </div>
                            <div class="col-10">
                            <form action="">
                                <div class="row divTextArea">
                                    <textarea  id="post-${postKeys[index]}" name="Publicacion" class="form-control input-contrast comment-form-textarea">${posts[post].mensaje}</textarea>
                                </div>
                                ${ posts[post].uid === currentUser.uid ? `
                                    <div class="row divTextAreaActions">
                                        <div class="col-12">
                                            <input id="btnEditar" type="button" class="btn btn-primary" value="Editar" onClick="editar('${currentUser.uid}','${postKeys[index]}')">
                                            <input id="btnEliminar" type="button" class="btn btn-primary" value="Eliminar" onClick="eliminar('${currentUser.uid}','${postKeys[index]}')">
                                        </div>
                                    </div>
                                ` : '' }
                            </form>
                            </div>  
                            </div>  
                    `;
        
            });
            allPosts.innerHTML = data;
        }else {
            allPosts.innerHTML = 'No hay posts ;(';
        }
    });
  }

