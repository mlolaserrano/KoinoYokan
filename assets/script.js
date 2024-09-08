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
window.onload = function() {
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

// Falta por hacer:
// Ejercicio 5: Activar un evento de scroll que limite el desplazamiento hasta que se acepten las cookies.
// Componentes COMPLETO


// JSON FALTA ULTIMO
document.addEventListener("DOMContentLoaded", function() {
    fetch('/productos.json')  
      .then(response => response.json())
      .then(productos => {
        const productosContainer = document.getElementById("productos-container");

        if (productosContainer) {
          productos.forEach(producto => {
            if (producto.stock > 0) {
              const card = document.createElement("div");
              card.classList.add("card", "col-md-4", "mb-3");  

              card.innerHTML = `
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <p class="card-text">Precio: $${producto.precio}</p>
                  <p class="card-text">Stock: ${producto.stock}</p>
                </div>
              `;

              productosContainer.appendChild(card);
            }
          });
        } else {
          console.error("El contenedor de productos no existe.");
        }
      })
      .catch(error => console.error('Error al cargar el JSON:', error));
});

