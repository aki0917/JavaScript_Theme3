const tasks = [];
//console.log(tasks);

// 定義
const taskInput = document.getElementById('task-input');
//console.log(taskInput);
const addButton = document.getElementById('add-button');
//console.log(addButton);
const taskList = document.getElementById('task-list');
//console.log(taskList);


// 関数
// タスクを追加
const addTask = () => {
  const task = taskInput.value; //入力された値を取得
  //console.log(task);
  if (task) {
    const newTask = createTaskObject(task); //タスクオブジェクトを作成
    tasks.push(newTask);  //配列に追加
    appendTaskToHTML(newTask); //HTMLに追加
    taskInput.value = '';  //入力欄を空にする
  };
};

// タスクオブジェクトの作成
const createTaskObject = task => {
  return {
    id: tasks.length,
    comment: task,
    status: '作業中'
  };
};

// HTMLにタスクを追加
const appendTaskToHTML = newTask => {
  const listItem = document.createElement('p');
  //console.log(listItem);
  listItem.textContent = `${newTask.id} ${newTask.comment} ${newTask.status} `;
  //console.log(listItem);

  const deleteButton = document.createElement('button');
  //console.log(deleteButton);
  deleteButton.textContent = '削除';
  listItem.appendChild(deleteButton);

  taskList.appendChild(listItem);
};


// イベント
addButton.addEventListener('click', (event) => {
  addTask();
  //console.log(tasks);
});