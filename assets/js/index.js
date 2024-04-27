// Selección de elementos del DOM
const newTask = document.querySelector('#taskName');
const addTaskBtn = document.querySelector('#addTask');
const taskContainer = document.querySelector('.taskContainer');
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const deletedTasksElement = document.getElementById('deletedTasks');

// Variables para el seguimiento de las tareas
let tasksList = [
  {
    id: 1,
    name: "Resolver desafío",
    completed: false
  },
  {
    id: 2,
    name: "Entregar mockup a cliente",
    completed: false
  },
  {
    id: 3,
    name: "Comprar ingredientes",
    completed: false
  }
]; 
let deletedTasksList = [];
let totalTasks = 3;
let completedTasks = 0;
let deletedTasks = 0;

// Constructor de tareas
function Task(name, completed = false) {
  this.id = Math.floor(Math.random() * 1000000) + 1;  // Asignar un ID numérico entero a la tarea
  this.name = name;
  this.completed = completed;
}

// Función para crear una tarea
const createTask = (name, completed) => {
  tasksList.push(new Task(name, completed));
  totalTasks++;
}

// Función para renderizar las tareas en el contenedor
const renderTasks = () => {
  taskContainer.innerHTML = '';

  // Recorrer todas las tareas y agregarlas al contenedor
  tasksList.forEach(task => {
    // Determinar el estado de la tarea (completada o por hacer)
    const stateText = task.completed ? 'Completado' : 'Por hacer';
    // Crear un elemento de tarjeta de tarea
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    taskCard.classList.toggle('taskCardOk', task.completed);
    taskCard.dataset.taskId = task.id;
    const titleClass = task.completed ? 'textThrough' : '';
    // Agregar contenido HTML a la tarjeta de tarea
    taskCard.innerHTML = `
    <h3 class="taskTitle ${titleClass}">${task.name}</h3>
    <h5 class="taskState">${stateText}</h5>
      <div>
        <i class="fa-solid fa-check completedTask icon ${task.completed ? 'disabled' : ''}"></i>
        <i class="fa-solid fa-trash deletedTask icon"></i>
      </div>
    `;
    // Agregar la tarjeta de tarea al contenedor
    taskContainer.appendChild(taskCard);
  });

  
  // Actualizar la cantidad de tareas
  totalTasksElement.textContent = totalTasks.toString();
  completedTasksElement.textContent = completedTasks.toString();
  deletedTasksElement.textContent = deletedTasks.toString();
}

// Agregar una tarea al hacer clic en el botón
addTaskBtn.addEventListener('click', () => {
  const taskName = newTask.value; // Obtener el nombre de la tarea del input
  createTask(taskName, false); // Crear la tarea con el nombre y estado de completado
  newTask.value = ''; // Limpiar el input después de agregar la tarea
  renderTasks(); // Renderizar las tareas actualizadas
});

// Acciones en las tareas
taskContainer.addEventListener('click', event => {
  if (event.target.classList.contains('deletedTask')) {
    // Obtener el ID de la tarea desde el atributo de datos del elemento
    const taskId = parseInt(event.target.parentElement.parentElement.dataset.taskId);
    const taskIndex = tasksList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const deletedTask = tasksList.splice(taskIndex, 1)[0];
      deletedTasksList.push(deletedTask); // Agregar la tarea eliminada a la lista de tareas eliminadas
      totalTasks--; // Decrementar el contador de tareas totales
      deletedTasks++; // Incrementar el contador de tareas eliminadas
      renderTasks(); // Renderizar las tareas actualizadas
    }
  } else if (event.target.classList.contains('completedTask') && !event.target.classList.contains('disabled')) {
    // Obtener el ID de la tarea desde el atributo de datos del elemento
    const taskId = parseInt(event.target.parentElement.parentElement.dataset.taskId);
    const taskIndex = tasksList.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasksList[taskIndex].completed = true; // Marcar la tarea como completada
      completedTasks++; // Incrementar el contador de tareas completadas
      renderTasks(); // Renderizar las tareas actualizadas
    }
  }
});

// Renderizar las tareas al cargar la página
renderTasks();