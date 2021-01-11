document.getElementById("formTarea").addEventListener("submit", guardarTarea);

function guardarTarea(e) {
  let titulo = document.getElementById("titulo").value; //valore del titulo
  let descripcion = document.getElementById("descripcion").value; //valore del descripcion

  const TAREA = {
    titulo, // title: title
    descripcion, // descripcion: descripcion
  };

  if (localStorage.getItem("tareas") === null) {
    let tareas = [];
    tareas.push(TAREA);
    localStorage.setItem("tareas", JSON.stringify(tareas));
  } else {
    let tareas = JSON.parse(localStorage.getItem("tareas"));
    tareas.push(TAREA);
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  // setItem permite guardar un dato
  // JSON.stringify() metodo del navegador que permite convertir un objeto en un string
  //localStorage.setItem("tareas", JSON.stringify(TAREA));

  // getItem permite obtener los datos guardados en la memoria del navegador (localStorage)
  // JSON.parse() metodo que permite convertir un string a un objeto de js
  //JSON.parse(localStorage.getItem("tareas"));

  obtenerTarea();
  document.getElementById("formTarea").reset();
  e.preventDefault(); //prevenir comportamiento por defecto
}

function obtenerTarea() {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  let tareaVista = document.getElementById("tarea");

  // Limpiar antes de insertar la vista
  tareaVista.innerHTML = "";

  for (let i = 0; i < tareas.length; i++) {
    let titulo = tareas[i].titulo;
    let descripcion = tareas[i].descripcion;

    tareaVista.innerHTML += `
    <div class="tarjeta border">
        <p class="info">${titulo} - ${descripcion}</p>
        <button class="btn-eliminar" onClick="eliminarTarea('${titulo}')">Delete</button>
    </div>`;
  }
}

function eliminarTarea(titulo) {
  let tareas = JSON.parse(localStorage.getItem("tareas"));
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].titulo == titulo) {
      tareas.splice(i, 1);
    }
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  obtenerTarea();
}

obtenerTarea();
