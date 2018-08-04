//login de usuario existente
const emaiLogin = document.getElementById('emaiLogin');
const passwordLogin = document.getElementById('passwordLogin');
const btnLogin = document.getElementById('btnLogin');
//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");
//Post
const bd = document.getElementById("bd");
const post = document.getElementById("post");
const btnSave = document.getElementById("btnSave");
const selector = document.getElementById("sel");
//Registro de usuario nuevo
const registerUser = document.getElementById("registerUser");
const btnGoogle = document.getElementById("btnGoogle");
const btnFacebook = document.getElementById("btnFacebook");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnUp = document.getElementById("btnUp");

//cambio de registro a inicio de Sesion
const translateToRegister = document.getElementById('translateToRegister');
const ingresoUser = document.getElementById('ingresoUser');
const translateToIngreso = document.getElementById('translateToIngreso');


translateToRegister.addEventListener('click', ()=>{
  registerUser.classList.remove('show');
  registerUser.classList.add('hiden');
  ingresoUser.classList.remove('hiden')
  ingresoUser.classList.add('show')
});

translateToIngreso.addEventListener('click', ()=>{
  registerUser.classList.add('show');
  registerUser.classList.remove('hiden');
  ingresoUser.classList.add('hiden')
  ingresoUser.classList.remove('show')
});



window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      alert('logueado');
            registerUser.classList.add("hiden");
            registerUser.classList.remove("show");
            bd.classList.remove("hiden");
            posts.classList.remove("hiden");
            login.classList.remove("hiden");
            ingresoUser.classList.add('hiden')
            ingresoUser.classList.remove('show')
            console.log('Inicio logueado');
            console.log(user);
            username.innerHTML = `Bienvenida  ${user.displayName}`;
          } else {
            console.log('No está logueado');
            registerUser.classList.remove("hiden");
            login.classList.add("hiden");
            posts.classList.add("hiden");
            bd.classList.add("hiden");
          }

    })
  }


btnUp.addEventListener('click', ()=>{
  registerVal(email.value, password.value);
});

btnLogin.addEventListener('click', ()=>{
  ingresoVal(emaiLogin.value, passwordLogin.value);
});

btnLogout.addEventListener('click', ()=> {
  close();
      console.log('Cerró sesión');
      login.classList.remove("hiden");
      registerUser.classList.add("hiden");
});

btnGoogle.addEventListener('click', ()=>{
  gmailLogin();
})
btnFacebook.addEventListener('click', ()=>{
  facebookLogin();
}) 