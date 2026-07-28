# My Task Manager

My Task Manager is a small web application for creating and managing tasks. It was built to practice JavaScript, jQuery, object-oriented programming, DOM manipulation, event handling, and CRUD requests to an API.

Each task can include a title, description, color, due date, status, and budget. Tasks can be created, displayed, edited, and deleted. The application also filters tasks so that only tasks belonging to the current user are shown.

## Features

- Create a new task
- Assign a title, description, color, date, status, and budget
- Load tasks from an API
- Filter tasks by user ID
- Edit a task's title and budget
- Delete a task
- Use the selected color as the task's left border
- Reload the task list after creating or updating a task

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery 3.7.1
- AJAX
- REST API

## Project Structure

```text
Taskmanager/
├── index.html
├── README.md
├── scripts/
│   ├── app.js
│   └── task.js
└── styles/
    └── app.css
```

- `index.html` contains the form and task-list containers.
- `styles/app.css` contains the page, form, button, and task-card styles.
- `scripts/task.js` contains the `Task` class.
- `scripts/app.js` contains the application logic and API requests.

## How to Run the Project

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` with Live Server or another local web server.
4. Complete the form and select **Save Task**.

The application needs an internet connection because it loads jQuery from a CDN and sends requests to a remote API.

## The Task Class

The `Task` class creates a task object from the form values:

```js
class Task {
    constructor(title, description, color, date, status, budget, userId) {
        this.title = title;
        this.desc = description;
        this.color = color;
        this.date = date;
        this.status = status;
        this.budget = budget;
        this.userId = userId;
    }
}
```

The class keeps all the properties for one task together. When the user saves the form, the program creates a new `Task` object and converts it to JSON before sending it to the API.

## Main Functions

### `saveTask()`

This function:

1. Reads the values from the form with jQuery's `.val()` method.
2. Creates a new `Task` object.
3. Adds `currentUserId` to the task.
4. Sends the task to the API with a POST request.
5. Reloads the task list after a successful response.
6. Clears the form for the next task.

### `loadTask()`

This function sends a GET request to retrieve tasks from the API. It clears the current list, loops through the response, and only displays tasks whose `userId` matches `currentUserId`.

```js
if (Number(data[i].userId) === currentUserId) {
    displayTask(data[i]);
}
```

`Number()` makes the comparison reliable if the API returns the user ID as text instead of a number.

### `displayTask(task)`

This function creates the HTML for one task and appends it to the task list. It stores two important values in the HTML:

- `id` stores the unique task ID used for editing and deleting.
- `data-user-id` stores the ID of the user who owns the task.

The function also places `task.color` in the inline `border-color` style. The `.task` CSS rule creates a solid left border, which makes the chosen color visible.

### `updateTask()`

This function runs when an Edit button is clicked. It finds the clicked button's parent task, reads that task's ID, and uses `prompt()` to ask for a new title and budget. If both values are provided, it sends a PUT request to the API and reloads the list.

### `deleteTask()`

This function finds the task connected to the clicked Delete button, reads its ID, and sends a DELETE request to the API. The task element is removed from the page only after the API confirms the deletion.

### `init()`

This function connects the buttons to their functions and loads the task list when the page is ready.

The Edit and Delete buttons are created dynamically, so the project uses event delegation:

```js
$(".list").on("click", ".btn-edit", updateTask);
$(".list").on("click", ".btn-delete", deleteTask);
```

Instead of attaching an event directly to every button, the click event is attached to the permanent `.list` container. It can then respond when one of its current or future buttons is clicked.

## CRUD Operations

| Operation | HTTP method | Function | Purpose |
| --- | --- | --- | --- |
| Create | POST | `saveTask()` | Send a new task to the API |
| Read | GET | `loadTask()` | Retrieve tasks from the API |
| Update | PUT | `updateTask()` | Change a task's title and budget |
| Delete | DELETE | `deleteTask()` | Remove a task from the API |

## Questions and Problems Solved

### Why was HTML appearing as text in the task list?

The opening task tag was missing the element name:

```html
< class="task">
```

It was corrected to:

```html
<div class="task">
```

Because the first version was not a valid opening HTML tag, the browser displayed it as text.

### Why did the Delete button not work?

The delete function tried to read an ID from the task element, but the rendered task did not originally store its ID. Adding `id="${task.id}"` to the task container allowed the function to build the correct API address:

```js
url: `${API}/${id}`
```

### What is the difference between `id` and `userId`?

- `id` identifies one specific task. It is used when editing or deleting that task.
- `userId` identifies the user who owns the task. It is used when filtering the task list.

They may both contain numbers, but they represent different information and should not be used interchangeably.

### Why did older tasks disappear after user filtering was added?

The application currently uses this testing value:

```js
const currentUserId = 1;
```

Only tasks with `userId: 1` are displayed. Older tasks created before `userId` was added do not match the filter, so hiding them is expected. Newly created tasks include the current user ID.

### Why was the selected task color not visible?

The program correctly set `border-color`, but a color alone does not create a border. The task also needed a border width and style:

```css
.task {
    border-left: 8px solid;
}
```

The inline color and the CSS border rule now work together.

### Why are Edit and Delete events attached to `.list`?

The task buttons do not exist when the page first loads; they are added later by `displayTask()`. Event delegation lets the permanent list container handle clicks from those dynamically created buttons.

## Current Testing Setup

This project uses a hard-coded current user:

```js
const currentUserId = 1;
```

This is suitable for the current assignment. A production application would normally get the user ID from a login system instead.

## Possible Future Improvements

- Replace `prompt()` with an edit form or modal
- Add form validation and user-friendly success/error messages
- Add user authentication instead of a hard-coded user ID
- Filter tasks by status or due date
- Add a confirmation message before deleting a task
- Improve mobile styling and accessibility

## What I Learned

This project demonstrates how data moves through a front-end application: the form creates an object, AJAX sends it to an API, the response is turned into HTML, and user actions send additional requests to update or delete the correct record. It also shows why valid HTML, consistent property names, task IDs, user IDs, CSS border rules, and event delegation are important.
