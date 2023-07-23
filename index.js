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
  const row = document.createElement('tr');
  row.innerHTML = `
    <tr>
      <td>${newTask.id}</td>
      <td>${newTask.comment}</td>
      <td>${newTask.status}</td>
    </tr>
  `;
  
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';

  deleteButton.addEventListener('click', () => {
    const index = tasks.findIndex(task => task.id === newTask.id);
    tasks.splice(index, 1);
    updateIds();
    row.remove();
  });

  row.appendChild(deleteButton);
  taskList.appendChild(row);

};

// IDの更新
const updateIds = () => {
  tasks.forEach((task, index) => {
    task.id = index + 1;
  });
};

// イベント
addButton.addEventListener('click', (event) => {
  addTask();
});