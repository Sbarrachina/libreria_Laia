document.addEventListener('DOMContentLoaded', () => {
    cargarLibros();
  });
  
  function cargarLibros() {
    // Obtener la tabla y el cuerpo de la tabla
    const tabla = document.getElementById('librosTabla');
    const cuerpoTabla = tabla.getElementsByTagName('tbody')[0];
  
    // Obtener libros del almacenamiento local
    const libros = JSON.parse(localStorage.getItem('libros')) || [];
  
    // Limpiar el cuerpo de la tabla
    cuerpoTabla.innerHTML = '';
  
    // Iterar sobre los libros y agregar filas a la tabla
    libros.forEach(libro => {
      const fila = cuerpoTabla.insertRow();
  
      Object.values(libro).forEach(valor => {
        const celda = fila.insertCell();
        if (valor.includes('.jpg') || valor.includes('.png')) {
          // Si el valor es una URL de imagen, mostrar la imagen
          const imagen = document.createElement('img');
          imagen.src = valor;
          celda.appendChild(imagen);
        } else {
          // Mostrar el texto normalmente
          celda.textContent = valor;
        }
      });
    });
  }
  
  // Puedes agregar funciones para editar y guardar los cambios aquí, según tus necesidades
  
  function filterTable() {
    var inputAutor, inputPrecio, selectEstado, table, tr, tdAutor, tdPrecio, tdEstado, i, autor, precio, estado;
    inputAutor = document.getElementById("autorFilter");
    inputPrecio = document.getElementById("precioFilter");
    selectEstado = document.getElementById("estadoFilter");
    table = document.getElementById("librosTabla");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      tdAutor = tr[i].getElementsByTagName("td")[1];
      tdPrecio = tr[i].getElementsByTagName("td")[2];
      tdEstado = tr[i].getElementsByTagName("td")[4];
  
      if (tdAutor && tdPrecio && tdEstado) {
        autor = tdAutor.textContent || tdAutor.innerText;
        precio = parseFloat(tdPrecio.textContent) || 0;
        estado = tdEstado.textContent || tdEstado.innerText;
  
        // Aplicar filtros
        var autorFilter = inputAutor.value.toUpperCase();
        var precioFilter = inputPrecio.value === '' ? 0 : parseFloat(inputPrecio.value);
        var estadoFilter = selectEstado.value.toUpperCase();
  
        if (
          (autor.toUpperCase().indexOf(autorFilter) > -1) &&
          (precio >= precioFilter) &&
          (estado.toUpperCase().indexOf(estadoFilter) > -1)
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  