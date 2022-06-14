
const appUrl = "http://localhost:8081"

document.getElementById('btnSalvar').addEventListener("click", function (e) {
    e.preventDefault();
    save();
});

var todos = [];

function save() {
    var inTodoDescricao = document.getElementById("inTodoDescricao");
    var todo = String(inTodoDescricao.value).trim();
    if (todo === '') return;

    sendSaveRequestAndUpdateUi(todo);

    inTodoDescricao.value = '';
}

function sendSaveRequestAndUpdateUi(todo) {
    const url = "http://localhost:8081";
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "description": todo
            }
        )
    }).then(
        _ => findAllAndPopulateUi()
    );
}

function deleteAndUpdateUi(id) {
    const url = "http://localhost:8081/" + id;
    console.log(url);
    fetch(url, {
        method: "DELETE",
    })
        .then(
            _ => findAllAndPopulateUi()
        ).catch(_ => {
            alert("Nao foi possivel deletar item com ID=" + id);
        });
}

function findAllAndPopulateUi() {
    const url = "http://localhost:8081";
    todos = [];
    fetch(url, {
        method: 'GET'
    }).then(
        response => response.json()
    ).then(
        response => {
            todos = response;
            populateTodoList();
        }
    );
}

function populateTodoList() {
    var todoList = document.getElementById('todos');
    todoList.innerHTML = '';

    for (var todo of todos) {
        var todoItem = document.createElement('li');

        const concluirBtn = document.createElement('button');
        concluirBtn.onclick = function (e) {
            e.preventDefault();
            deleteAndUpdateUi(this.id)
        };
        concluirBtn.setAttribute('id', todo.id);
        concluirBtn.textContent = "Finalizar";

        todoItem.appendChild(concluirBtn);

        todoItem.appendChild(document.createTextNode(String(todo.description)));

        todoList.appendChild(todoItem);
    }
}

findAllAndPopulateUi();