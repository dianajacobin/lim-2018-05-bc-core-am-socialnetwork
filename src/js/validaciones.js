window.loginSign = (email, password) => {
    let expRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let start = {
        email: false,
        password: false
    }
    start.email = email !== "" && expRe.test(email);
    start.password = password !== "" && password !== null;
    return start;
}
//Validando Registro de usuario
window.register = (email, password) => {
    let expRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let start = {
        email: false,
        password: false
    }
    start.email = email !== "" && expRe.test(email);
    start.password = password !== "" && password !== null;
    return start;
}
//Validando longitus mínima de la contraseña
window.passwordLength = (password) => {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }
  