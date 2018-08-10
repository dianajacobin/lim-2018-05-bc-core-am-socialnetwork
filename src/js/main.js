// REGISTRO EMAIL / PASSWORD
const btnRegistro = document.getElementById('btnRegistro');
if (btnRegistro) {
  btnRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    if (inputEmail.value.trim().length === 0 || inputPassword.value.trim().length === 0) {
      showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value)
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
  });
}
// LOGIN EMAIL / PASSWORD
const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
  btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');
    if (inputEmail.value.trim().length === 0 || inputPassword.value.trim().length === 0) {
      showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
      return;
    }
    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value)
      .then((result) => {
        writeUserData(result.user);
      })
      .catch((error) => {
        showMessage('dangerMessage', error.message);
      });
  });
}
// Inicio de Sesión con FACEBOOK
const btnFacebook = document.getElementById('btnFacebook');
if (btnFacebook) {
  btnFacebook.addEventListener('click', (e) => {
    e.preventDefault();
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        writeUserData(result.user);
      });
  });
}
// Inicio de Sesión con GOOGLE
const btnGoogle = document.getElementById('btnGoogle');
if (btnGoogle) {
  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        writeUserData(result.user);
      });
  });
}
// Cerrar Sesión
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        location.href = 'index.html';
      });
  });
}
//  guardando los datos en database
const writeUserData = (user) => {
  const userData = {
    uid: user.uid,
    displayName: user.displayName === null ? user.email : user.displayName,
    photoURL: user.photoURL === null ? 'https:// freeiconshop.com/wp-content/uploads/edd/chef-outline.png' : user.photoURL
  }
  firebase.database().ref('users/' + userData.uid).set(userData, function (error) {
    if (error) {
      alert('ocurrio un error: ');
    } else {
      location.href = 'muro.html';
    }
  });
}
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