var appModule = (function (window) {
  var data = [];
  var todoList = window.document.getElementsByClassName("todo-items-container")[0];

  function processInput(event) {
    event.preventDefault();

    var input = window.document.getElementById("new-entry");
    var title = input.value.trim();
    if (title) {
      data.push(title);
      addTodoItem(title);
    }
    else {
      window.alert("Input cannot be empty.")
    }

    input.value = "";
  }

  function addTodoItem(itemTitle) {
    var todoItem = window.document.createElement("article");
    todoItem.classList.add("todo-item");

    var title = window.document.createElement("h2");
    title.classList.add("todo-item__title");
    title.textContent = itemTitle;

    var removeBtn = window.document.createElement("button");
    removeBtn.classList.add("todo-item__remove-button");
    removeBtn.textContent = "Remove";

    todoItem.appendChild(title);
    todoItem.appendChild(removeBtn);

    todoList.appendChild(todoItem);
  }

  function removeTodoItem (event) {
    if (event.target && event.target.nodeName === "BUTTON") {
      var todoItem = event.target.parentNode;

      var value = todoItem.firstChild.textContent;
      var position = data.indexOf(value);
      data.splice(position, 1);

      todoList.removeChild(todoItem);
    }
  }

  function run() {
    var form = window.document.getElementById("todo-form");
    form.addEventListener("submit", processInput);

    todoList.addEventListener("click", removeTodoItem);
  }

  return {
    run: run
  }
})(window);

appModule.run();