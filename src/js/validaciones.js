//Login de Usuario
 window.validationLogin = (emaiLogin,passwordLogin) => {  
    if (emaiLogin == '' || passwordLogin == '') {
        alert(':( Por favor completa tu email y password para loguearte !!');
    }
  }
//Registrar Usuario
window.validationRegister = () => {
        if (email == '' || password == '') {
            alert(' :( Por favor completa tu email y password para registrarte');
        }
    }
//creacion de database 
function writeUserData(userId, name, email, imageURL) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageURL,
    });
}
//creación de nuevo post
function writeNewPost(uid, body) {
    var postData = {
        uid: uid,
        body: body,
    };
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var updates = {};
        //se almacenan posts
        updates['/posts/' + newPostKey] = postData;
        //se almacenan post por usuario
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        firebase.database().ref().update(updates);
        return newPostKey;
}
