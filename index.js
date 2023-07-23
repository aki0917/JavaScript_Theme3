const tasks = [];

// 定義
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// 関数

// タスクを追加
const addTask = () => {
  const task = taskInput.value; 

  if (!task) return; //入力されていなければ処理を終了
  const newTask = createTaskObject(task);
  tasks.push(newTask); 
  appendTaskToHTML(newTask); 
  taskInput.value = '';  
};

// タスクオブジェクトの作成
const createTaskObject = comment => {
  return {
    id: tasks.length,
    comment,
    status: '作業中'
  };
};

// HTMLにタスクを追加
const appendTaskToHTML = newTask => {
  taskList.innerHTML += `
    <tr>
      <td>${newTask.id}</td>
      <td>${newTask.comment}</td>
      <td>${newTask.status}</td>
      <td><button>削除</button></td>
    </tr>
  `;
};

// イベント
addButton.addEventListener('click', (event) => {
  addTask();
});