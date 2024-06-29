document.addEventListener('DOMContentLoaded', () => {
    const productosGrid = document.getElementById('productos-grid');
    const nuevoProductoForm = document.getElementById('nuevoProductoForm');
    const noProductosMensaje = document.getElementById('no-productos');
    const borrarCamposBtn = document.getElementById('borrarCampos');
    const contactoLink = document.getElementById('contactoLink');
    const contactoMensaje = document.getElementById('contactoMensaje');

    // Función para eliminar un producto
    window.eliminarProducto = (index) => {
        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
        productosList.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productosList));
        renderProductos();
        toggle(productosList);
    };

    const toggle = (productosList) => {
        if (productosList.length === 0) {
            noProductosMensaje.style.display = 'block'; // Mostrar mensaje si no hay productos 
        } else {
            noProductosMensaje.style.display = 'none'; // Ocultar mensaje si hay productos
        }
    };

    // Función para renderizar los productos
    const renderProductos = () => {
        productosGrid.innerHTML = ''; // Limpiar el contenido anterior

        // Obtener la lista de productos del localStorage
        let productosList = JSON.parse(localStorage.getItem('productos')) || [];

        productosList.forEach((producto, index) => {
            // Asegurarse de que precio sea un número
            const precio = parseFloat(producto.precio);

            const productoCard = document.createElement('div');
            productoCard.classList.add('card');
            productoCard.innerHTML = `
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
                <div class="card-container--info">
                    <p>${producto.nombre}</p>
                    <div class="card-container--value">
                        <p>$${precio.toFixed(2)}</p>
                        <img src="./imagenes/basura.png" alt="Eliminar" onclick="eliminarProducto(${index})">
                    </div>
                </div>
            `;
            productosGrid.appendChild(productoCard); // Utiliza productosGrid en lugar de productos
        });
        toggle(productosList);
    };

    // Función para manejar el envío del formulario
    nuevoProductoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = parseFloat(document.getElementById('precio').value);
        const imagenUrl = document.getElementById('imagenUrl').value;

        // Validar si precio es un número válido
        if (isNaN(precio) || precio <= 0) {
            alert('Por favor, ingrese un precio válido.');
            return;
        }

        const nuevoProducto = { nombre, precio, imagenUrl };

        let productosList = JSON.parse(localStorage.getItem('productos')) || [];
        productosList.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productosList));

        renderProductos();
        toggle(productosList);

        nuevoProductoForm.reset();
    });

    // Función para manejar el borrado de campos
    borrarCamposBtn.addEventListener('click', () => {
        nuevoProductoForm.reset();
    });

    // Función para mostrar mensaje de contacto
    contactoLink.addEventListener('click', () => {
        contactoMensaje.textContent = "En la parte de abajo puedes encontrar mis redes sociales.";
        contactoMensaje.style.display = 'block';
        setTimeout(() => {
            contactoMensaje.style.display = 'none';
        }, 5000); // El mensaje desaparecerá después de 5 segundos
    });

    // Inicializar la renderización de productos al cargar la página
    renderProductos();
    toggle(JSON.parse(localStorage.getItem('productos')) || []);
});
