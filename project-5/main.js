var appModule = (function (window) {
  function addTodoItem(e) {
    e.preventDefault();
    var todoList = window.document.getElementsByClassName("todo-items-container")[0];

    var todoItem = window.document.createElement("article");
    todoItem.classList.add("todo-item");

    var title = window.document.createElement("h2");
    title.classList.add("todo-item__title");
    title.textContent = "Test todo item";

    var removeBtn = window.document.createElement("button");
    removeBtn.classList.add("todo-item__remove-button");
    removeBtn.textContent = "Remove";

    todoItem.appendChild(title);
    todoItem.appendChild(removeBtn);

    todoList.appendChild(todoItem);
  }
  
  function run() {
    var form = window.document.getElementById("todo-form");
    form.addEventListener("submit", addTodoItem);
    //addTodoItem();
  }

  return {
    run: run
  }
})(window);

appModule.run();