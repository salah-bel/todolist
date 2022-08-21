const taskList = document.querySelector("#task-list")
const form = document.querySelector("#task-add")
const baskets = document.querySelectorAll(".basket");
// on load 
window.onload = getTasks()

async function getTasks() {
    const response = await fetch('http://www.localhost:3000/tasks');

    const data = await response.json();
    for (const task of data) {

        // create LI
        const li = document.createElement("li")
        li.className = "d-flex justify-content-between list-group-item "
        li.textContent = task.title
        li.id = task.id;

        // create basket for delete and affect listner
        const i = document.createElement("i")
        i.classList = "bi bi-trash3-fill basket"
        i.addEventListener('click', deleteTask)
            // appendchild
        li.appendChild(i)
        taskList.appendChild(li)
    }
    getPriority(taskList)
        // console.log(taskList)
}
async function getPriority(list) {
    for (let i = 0; i < list.children.length; i++) {
        if (i <= 3) {
            list.children[i].className += "bg-danger text-light"
        }


    }
}

// form data 
form.addEventListener("submit", function(e) {
    e.preventDefault()
    const title = form.children[0].children[1].value
    const description = form.children[1].children[1].value
    if (title == "" || description == "") {
        alert("Please enter a title")
        return
    }
    let body = { title, description }
    sendTask(body)
});

// Create data
async function sendTask(body) {
    const response = await fetch('http://www.localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const responseText = await response.text();
    console.log(responseText); // logs 'OK'
}



// delete Task
async function deleteTask() {
    let id = await this.parentNode.id;

    let confirmMessage = confirm("etes vous sur de vouloir supprimer cette tache?")
    if (confirmMessage == false) {
        return;
    } else {
        try {
            this.parentNode.remove()
            const response = await fetch('http://www.localhost:3000/tasks/' + id, {
                method: 'DELETE',
            });
            const responseText = await response.text();
            console.log(responseText);
        } catch (error) {
            console.log(error);
        }
    }


}