// btn Eliminar post
btnDelete.addEventListener('click', () => {

    if (window.confirm("¿Estás seguro de eliminar tu publicación?") == true) {
        //elimino de los post de la base de datos  
        firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
        firebase.database().ref().child('posts/' + newPost).remove();
        //DOM
        const dbRef = firebase.database().ref();
        const userPostsRef = dbRef.child('user-posts');
        //elimina todos los posts solo en js
        while (posts.firstChild)
            posts.removeChild(posts.firstChild);
        alert('El usuario ha sido eliminado con éxito!');
        userPostsRef.on("child_added", snap => {
            let userPost = snap.val();
            console.log("USER POST:")
            console.log(userPost);
            snap.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val().mensaje;
                console.log("childData");
                console.log(childData);
                console.log("childKey");
                console.log(childKey);
                addPost(newPost, childData, userId, userNom);
            });
        });

    }
    else {
        alert("Se procedió a cancelar");
    }


});


const addPost = (newPost, post_value, userId, userNom) => {
    const nomUsuario = document.createElement("label");
    nomUsuario.setAttribute("for", "");
    nomUsuario.setAttribute("type", "label");
    const btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Modificar");
    btnUpdate.setAttribute("type", "button");
    const btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");
    const cantLikes = document.createElement("label");
    cantLikes.setAttribute("for", "");
    cantLikes.setAttribute("type", "label");
    const imagenLike = document.createElement("IMG");
    imagenLike.setAttribute("src", "http://subirimagen.me/uploads/20180724110439.png");
    const contPost = document.createElement('div');
    const textPost = document.createElement('textarea');
    textPost.setAttribute("id", newPost);
    textPost.innerHTML = post_value;
    nomUsuario.innerHTML = userNom + "  publicó...";
    textPost.disabled = true;
    const contador = 0;
    imagenLike.addEventListener('click', () => {
       if (userId = 0) {
            console.log("Debe estar logueado");
        }
        else {
            contador++;
            if (contador == 1) {
                cantLikes.innerText = contador;
            }
            else {
                alert("Solo puedes dar 1 like");
            }

        }
    });

    btnDelete.addEventListener('click', () => {
        if (window.confirm("¿Estás seguro de eliminar tu publicación?") == true) {
            //esto es en base de datos  
            firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
            firebase.database().ref().child('posts/' + newPost).remove();
            //DOM
            const dbRef = firebase.database().ref();
            const userPostsRef = dbRef.child('user-posts');
            //elimina todos los posts solo en js
            while (posts.firstChild)
                posts.removeChild(posts.firstChild);
            alert('El usuario ha sido eliminado con éxito!');
            userPostsRef.on("child_added", snap => {
                let userPost = snap.val();
                console.log("USER POST:")
                console.log(userPost);
                snap.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val().mensaje;
                    console.log("childData");
                    console.log(childData);
                    console.log("childKey");
                    console.log(childKey);
                    addPost(newPost, childData, userId, userNom);

                });
            });

        }
        else {
            alert("Se procedió a cancelar");
        }


    });


    btnUpdate.addEventListener('click', () => {
        textPost.disabled = false;
        btnUpdate.setAttribute("value", "Guardar");
        const newUpdate = document.getlementById(newPost);
        //alert("El post ha sido modificado correctamente");
        const nuevoPost = {
            mensaje: newUpdate.value,
        };
        const updatesUser = {};
        const updatesPost = {};
        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        updatesPost['/posts/' + newPost] = nuevoPost;
        console.log(nuevoPost);
        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);
    });

    //contPost.appendChild(logo);
    contPost.appendChild(nomUsuario);
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(imagenLike);
    contPost.appendChild(cantLikes);
    posts.appendChild(contPost);
}
const reload_page = () => {
    window.location.reload();
}