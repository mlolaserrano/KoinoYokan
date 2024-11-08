// Ejercicio 1: Validar el formulario (parte 1 de la consigna)
function validarFormulario(event) {
    event.preventDefault();

    const mensaje = document.getElementById("mensaje").value;
    const password = document.getElementById("password").value;
    const checkbox = document.getElementById("terms").checked;
    const numberInput = document.getElementById("numberInput");
    const selectedDate = document.getElementById("fecha").value;

    const regexDireccion = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/;

    // Validación del campo de texto
    if (mensaje.trim() === "" || mensaje.length > 30 || !regexDireccion.test(mensaje)) {
        alert("La dirección debe contener entre 1 y 30 caracteres, incluyendo letras y números.");
        return false;
    }

    // Validación de la contraseña
    if (password.length <= 5) {
        alert("El código de envío debe tener más de 5 caracteres.");
        return false;
    }

    // Validación del checkbox
    if (!checkbox) {
        alert("Debes dejar propina.");
        return false;
    }

    // Validación del número entre 30 y 50 (Ejercicio 2)
    if (numberInput && (numberInput.value < 30 || numberInput.value > 50)) {
        alert("La propina debe estar entre 30 y 50 dólares.");
        return false;
    }

    // Validación de la fecha (Ejercicio 3)
    if (!validarFecha(selectedDate)) {
        return false;
    }

    // Redirección a home.html si todo es válido
    window.location.href = "/pages/koino.html";
    return true;
}

// Ejercicio 2: Mostrar input de número al tildar el checkbox
function mostrarInputNumero() {
    const checkbox = document.getElementById("terms");
    const numberContainer = document.getElementById("numberContainer");

    // Si el checkbox está marcado, mostrar el input de número
    if (checkbox.checked) {
        if (!document.getElementById("numberInput")) {
            const numberInput = document.createElement("input");
            numberInput.type = "number";
            numberInput.id = "numberInput";
            numberInput.name = "numberInput";
            numberInput.min = "30";
            numberInput.max = "50";
            numberInput.placeholder = "Propina ($usd)";
            numberInput.classList.add("styled-input");
            numberContainer.appendChild(numberInput);
        }
    } else {

        // Si se desmarca el checkbox, eliminar el input de número
        const numberInput = document.getElementById("numberInput");
        if (numberInput) {
            numberContainer.removeChild(numberInput);
        }
    }
}

// Ejercicio 3: Validar la fecha seleccionada
function validarFecha(fechaSeleccionada) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(fechaSeleccionada);

    // Verificar si la fecha ingresada es válida
    if (isNaN(fechaIngresada.getTime())) {
        alert("Por favor, selecciona una fecha válida.");
        return false;
    }

    // Comparación de fechas
    if (fechaIngresada < fechaActual.setHours(0, 0, 0, 0)) {
        alert("La fecha seleccionada ya pasó.");
        return false;
    } else if (fechaIngresada.getTime() === fechaActual.setHours(0, 0, 0, 0)) {
        alert("Has seleccionado la fecha actual.");
        return true;
    } else {
        alert("Operación exitosa");
        return true;
    }
}

// Ejercicio 4: Mostrar pantalla de carga, pantalla intermedia y pantalla real
window.onload = function () {
    const pantallaCarga = document.getElementById("pantallaCarga");
    const pantallaIntermedia = document.getElementById("pantallaIntermedia");
    const popup = document.getElementById("popup");

    // Mostrar pantalla de carga por 1 segundo y luego mostrar pantalla intermedia
    setTimeout(() => {
        pantallaCarga.style.display = "none";
        pantallaIntermedia.style.display = "flex";
    }, 1000);

    // Mostrar popup después de 10 segundos
    setTimeout(() => {
        popup.style.display = "block";
    }, 10000);
};

// Ejercicio 4: Mostrar pantalla real al hacer click
function mostrarPantallaReal() {
    const pantallaIntermedia = document.getElementById("pantallaIntermedia");
    const pantallaReal = document.getElementById("pantallaReal");

    pantallaIntermedia.style.display = "none";
    pantallaReal.style.display = "block";
}

