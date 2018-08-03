//Inicio de Sesión
const emaiLogin = document.getElementById('emaiLogin');
const passwordLogin = document.getElementById('passwordLogin');
const btnLogin = document.getElementById('btnLogin');
//Registro de usuario
const registerUser = document.getElementById("registerUser");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnUp = document.getElementById("btnUp");
//Redes Sociales
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
//Post
const bd = document.getElementById("bd");
const post = document.getElementById("post");
const btnSave = document.getElementById("btnSave");
//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");

btnLogin.addEventListener('click', () => {validationLogin(emaiLogin.value,passwordLogin.value);});
btnUp.addEventListener('click', () => {validationRegister(email.value,password.value);});
btnFacebook.addEventListener('click', loginFace);
btnGoogle.addEventListener('click', loginGoogle );
//Post
//btnSave.addEventListener('click', () => {});
//btnLike.addEventListener('click', () => {});
//btnDelete.addEventListener('click', () => {});
//btnUpdate.addEventListener('onclick', () => {});
//btnLogout.addEventListener('click', () => {});
//Cerrar Sesion
btnLogout.addEventListener('click', logout);