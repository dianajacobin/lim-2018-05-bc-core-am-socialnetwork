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

  return firebase.database().ref().update(updates);
}

//Eliminar post
const deletePost = (newPostKey) => {
 if (confirm('¿Estas Seguro de Eliminar tu publicaión?'))
    {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref().child('/posts/' + newPostKey).remove();
        firebase.database().ref().child('/user-posts/' + uid + '/' + newPostKey).remove();
        while (posts.firstChild)posts.removeChild(posts.firstChild);
        window.location.reload();
    }
else {alert('Se procedió a cancelar la eliminación');}  
}

// likes


// pintar las publicaciones
const showPost = () => { 
    firebase.database().ref('posts/')
    .on('value', (postsRef) =>{
      const posts = postsRef.val();
      const content = document.getElementById('content');
      content.innerHTML='';
      let userId = firebase.auth().currentUser.uid;
      const crud = (id) => {
        return `<div class="crud">
        <button onclick="postEdit('${id}')" class="btnSave"></button>
        <button onclick="editPost('${id}')" class="btnEdit"></button>
        <button onclick="deletePost('${id}')" id="btnDelete"></button>
        </div>`
      }
    })
    ;
}

const listAllPost = () => {
  let data = '';
  let postRef = firebase.database().ref('posts/');
  postRef.on('value', function(snapshot){
    const posts = snapshot.val();
    const postKeys = Object.keys(posts);

    postKeys.forEach( post => {
      
       data += `
                <div class="row justify-content-center hiden postSolo">
                  <div class="col-2">
                    <img id="userImage" src="${posts[post].photoURL}" height="44" width="44" >
                  </div>
                  <div class="col-10">
                    <form action="">
                        <div class="row divTextArea">
                            <textarea  id="post" name="Publicacion" class="form-control input-contrast comment-form-textarea">
                              ${posts[post].mensaje}
                            </textarea>
                        </div>
                        <div class="row divTextAreaActions">
                            <div class="col-12">
                                <input id="btnEditar" type="button" class="btn btn-primary" value="Editar">
                                <input id="btnEliminar" type="button" class="btn btn-primary" value="Eliminar">
                            </div>
                        </div>
                    </form>
                    </div>  
                  </div>  
                  
          `;

    });
    let allPosts = document.getElementById('allPosts');
    allPosts.innerHTML = data;

  });

}
                     
     