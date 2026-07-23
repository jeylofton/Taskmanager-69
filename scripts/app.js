function saveTask(){

const title = $("#txtTitle").val();
const desc = $("#txtDescription").val();
const color = $("#selColor").val();
const date = $("#selDate").val();
const status = $("#selStatus").val();
const budget = $("#numBudget").val();


    // Create the object
    const taskToSave = new Task(title, desc, color, date, status, budget);
    console.log(taskToSave);
}

const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTask(){
    $.ajax({
        type:"get", //HTTP Verb. READ
        url: API,
        success: function(data){
            console.log(data)
        },
        error:function(err){
            console.log(err);
        }
        
    })
}

function displayTask(task){
    let syntax =  `
    <div class="task" style="border-color:${task.color}">
    <div class="info">
        <h4>${task.title}</h4>
        <p>${task.desc}</p>
    </div>
    <label class="status">${task.status}</label>
    <div class="date-budget">
        <label>Due: ${task.date}</label>
        <label>Budget: $${task.budget}</label>
    </div>
    </div>`;
    
  // Inject the new HTML into the DOM Tree
$(".list").append(syntax);
}

function init(){
    // console.log("Hello from 106");
    $("#btnSave").click(saveTask);
}

function second(){
    // console.log("Hello There");
}

window.onload = init;
// It force that the HTML and the CSS gets resolved before that the logic gets executed.