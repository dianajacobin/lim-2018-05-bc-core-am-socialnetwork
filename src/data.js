const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");

const email = document.getElementById("email");
const password = document.getElementById("password");
const btnSignin = document.getElementById("btnSignin");

const btnLogout = document.getElementById("btnLogout");
const btnRegistro = document.getElementById("btnRegistro");


const bd=document.getElementById("bd");
const btnSave= document.getElementById("btnSave");

const posts= document.getElementById("posts");
const logout = document.getElementById("logout");


const post = document.getElementById("post");



window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            login.classList.remove("hiden");
            bd.classList.remove("hiden");
            posts.classList.remove("hiden");
            logout.classList.add("hiden");
            console.log('Inicio logueado');
            console.log(user);
            username.innerHTML = `Bienvenida  ${user.displayName}`;
            //photoURL.innerHTML = user.photoURL;
        } else {
            console.log('No está logueado')
            login.classList.add("hiden");
            logout.classList.remove("hiden");
            posts.classList.add("hiden");
            bd.classList.add("hiden");
        }
    });
}

btnRegistro.addEventListener('click', () => {

    // Registrar Usuario FIREBASE
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log('Se creó el usuario')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        });
})

btnSignin.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(function () {
            console.log('Inicia Sesion')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        });
})

btnLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Cerró sesión');
        login.classList.remove("hiden");
        logout.classList.add("hiden");
    })
        .catch(function (error) {
            console.log('Error al cerrar sesión');
        })
})

btnGoogle.addEventListener('click', ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
    'display' : 'popup'
    });
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
       console.log('Sesión con Google')
       var user= result.user;
       //writeUserData recibe parametros 
       writeUserData(user.uid, user.displayName, user.email, user.photoURL);
      }).catch(function(error) {
       
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
     
      });

})

btnFacebook.addEventListener('click', ()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
    'display' : 'popup'
    });
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
       console.log('Sesión con Facebook')
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
     
      });

})


function writeUserData(userId, name, email, imageURL){
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageURL
    });
}

function writeNewPost(uid, body){
    var postData = {
        uid: uid,
        body : body,
    };

    var newPostKey = firebase.database().ref().child('posts').push().key;

    var updates ={};
    //se almacenan posts
    updates['/posts/' + newPostKey] = postData;
    //se almacenan post por usuario
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    firebase.database().ref().update(updates);
    return newPostKey;
}

btnSave.addEventListener('click', ()=>{
    var userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Update");
    btnUpdate.setAttribute("type", "button");
    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value","Delete");
    btnDelete.setAttribute("type","button");
    var contPost = document.createElement('div');
    var textPost = document.createElement('textarea');
    textPost.setAttribute("id", newPost);

    textPost.innerHTML= post.value;

    btnDelete.addEventListener('click', ()=>{
        //esto es en base de datos  
        //esta eliminando todos los post.. PERO SOLO QUIERO ELIMINAR EL QUE ELIJA  
        firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
        firebase.database().ref().child('posts/' +  newPost).remove();
     //para el html
     //mientras haya un hijo en post, remueve
     //DOM
     while(posts.firstChild) posts.removeChild(posts.firstChild);

     alert('El usuario ha sido eliminado con éxito!');
     reload_page();

    });

    btnUpdate.addEventListener('click',()=>{
        const newUpdate = document.getElementById(newPost);
        const nuevoPost ={
        body : newUpdate.value,
        };

        var updatesUser = {};
        var updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        updatesPost['/posts/' + newPost] = nuevoPost;

        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);
    })
})

function reload_page(){
    window.location.reload();
}


//1.48 video