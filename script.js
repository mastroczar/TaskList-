const inputTask = document.querySelector('.input_New_Task')
const btnTask = document.querySelector('.btn_add_tarefa')
const tasks = document.querySelector('.tasks')

inputTask.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        if (!inputTask.value) return
        createTask(inputTask.value)
    }
})


const createLi = () => {
    const li = document.createElement('li')
    return li
}

const createTask = (input_text) => {
    const li = createLi()
    li.innerText = input_text
    tasks.appendChild(li)
    cleanInput()
    deleteTask(li)
    saveTasks()
}

const deleteTask = (li) => {
    li.innerText += ' '
    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete'
    btnDelete.classList.add('delete')
    li.appendChild(btnDelete)
}

const cleanInput = () => {
    inputTask.value = ''
    inputTask.focus()
}

btnTask.addEventListener('click', () => {
    if (!inputTask.value) return
    createTask(inputTask.value)
})

document.addEventListener('click', (event) => {
    const el = event.target
    if (el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTasks()
    }
})

const saveTasks = () => {
    const liTasks = tasks.querySelectorAll('li')
    const listTasks = []

    for (let i of liTasks) {
        let textTask = i.innerText;
        textTask = textTask.replace('Delete', '').trim();
        listTasks.push(textTask);
    }

    const tasksJSON = JSON.stringify(listTasks);
    localStorage.setItem('tasks', tasksJSON);
}

const addSaveTasks = () => {
  const task = localStorage.getItem('tasks');
  const listTasks = JSON.parse(task);

  for(let i of listTasks) {
    createTask(i);
  }
}
addSaveTasks()
