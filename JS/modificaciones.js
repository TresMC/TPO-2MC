     // const URL = "http://127.0.0.1:5000/"
     const URL = "https://marcelomw21.pythonanywhere.com/"

     // Capturamos el evento de envío del formulario para mostrar los datos del producto
     document.getElementById('formulario').addEventListener('submit', function (event) {
         event.preventDefault(); // Evitamos que se recargue la página

         // Obtenemos el código del producto
         var codigo = document.getElementById('codigo').value;

         // Realizamos la solicitud GET al servidor para obtener los datos del producto
         fetch(URL + 'productos/' + codigo)
             .then(function (response) {
                 if (response.ok) {
                     return response.json(); // Parseamos la respuesta JSON
                 } else {
                     // Si hubo un error, lanzar explícitamente una excepción
                     // para ser "catcheada" más adelante
                     throw new Error('Error al obtener los datos del producto.');
                 }
             })
             .then(function (data) {
                 // Mostramos los datos del producto en el formulario de modificación
                 document.getElementById('descripcionModificar').value = data.descripcion;
                 document.getElementById('valorModificar').value = data.valor;
                 document.getElementById('cantidadModificar').value = data.cantidad;
                 document.getElementById('precioModificar').value = data.precio;
                 
                 

                 // Mostramos el formulario de modificación y ocultamos el formulario de consulta
                 document.getElementById('formulario').style.display = 'none';
                 document.getElementById('datosProducto').style.display = 'block';
             })
             .catch(function (error) {
                 // Código para manejar errores
                 alert('Error al obtener los datos del producto.');
             });
     });

     // Capturamos el evento de envío del formulario de modificación
     document.getElementById('formularioModificar').addEventListener('submit', function (event) {
         event.preventDefault(); // Evitamos que se recargue la página

         // Obtenemos los valores del formulario de modificación
         var codigo = document.getElementById('codigo').value;
         var descripcion = document.getElementById('descripcionModificar').value;
         var valor = document.getElementById('valorModificar').value;
         var cantidad = document.getElementById('cantidadModificar').value;
         var precio = document.getElementById('precioModificar').value;

         

         // Creamos un objeto con los datos del producto actualizados
         var producto = {
             codigo: codigo,
             descripcion: descripcion,
             valor: valor,
             cantidad: cantidad,
             precio: precio

         };

         // Realizamos la solicitud PUT al servidor para guardar los cambios
         fetch(URL + 'productos/' + codigo, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(producto)
         })
             .then(function (response) {
                 if (response.ok) {
                     return response.json(); // Parseamos la respuesta JSON
                 } else {
                     // Si hubo un error, lanzar explícitamente una excepción
                     // para ser "catcheada" más adelante
                     throw new Error('Error al guardar los cambios del producto.');
                 }
             })
             .then(function (data) {
                 alert('Cambios guardados correctamente.');
                 location.reload(); // Recargamos la página para volver al formulario de consulta
             })
             .catch(function (error) {
                 // Código para manejar errores
                 alert('Error al guardar los cambios del producto.');
             })
     });