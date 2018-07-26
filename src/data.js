//login de usuario existente
const emaiLogin = document.getElementById('emaiLogin');
const passwordLogin = document.getElementById('passwordLogin');
const btnLogin = document.getElementById('btnLogin');
//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");
//Post
const bd=document.getElementById("bd");
const post = document.getElementById("post");
const btnSave= document.getElementById("btnSave");
//Registro de usuario nuevo
const registerUser = document.getElementById("registerUser");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnUp = document.getElementById("btnUp");

//const textarea = document.getElementById("textarea");
expresionCorreo = /\w+@[a-z]+\.+[a-z]/;
//if((expresionCorreo.test(email.value)))

window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            registerUser.classList.add("hiden");
            bd.classList.remove("hiden");
            posts.classList.remove("hiden");
            login.classList.remove("hiden");       
            console.log('Inicio logueado');
            console.log(user);
            username.innerHTML = `Bienvenida  ${user.displayName}`;
           // photoURL.innerHTML =`<img src= user.photoURL.value>`;
            //"http://subirimagen.me/uploads/20180717121119.jpg"
           //https://graph.facebook.com/10209691428881959/picture
            //`${user.photoURL}`.appendChild(photoURL);
        } else {
            console.log('No está logueado');
            registerUser.classList.remove("hiden");
            login.classList.add("hiden");
            posts.classList.add("hiden");
            bd.classList.add("hiden");
        }
    });
}

//Verificacion de correo
const validation=()=>{
    var user = firebase.auth().currentUser;
   user.sendEmailVerification().then(function() {
       console.log('enviando correo');
   }).catch(function(error) {
       console.log('error!');
   });
}

//Registrar Usuario
btnUp.addEventListener('click', () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(
                (result)=> {
                ()=>validation(),
            console.log('Se creó el usuario')
            var user= result.user;
            //writeUserData recibe parametros 
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
            })
        .catch(function (error) {
            console.log(error.code, error.message)
        });
         if (email.value ==''||password.value==''){
         alert(' :( Por favor completa tu email y password para registrarte');
    }    

   
})
//Login de Usuario
btnLogin.addEventListener('click', () => {
    firebase.auth().signInWithEmailAndPassword(emaiLogin.value, passwordLogin.value)
        .then(function () {
            console.log('Inicia Sesion')
        })
        .catch(function (error) {
            console.log(error.code, error.message)
        });

        if (emaiLogin.value ==''||passwordLogin.value==''){
            alert(':( Por favor completa tu email y password para loguearte !!');
        }
        
        else if (!expresionCorreo.test(emaiLogin.value)){
            alert('El correo electrónico no es valido');    
        }
 
})
//Cerrar Sesión 
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Cerró sesión');
        login.classList.remove("hiden");
        registerUser.classList.add("hiden");
    })
        .catch(function (error) {
            console.log('Error al cerrar sesión');
        })
})
//Login con Google
btnGoogle.addEventListener('click', ()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
    'display' : 'popup'
    });
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
       console.log('Sesión con Google')
       console.log(result);
       var user= result.user;
       console.log(user);
       //writeUserData recibe parametros 
       writeUserData(user.uid, user.displayName, user.email, user.photoURL);
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
        });
})

//Login con Facebook
btnFacebook.addEventListener('click', ()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
    'display' : 'popup'
    });
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
       console.log('Sesión con Facebook')
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
//creacion de database 
function writeUserData(userId, name, email, imageURL){
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageURL,
    });
}
//creación de nuevo post
function writeNewPost(uid, body){
    var postData = {
        uid: uid,
        body : body,
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
   // edita post
    var updates ={ };
    //se almacenan posts
    updates['/posts/' + newPostKey] = postData;
    //se almacenan post por usuario
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
   firebase.database().ref().update(updates);
    return newPostKey;
    console.log(newPostKey);
}

// guarda cambios de edicion del post
btnSave.addEventListener('click', ()=>{
 //userId va a capturar los usuarios logueados
 var userId = firebase.auth().currentUser.uid;
 var userNom = firebase.auth().currentUser.displayName;
 //newpost ...al crear post me genera un key en firebase, retorna y asigno al usuario
 const newPost = writeNewPost(userId, post.value, userNom);
console.log(userNom); 
 //imprimiendo en DOM
 //var logo = document.createElement("img");
 //logo.setAttribute("src", "http://subirimagen.me/uploads/20180717121119.jpg");
 
 var nomUsuario = document.createElement("label");
       nomUsuario.setAttribute("for", "");
        nomUsuario.setAttribute("type", "label");

 var btnUpdate = document.createElement("input");
       btnUpdate.setAttribute("value", "Update");
       btnUpdate.setAttribute("type", "button");

 var btnDelete = document.createElement("input");
       btnDelete.setAttribute("value","Delete");
       btnDelete.setAttribute("type","button");

 var contPost = document.createElement('div');
 //var textPost = document.createElement('p');
 var textPost = document.createElement('textarea');
 textPost.setAttribute("id", newPost);
 textPost.innerHTML= post.value;
 nomUsuario.innerHTML = userNom + "  publicó...";
 textPost.disabled= true;

btnDelete.addEventListener('click', ()=>{
    //esto es en base de datos  
    //esta eliminando todos los post.. PERO SOLO QUIERO ELIMINAR EL QUE ELIJA  
    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    firebase.database().ref().child('posts/' +  newPost).remove();
     //para el html 
     //mientras haya un hijo en post, remueve
     //DOM
     while(posts.firstChild) posts.removeChild(posts.firstChild);
    // alert('El usuario ha sido eliminado con éxito!');
    // reload_page();
    });

    btnUpdate.addEventListener('click',()=>{
        textPost.disabled= false;
        btnUpdate.setAttribute("value", "Guardar"); 
       const newUpdate = document.getElementById(newPost);
        //alert("El post ha sido modificado correctamente");     
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
     //contPost.appendChild(logo);
    contPost.appendChild(nomUsuario);
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    posts.appendChild(contPost);
    //var nomUsuario = document.createElement('style')
    //nomUsuario.innerHTML = "label {border: 2px solid black; background-color: blue;}";
   //document.body.appendChild(nomUsuario);
})

function reload_page(){
    window.location.reload();
}


