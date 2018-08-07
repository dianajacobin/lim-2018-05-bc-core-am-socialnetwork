const config = {
  apiKey: "AIzaSyDlyPsTR7Jo4y0aSUIipN_NooO8HtqJexY",
  authDomain: "fir-c6242.firebaseapp.com",
  databaseURL: "https://fir-c6242.firebaseio.com",
  projectId: "fir-c6242",
  storageBucket: "fir-c6242.appspot.com",
  messagingSenderId: "482129686898"
};

firebase.initializeApp(config);

//REGISTRO EMAIL / PASSWORD
const btnRegistro = document.getElementById('btnRegistro');
if(btnRegistro){
  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');

    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value)
      .then((result) => {
        console.log('CREATE USER/PASSWORD SUCCESS: ',result);
        const user = firebase.auth().currentUser;
        user.sendEmailVerification()
        .then(() => {
          console.log('SEND EMAIL SUCCESS');
          let emailMessage = document.getElementById('emailMessage');
          emailMessage.classList.remove("hiden");
          emailMessage.classList.add("show");
          emailMessage.innerHTML = 'Te hemos enviado un e-mail para activar tu cuenta';
        }).catch((error) => {
          console.error('SEND EMAIL ERROR: ',error);
        });
        writeUserData(result.user);
    }).catch((error) => {
      console.error('CREATE USER/PASSWORD ERROR: ', error);
    });

  });
}

//LOGIN EMAIL / PASSWORD
const btnLogin = document.getElementById('btnLogin');
if(btnLogin){
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
  
    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value)
      .then((result)=>{
        console.log('USER/PASSWORD SUCCESS: ',result);
        writeUserData(result.user);
      })
      .catch((error) => {
        console.error('USER/PASSWORD ERROR: ', error);
      });
  
  });
}

//LOGIN FACEBOOK
const btnFacebook = document.getElementById('btnFacebook');
if(btnFacebook){
  btnFacebook.addEventListener('click', (e) => {
    e.preventDefault();
  
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
      });
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log('FACEBOOK SUCCESS: ',result);
        writeUserData(result.user);
      }).catch((error)=> {
        console.error('FACEBOOK ERROR: ', error);
      });  
  });
}

//LOGIN GOOGLE
const btnGoogle = document.getElementById('btnGoogle');
if(btnGoogle){
  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
  
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result)=> {
        console.log('GOOGLE SUCCESS: ',result);
        writeUserData(result.user);
      })
      .catch((error)=> {
        console.error('GOOGLE ERROR: ', error);  
      });
  });
}

//LOGOUT
const btnLogout = document.getElementById('btnLogout');
if(btnLogout){
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
  
    firebase.auth().signOut()
      .then(()=> {
        console.log('LOGOUT SUCCESS');
        location.href = '/index.html';
      })
      .catch((error)=> {
        console.error('LOGOUT ERROR: ', error);  
      });
  
  });
}


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
      location.href = '/muro.html';
    }
  });
}