// Ejercicio 4: Cerrar popup
function cerrarPopup() {
    document.getElementById("popup").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function () {

    // Bloquear el scroll cuando la página se carga
    document.body.style.overflow = 'hidden';


    const botonAceptarCookies = document.getElementById('aceptar-cookies');
    botonAceptarCookies.addEventListener('click', function () {
        cookiesAceptadas = true;

        // Habilitar el scroll 
        document.body.style.overflow = 'auto';

        // Esconder el modal de cookies
        document.getElementById('cookies-modal').style.display = 'none';
    });
});


// Componentes 
// Menu
class componenteMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `
    <nav>
        <div class="logo-container">
            <a href="/pages/koino.html" class="logo">Koino Jokan</a>
        </div>
        <ul class="nav-menu">
            <li><a href="#discografia">Discografía</a></li>
            <li><a href="#eventos">Eventos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          <a href="/pages/login.html" class="no-style-link">  <i class="fi fi-rr-circle-user" style="font-size: 20px "></i> </a>
        </ul>
    </nav>
        `;
    }
}
customElements.define('componente-menu', componenteMenu);

// footer
class componenteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `
        <div class="container text-center">
        <div class="row align-items-start">
          <div class="col">
         <a href="https://open.spotify.com/intl-es/artist/31kgZWvoPhxDcTKgVbgi3J?autoplay=true" target="_blank"  class="no-style-link"><i class="fi fi-brands-spotify"  ></i> </a>
          </div>
          <div class="col">
          <a href="https://www.youtube.com/channel/UCk_FkSVnFOhHIn6ejDtcDBw" target="_blank"  class="no-style-link"><i class="fi fi-brands-youtube" ></i></a>
          </div>
          <div class="col">
          <a href="https://www.instagram.com/koinoyokanmusica/" target="_blank" class="no-style-link"><i class="fi fi-brands-instagram"></i></a>
          </div>
        </div>
      </div>
        `;
    }
}
customElements.define('componente-footer', componenteFooter);



// JSON: Login 

let usuarios = [];

function cargarUsuarios() {
    return fetch('/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            usuarios = data.usuarios;
        })
        .catch(error => {
            console.error(error);
        });
}

const formularioLogin = document.getElementById('formulario-login');
const mensajeError = document.getElementById('mensaje-error');

cargarUsuarios().then(() => {
    formularioLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        const usuarioInput = document.getElementById('usuario').value;
        const contrasenaInput = document.getElementById('contraseña').value;

        const usuarioEncontrado = usuarios.find(usuario => usuario.usuario === usuarioInput && usuario.contrasena === contrasenaInput);

        if (usuarioEncontrado) {

            // Login exitoso  
            alert(`Bienvenido ${usuarioEncontrado.rol}`);

            // Redireccionar según el rol del usuario  
            switch (usuarioEncontrado.rol) {
                case 'administrador':
                    window.location.href = 'admi.html'; // Redirige al administrador  
                    break;
                case 'creador de contenido':
                    window.location.href = '/pages/ccontenido.html'; // Redirige al creador de contenido  
                    break;
                case 'usuario':
                    window.location.href = 'tienda.html'; // Redirige al usuario normal  
                    break;
                default:
                    console.error('Rol no reconocido');
            }
        } else {
            // Login fallido  
            mensajeError.style.display = 'block';
        }
    });
});


// API lyrics
function letras(cancion) {
    console.log("Cargando letra para:", cancion);
    fetch(`https://api.lyrics.ovh/v1/Coldplay/${cancion}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const container = document.getElementById("lyrics-container"); 
            if (data.lyrics) {
                container.innerHTML = data.lyrics; 
            } else {
                container.innerHTML = "Letra no encontrada.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("lyrics-container").innerHTML = "Error al cargar la letra.";
        });
}

