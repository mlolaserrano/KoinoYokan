// Función para cargar una página con AJAX
function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('conenidoDiscos').innerHTML = html;
        })
        .catch(error => {
            console.error('Hubo un problema al cargar la página:', error);
        });
}


document.getElementById('disco1').addEventListener('click', function() {
    loadPage('/AJAX/disco1.html');
});

document.getElementById('disco2').addEventListener('click', function() {
    loadPage('/AJAX/disco2.html');
});

document.getElementById('disco3').addEventListener('click', function() {
    loadPage('/AJAX/disco3.html');
});
