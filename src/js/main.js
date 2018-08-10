const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const btnRegistro = document.getElementById('btnRegistro');
const btnLogin = document.getElementById('btnLogin');
const btnFacebook = document.getElementById('btnFacebook');
const btnGoogle = document.getElementById('btnGoogle');
const btnLogout = document.getElementById('btnLogout');

// REGISTRO EMAIL / PASSWORD
if (btnRegistro) {
  btnRegistro.addEventListener('click', (e) => {
  e.preventDefault();
  registroValidation(inputEmail.value, inputPassword.value);
  });
}
// LOGIN EMAIL / PASSWORD
if (btnLogin) {
  btnLogin.addEventListener('click', (e) => { ;
  e.preventDefault();
  emailValidation(inputEmail.value, inputPassword.value); })
}
// FACEBOOK
if (btnFacebook) {
  btnFacebook.addEventListener('click', (e) => {
  e.preventDefault();
  facebook();
  });
}
// GOOGLE
if (btnGoogle) {
  btnGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    google();
  });
}
// Cerrar Sesión
if (btnLogout) {
  btnLogout.addEventListener('click', (e) => {
  e.preventDefault(); 
  logout();
  });
}
