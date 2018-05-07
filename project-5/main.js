var appModule = (function (window) {
  var todoList = window.document.getElementsByClassName("todo-items-container")[0];

  function addTodoItem(e) {
    e.preventDefault();

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

  function removeTodoItem (event) {
    var todoItem;
    if (event.target && event.target.nodeName === "BUTTON") {
      todoItem = event.target.parentNode;
      todoList.removeChild(todoItem);
    }
  }

  function run() {
    var form = window.document.getElementById("todo-form");
    form.addEventListener("submit", addTodoItem);

    todoList.addEventListener("click", removeTodoItem);
  }

  return {
    run: run
  }
})(window);

appModule.run();