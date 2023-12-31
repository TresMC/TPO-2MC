     //const URL = "http://127.0.0.1:5000/"
     const URL = "https://marcelomw21.pythonanywhere.com/"
     // Capturamos el evento de envío del formulario
     document.getElementById('formulario').addEventListener('submit', function (event) {
         event.preventDefault(); // Evitamos que se envie el form por ahora

         // Obtenemos los valores del formulario
         var codigo = document.getElementById('codigo').value;
         var descripcion = document.getElementById('descripcion').value;
         var valor = document.getElementById('valor').value;
         var cantidad = document.getElementById('cantidad').value;
         var precio = document.getElementById('precio').value;

 

         // Creamos un objeto con los datos del producto
         var producto = {
             codigo: codigo,
             descripcion: descripcion,
             valor: valor,
             cantidad: cantidad,
             precio: precio

             
            
         };
         console.log(producto)
         // Realizamos la solicitud POST al servidor
         fetch(URL + 'productos', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(producto)
         })
             .then(function (response) {
                 // Código para manejar la respuesta
                 if (response.ok) {
                     return response.json(); // Parseamos la respuesta JSON
                 } else {
                     // Si hubo un error, lanzar explícitamente una excepción
                     // para ser "catcheada" más adelante
                     throw new Error('Error al agregar el producto.');
                 }
             })
             .then(function (data) {
                 alert('Producto agregado correctamente.');
                 //Limpiamos el formulario.
                 document.getElementById('codigo').value = "";
                 document.getElementById('descripcion').value = "";
                 document.getElementById('valor').value = "";
                 document.getElementById('cantidad').value = "";
                 document.getElementById('precio').value = "";
                 

             })
             .catch(function (error) {
                 // Código para manejar errores
                 alert('Error al agregar el producto.');
             });
     })