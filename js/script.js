let state = {
  tasks: [
    {
      id: uuidv4(),
      name: 'Make your own todo app',
      complete: false,
    },
    {
      id: uuidv4(),
      name: 'Delete this item',
      complete: false,
    },
    {
      id: uuidv4(),
      name: 'Create new tasks',
      complete: false,
    },
    {
      id: uuidv4(),
      name: 'Complete this task',
      complete: true,
    },
  ],
};

/* RENDER TASKS ONLOAD */
function renderTasks() {
  let tasksHTML = '';
  for (let task of state.tasks) {
    tasksHTML += `
            <div class="todo-item__container draggable ${
              task.complete ? 'completed' : ''
            }" draggable="true">
            <li class="todo-item">
                ${task.name}
            </li>
            <button class="complete-button" data-taskid=${
              task.id
            }><img src="${task.complete ? 'assets/check-square.png' : 'assets/square.png'}" alt="sd"></button>
            <button class="delete-button" data-taskid="${
              task.id
            }"><img src="assets/X.png" alt="x"></button>
            </div>
        `;
  }

  document.querySelector('.todo-list').innerHTML = tasksHTML;

  /* DELETE TASK */
  const deleteButtons = document.querySelectorAll('.delete-button');
  for (let deleteButton of deleteButtons) {
    deleteButton.onclick = (event) => {
      const id = event.target.dataset.taskid;

      let deleteIndex;
      for (let index = 0; index < state.tasks.length; index++) {
        if (state.tasks[index].id === id) {
          deleteIndex = index;
          break;
        }
      }

      state.tasks.splice(deleteIndex, 1);

      renderTasks();
    };
  }

  /* COMPLETE TASK */
  const completeButtons = document.querySelectorAll('.complete-button');
  for (let completeButton of completeButtons) {
    completeButton.onclick = (event) => {
      const id = event.target.dataset.taskid;

      for (let index = 0; index < state.tasks.length; index++) {
        if (state.tasks[index].id === id) {
          state.tasks[index].complete = !state.tasks[index].complete;
          renderTasks();
          break;
        }
      }

  
    };
  }
}

renderTasks();

/* CREATE NEW TASK */
const createButton = document.querySelector('.create-task');
const createFormContainer = document.querySelector('.create-form__container');

createButton.onclick = () => {
  createButton.style.display = 'none';
  createFormContainer.classList.add('scale-up');
  createFormContainer.innerHTML = `
    <form class="create-form">
        <input type="text" name="task" class="create-form__input-field" placeholder="Teendő..." required>
        <button type="submit" class="add-task">Add</button>
    </form>
    `;
  document.querySelector('.create-form__input-field').focus();

  document.querySelector('.create-form').onsubmit = (event) => {
    event.preventDefault();
    const newTask = event.target.elements.task.value;
    state.tasks.push({ id: uuidv4(), name: newTask, complete: false });

    createButton.classList.add('scale-down');
    createFormContainer.classList.remove('scale-up');
    createFormContainer.innerHTML = '';
    createButton.style.display = 'block';

    renderTasks();
  };

};

/* SELECT YOUR STYLE */
function selectStyle(cssFile) {
  document.getElementById(
    'pageStyle'
  ).innerHTML = `<link rel="stylesheet" id="pageStyle" href="${cssFile}">`;
}

// Generate ID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
