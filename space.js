document.getElementById('btnBuscar').addEventListener('click', function () {
    const searchTerm = document.getElementById('inputBuscar').value;  // Obtener el valor del input

    if (searchTerm.trim() === '') {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    // Hacer la solicitud a la API de la NASA
    fetch(`https://images-api.nasa.gov/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            const items = data.collection.items;  // Obtener los ítems del JSON
            displayResults(items);  // Llamar a la función que muestra los resultados
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
});

function displayResults(items) {
    const container = document.getElementById('contenedor');
    container.innerHTML = '';  // Limpiar los resultados anteriores

    if (items.length === 0) {
        container.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];  // Desestructurar título, descripción y fecha
        const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/150';  // URL de la imagen

        // Crear una tarjeta de Bootstrap para cada imagen
        const card = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text" style="max-height: 100px; overflow-y: auto;">${description ? description : 'No hay descripción disponible.'}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                        <a href="${imageUrl}" target="_blank" class="btn btn-primary">Ver imagen</a>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += card;
    });

}
