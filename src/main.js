const registerVal = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      writeUserData(result.user);
      verificar();
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    });
};

const ingresoVal = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result)=>{
    //loginValidacion();
    //var user = result.user;
    //writeUserData(user);
    verificateUserAuth();
  })
  .catch((error) => {
  let errorCode = error.code;
  let errorMessage = error.message;
  alert('Error en firebase'+ errorCode);
  alert('Error en firebase'+ errorMessage);
  });
};

const close = () => {
    firebase.auth().signOut()
    .then(()=>{
      console.log('Saliendo...');
    }).catch((error) => {
      console.log(error);
    });
};

const verificar = () => {
  let user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    let emailMessage = document.getElementById('emailMessage');
    emailMessage.classList.remove("hiden");
    emailMessage.classList.add("show");
    emailMessage.innerHTML = 'Te hemos enviado un e-mail para activar tu cuenta';
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
      writeUserData(result.user);
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
    writeUserData(result.user);
  });
};

// guardando los datos en database
const writeUserData = (user) => {

  const userData = {
    uid: user.uid,
    displayName: user.displayName === null ? user.email : user.displayName,
    photoURL: user.photoURL === null ? 'https://freeiconshop.com/wp-content/uploads/edd/chef-outline.png' : user.photoURL
  }
  
  firebase.database().ref('users/' + userData.uid).set(userData, function(error){
    if(error){
      console.log('ocurrio un error: ', error);
    }else{
      console.log('save success!');
    }
  });
}
   