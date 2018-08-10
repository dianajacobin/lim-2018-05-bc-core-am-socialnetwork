expresionCorreo = /\w+@[a-z]+\.+[a-z]/;

const loginValidation = (email,password) => {
  if (email.length === 0 || password.length === 0) {   
    return false;
  }
}
const emailValidation = (email) => {    
      if (!expresionCorreo.test(email)){
        return false;   
      }
    }
const passwordValidation = (password) => {
  if (password.length<7){ 
    return false; 
  }
 }
const successfulValidation = (email,password) => {
  if (email.length !== 0 && password.length !== 0 && expresionCorreo.test(email)&&password.length>6){
    return true;
  }
 }
const registroValidation = (email,password)=>{
  if (email.length === 0 || password.length === 0) {
    showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return;
  }  
  if (!expresionCorreo.test(email)){
    alert('El correo electrónico no es valido'); 
    return;   
  }
  if (password.length<7){
    alert('La contraseña debe ser mayor de 6 caracteres'); 
    return; 
  }
  else {
    registro(email,password);
  }
}

window.emailValidation = emailValidation;
window.registroValidation = registroValidation;