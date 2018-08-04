//creación de nuevo post
const writeNewPost = (uid, mensaje,privacidad, likes) => {
  const postData = {
    uid: uid,
    mensaje: mensaje,
    privacidad:privacidad,
    likes:likes,
  };  
// Get a key for a new Post
let newPostKey = firebase.database().ref().child('posts').push().key;
// Write the new post's data simultaneously in the posts list and the user's post list.
let updates = {};
updates['/posts/' + newPostKey] = postData;
updates['/user-posts/' + uid + '/' + newPostKey] = postData;

return firebase.database().ref().update(updates);
}

//Eliminar post
const deletePost = (newPostKey) => {
if (confirm('¿Estas Seguro de Eliminar tu publicaión?'))
  {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref().child('/posts/' + newPostKey).remove();
      firebase.database().ref().child('/user-posts/' + uid + '/' + newPostKey).remove();
      while (posts.firstChild)posts.removeChild(posts.firstChild);
      window.location.reload();
  }
else {alert('Se procedió a cancelar la eliminación');}  
}

// likes


// pintar las publicaciones
const showPost = () => { 
  firebase.database().ref('posts/')
  .on('value', (postsRef) =>{
    const posts = postsRef.val();
    const content = document.getElementById('content');
    content.innerHTML='';
    let userId = firebase.auth().currentUser.uid;
    const crud = (id) => {
      return `<div class="crud">
      <button onclick="postEdit('${id}')" class="btnSave"></button>
      <button onclick="editPost('${id}')" class="btnEdit"></button>
      <button onclick="deletePost('${id}')" id="btnDelete"></button>
      </div>`
    }
  })
  ;
}
                   
   