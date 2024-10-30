// main.js

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    enviarCorreo();
});

function enviarCorreo() {
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("nombreUsuario").value;
    const apellido = document.getElementById("apellidoUsuario").value;
    const mensaje = document.getElementById("mensajeUsuario").value;
    console.log(email, usuario, apellido, mensaje);
    enviarMail(email, usuario, apellido, mensaje);
}

function enviarMail(email, nombre, apellido, mensaje) {
    const emailEncoded = encodeURIComponent(email);
    const nombreEncoded = encodeURIComponent(nombre);
    const apellidoEncoded = encodeURIComponent(apellido);
    const mensajeEncoded = encodeURIComponent(mensaje);

    const url = `https://magicloops.dev/api/loop/run/59f53a35-c9d7-4c83-ab5f-260ccba6019c?email=${emailEncoded}&nombre=${nombreEncoded}&mensaje=${mensajeEncoded}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Hubo un error:', error);
        });
}
