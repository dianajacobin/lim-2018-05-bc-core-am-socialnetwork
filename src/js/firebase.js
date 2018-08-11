const config = {
  apiKey: 'AIzaSyDlyPsTR7Jo4y0aSUIipN_NooO8HtqJexY',
  authDomain: 'fir-c6242.firebaseapp.com',
  databaseURL: 'https://fir-c6242.firebaseio.com',
  projectId: 'fir-c6242',
  storageBucket: 'fir-c6242.appspot.com',
  messagingSenderId: '482129686898'
};
firebase.initializeApp(config);

const registro = (email,password) =>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification()
        .then(() => {
          let emailMessage = document.getElementById('emailMessage');
          emailMessage.classList.remove("hiden");
          emailMessage.classList.add("show");
          emailMessage.innerHTML = 'Te hemos enviado un e-mail para activar tu cuenta';
        });
      writeUserData(result.user);
    }).catch((error) => {
    showMessage('dangerMessage', error.message);
    });
}

const login = (email,password) => {
  firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value)
    .then((result) => {
    writeUserData(result.user);
  }).catch((error) => {
  showMessage('dangerMessage', error.message);
  });
}

const facebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      writeUserData(result.user);
    });
}

const google = () => {
 // e.preventDefault();
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      writeUserData(result.user);
    });
}

const logout = () => {
  firebase.auth().signOut()
    .then(() => {
      location.href = 'index.html';
    });
}
// Guardando los datos en database
const writeUserData = (user) => {
  const userData = {
    uid: user.uid,
    displayName: user.displayName === null ? user.email : user.displayName,
    photoURL: user.photoURL === null ? 'https://freeiconshop.com/wp-content/uploads/edd/chef-outline.png' : user.photoURL
  }
  firebase.database().ref('users/' + userData.uid).set(userData, function (error) {
    if (error) {
      alert('ocurrio un error: ');
    } else {
      location.href = 'muro.html';
    }
  });
}
// mensaje
const showMessage = (element, message) => {
  let myElement = document.getElementById(element);
  if (myElement) {
    myElement.innerHTML = message;
    myElement.classList.remove('hiden');
    myElement.classList.add('show');
    setTimeout(() => {
      myElement.classList.remove('show');
      myElement.classList.add('hiden');
    }, 5000);
  }
}