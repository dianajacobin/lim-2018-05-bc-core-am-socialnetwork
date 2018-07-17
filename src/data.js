//Registro de Usuarios
const registrar = () => {
    let email = document.getElementById('email').value,
    password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( () => verificar() )
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
}

//Login de Usuarios existentes  
const ingresar = () => {
    let emailLogin = document.getElementById('emailLogin').value,
    passwordLogin = document.getElementById('passwordLogin').value;
    // FIREBASE
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });  
}

//verificación de la existencia del usuario
const observador = () =>{
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('Existe Usuario Activo');
        show(user); // User enviamos como parametro en la funcion show
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      console.log('*************');
      console.log(user.emailVerified);
      console.log('*************');
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
        console.log('No Existe Usuario Activo');
      // User is signed out.
      // ...
    }
  });
}
observador();

// Usuario logeado ve el siguiente contenedor
const show = (user) =>{
var user = user;    
let contenido = document.getElementById('contenido');
if(user.emailVerified){
    contenido.innerHTML =`<p>Bienvenida!!</p>
    <button onclick="cerrar()">Cerrar Sesión</button>`;
    }
}

// cuando el usuario este logueado podra Cerrar sesión
const cerrar = () =>{
    firebase.auth().signOut()
    .then(()=>{
        console.log('saliendo...');
    })
    .catch((error)=>{
    console.log(error);
    }) 
}

//Envio de Mensaje de verificacion del usuario
const verificar = () =>{
var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('Enviado Correo ...');
}).catch(function(error) {
  // An error happened.
  console.log('Error!');
});
}