expresionCorreo = /\w+@[a-z]+\.+[a-z]/;

const registroValidation = (email,password)=>{
  if (email.length === 0 || password.length === 0) {
    // showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return false;
   }  
   if (!expresionCorreo.test(email)){
   //  alert('El correo electrónico no es valido'); 
   return false;
   }
   if (password.length<7){
   //  alert('La contraseña debe ser mayor de 6 caracteres'); 
   return false;
  }
  else {
    //registro(email,password);
    return true; 
  }
}

const emailValidation = (email,password)=>{
  if (email.length === 0 || password.length === 0) {
   // showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return false;
  }  
  if (!expresionCorreo.test(email)){
  //  alert('El correo electrónico no es valido'); 
    return false;   
  }
  if (password.length<7){
  //  alert('La contraseña debe ser mayor de 6 caracteres'); 
    return false; 
  }
  else {
    //login(email,password);
    return true;
  }
}

window.emailValidation = emailValidation;
window.registroValidation = registroValidation;