const registerVal = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      alert('confirma tu correo electronico')
       const user = {
         uid: result.user.uid,
         displayName: result.user.email,
         email: result.user.email,
         photoURL: 'https://freeiconshop.com/wp-content/uploads/edd/chef-outline.png',
       }
      console.log(user);
      writeUserData(user);
      verificar();
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    });
};
//
const ingresoVal = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    loginValidacion();
  })
  .catch((error) => {
  let errorCode = error.code;
  let errorMessage = error.message;
  alert('Error en firebase >'+ errorCode);
  alert('Error en firebase >'+ errorMessage);
  });
};

const close = () => {
    firebase.auth().signOut()
    .then(()=>{
      alert('Saliendo...');
    }).catch((error) => {
      console.log(error);
    });
};

const verificar = () => {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('enviando correo');
  }).catch((error) => {
    console.log(error);
  });
};

const facebookLogin = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
  'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      writeUserData(user);
  }).catch((error)=> {
    alert('err'+error.message);
    console.log(error.code);
    console.log(error.message);
    console.log(error.email);
    console.log(error.credential);
});
};

const gmailLogin = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result)=> {
    var user = result.user;
    writeUserData(user);
  });
};

// guardando los datos en database
const writeUserData = (user) => {
  firebase.database().ref('users/' + user.uid).set(user);
}
   
