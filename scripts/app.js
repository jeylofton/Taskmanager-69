const currentUserId = 1;

function saveTask(){

const title = $("#txtTitle").val();
const desc = $("#txtDescription").val();
const color = $("#selColor").val();
const date = $("#selDate").val();
const status = $("#selStatus").val();
const budget = $("#numBudget").val();


    // Create the object
    const taskToSave = new Task(title, desc, color, date, status, budget, currentUserId);
    console.log(taskToSave);

    //mock the response from the server
    // displayTask(taskToSave);

    // Send to Server
    $.ajax({
        type:"POST", // HTTP verb: Create
        url: API,
        data: JSON.stringify(taskToSave),
        contentType:"application/json",
        success:function(created){
            console.log(created);
            loadTask();
        },
        error: function(err){
            console.log(err);
        }
    })

    // Clear the form for the next task
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selColor").val("#ffcc00");
    $("#selDate").val("");
    $("#selStatus").val("New");
    $("#numBudget").val("");
}

function updateTask(){
    // Get the task that belongs to the Edit button that was clicked.
    let btn = $(this);
    let taskElement = btn.parents(".task");
    let id = taskElement.attr("id");

    // Ask the user for the two values required by the challenge.
    let newTitle = prompt("Enter new title:");
    let newBudget = prompt("Enter new budget:");

    // Stop if either prompt was cancelled or left empty.
    if (newTitle === null || newBudget === null ||
        newTitle.trim() === "" || newBudget.trim() === "") {
        return;
    }

    $.ajax({
        type:"PUT",
        url: `${API}/${id}`,
        data: JSON.stringify({
            title: newTitle,
            budget: newBudget
        }),
        contentType:"application/json",
        success: function(response){
            console.log(response);
            loadTask();
        },
        error: function(err){
            console.log(err);
            alert("Error updating task");
        }
    });
}

const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTask(){
    $.ajax({
        type:"get", //HTTP Verb. READ
        url: API,
        success: function(data){
            console.log(data);
            $(".list").empty();
            for(let i = 0; i < data.length; i++){
                // Only display tasks that belong to the current user.
                if (Number(data[i].userId) === currentUserId) {
                    displayTask(data[i]);
                }
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}

function deleteTask(){
    //1. Context: this is the specific button that was clicked
    let btn = $(this);

    //2. Find the parent div with the class task
    let taskElement = btn.parents(".task");

    //3. Get the ID that we save in to the HTML
    let id= taskElement.attr("id");

    console.log("requesting id is", id);

    // Send the task ID to the server and remove the card after deletion.
    $.ajax({
        type: "DELETE",
        url: `${API}/${id}`,
        success: function(){
            taskElement.remove();
        },
        error: function(err){
            console.log(err);
        }
    });
}

function displayTask(task){
    let syntax =  `
    <div id="${task.id}" data-user-id="${task.userId}" class="task" style="border-color:${task.color}">
    <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
    </div>
    <label class="status">${task.status}</label>
    <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
    </div>
    <button class="btn-edit"> Edit </button>
    <button class="btn-delete"> Delete </button>
    </div>`;
    
  // Inject the new HTML into the DOM Tree
$(".list").append(syntax);
}

function init(){
    // console.log("Hello from 106");
    $("#btnSave").click(saveTask);
    $(".list").on("click", ".btn-edit", updateTask);
    $(".list").on("click",".btn-delete",deleteTask);
    loadTask();
}

function second(){
    // console.log("Hello There");
}

window.onload = init;
// It force that the HTML and the CSS gets resolved before that the logic gets executed.
