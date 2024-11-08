// JSON: Cards con productos
document.addEventListener("DOMContentLoaded", function () {
    fetch('/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const productos = data.productos;
            const productosContainer = document.getElementById("productos-container");

            if (productosContainer) {
                productos.forEach(producto => {
                    if (producto.stock > 0) {
                        const card = document.createElement("div");
                        card.classList.add("custom-card");

                        card.innerHTML = `  
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">  
                                <h5 class="card-title" id="tiendatexto">${producto.nombre}</h5>  
                                <p class="card-text" id="tiendatexto">${producto.descripcion}</p>  
                                <p class="card-text" id="tiendatexto">Precio: AR$${producto.precio}</p>  
                                <p class="card-text" id="tiendatexto">Stock: ${producto.stock}</p>  
                            </div>  
                        `;

                        productosContainer.appendChild(card);
                    }
                });
            }
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
