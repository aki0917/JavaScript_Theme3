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
  filterTasks();
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
    <td>${newTask.id}</td>
    <td>${newTask.comment}</td>
    <td>${newTask.status}</td>
  `;
  
  const statusButton = createStatusButton(newTask, row);
  row.appendChild(statusButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';

  deleteButton.addEventListener('click', () => {
    const index = tasks.findIndex(task => task.id === newTask.id);
    tasks.splice(index, 1);

    updateIds();
    row.remove();
    filterTasks();
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

// 状態変更ボタンを作成する関数
const createStatusButton = (newTask, row) => {
  const statusButton = document.createElement('button');
  statusButton.innerText = newTask.status === '作業中' ? '完了' : '作業中';

  statusButton.addEventListener('click', () => {
    newTask.status = newTask.status === '作業中' ? '完了' : '作業中';

    
    filterTasks();
  });
  return statusButton;
};

// タスクの再描画
const redrawTasks = (filteredTasks) => {
    taskList.innerHTML = ''; 
  
  filteredTasks.forEach(task => {
    appendTaskToHTML(task,taskList);
  });
};

//タスクによって表示を変える
const filterTasks = () => {
  const statusRadioButtons = document.getElementsByName('status');
  
  // 選択されているラジオボタンの値を取得
  let selectedStatus = '';
  statusRadioButtons.forEach(radio => {
    if (radio.checked) selectedStatus = radio.value;
  });

  //タスクのリストを作成
  const filteredTasks = [];
  
  // タスクの状態によって絞り込み
  tasks.forEach(task => {
    if (selectedStatus === '全て') {
      filteredTasks.push(task);
    } else if (task.status === selectedStatus) {
      filteredTasks.push(task);
    }
  });

  redrawTasks(filteredTasks);
};

//ラジオボタンの変更
const statusRadio = document.getElementsByName('status');

statusRadio.forEach(radio => {
  radio.addEventListener('change', filterTasks);
});

// イベント
addButton.addEventListener('click', (event) => {
  addTask();
});
