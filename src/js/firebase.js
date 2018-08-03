// Initialize Firebase
const config = {
  apiKey: "AIzaSyDlyPsTR7Jo4y0aSUIipN_NooO8HtqJexY",
  authDomain: "fir-c6242.firebaseapp.com",
  databaseURL: "https://fir-c6242.firebaseio.com",
  projectId: "fir-c6242",
  storageBucket: "fir-c6242.appspot.com",
  messagingSenderId: "482129686898"
};
firebase.initializeApp(config);

window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
       //   window.location= 'main.html';
            console.log('Inicio logueado');
            console.log(user);
            //username.innerHTML = `Bienvenida  ${user.displayName}`;
        } else {
            console.log('No está logueado');
        }
    });
}
// Registro de usuario (creando cuenta vía email, password)
window.signUp = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                console.log(password);
                console.log('Se creó el usuario');
                window.location.href = 'muro.html'
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, error.message);
            });
};
//Inicio de Sesión via email y password
window.signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(emaiLogin, passwordLogin)
    .then((user)=>{
        console.log('user');
        console.log('Inicia Sesion');
        window.location.href = 'muro.html';
    })
    .catch((error)=> {
        console.log(error.code, error.message)
    });
}


window.loginGoogle = () => {
const provider = new firebase.auth.GoogleAuthProvider();
    /* provider.setCustomParameters({
        'display': 'popup'
    }); */
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('Sesión con Google', result);
            let user = result.user;
            //writeUserData recibe parametros 
            writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
    }
    //Sig
window.loginFace = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
  /*   provider.setCustomParameters({
        'display': 'popup'
    }); */
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log('Sesión con Facebook', result);
        }).catch((error) => {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
}

