import { ProjectManager } from "./projectmanager";

const projectManager = ProjectManager();

//Create UIController
export function UIController() {
  const content = document.querySelector(".content");
  const toDoTitle = document.getElementById("title");
  const toDoDescription = document.getElementById("description");
  const toDoDate = document.getElementById("dueDate");
  const toDoPriority = document.getElementById("priority");
  const projectTitle = document.getElementById("projectTitle");
  const projectDescription = document.getElementById("projectDesc");
  const addToDoButton = document.getElementById("addToDoButton");
  const addProjectButton = document.getElementById("addProjectButton");

  window.addEventListener("DOMContentLoaded", () => {
    const toDoDate = document.getElementById("dueDate");
    toDoDate.valueAsDate = new Date();
  });

  const renderProject = (project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-card");

    const projectHeader = `
      <h3>${project.getTitle()}</h3>
      <p>${project.getDescription()}</p>`;
    projectDiv.innerHTML = projectHeader;

    const toDoListDiv = document.createElement("div");
    toDoListDiv.classList.add("todo-list");
    toDoListDiv.id = `project-${project.getProjectId()}-todos`;

    projectDiv.appendChild(toDoListDiv);
    content.appendChild(projectDiv);

    // Debug: Log the Todos associated with the project
    console.log(
      `Rendering Todos for Project ID ${project.getProjectId()}:`,
      project.getToDoReferences()
    );

    project.getToDoReferences().forEach((todoID) => {
      const todo = projectManager.getToDo(todoID);
      if (todo) {
        renderTodo(todo, project.getProjectId());
      } else {
        console.warn(`Todo with ID ${todoID} not found.`);
      }
    });
  };

  const renderTodo = (toDo, projectID = null) => {
    console.log(`Rendering Todo: ${toDo.title}, Project ID: ${projectID}`);
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo-card");

    const projectOptions = projectManager
      .listAllProjects()
      .map(
        (project) =>
          `<option value="${project.getProjectId()}" ${
            project.getProjectId() === projectID ? "selected" : ""
          }>${project.getTitle()}</option>`
      )
      .join("");

    toDoDiv.innerHTML = `
        <div class="todo-header">
            <h4>${toDo.title}</h4>
            <div class="todo-actions">
                <label>
                <input type="checkbox" id="done-${toDo.id}"/>
                Done
                </label>
                <select id="move-${toDo.id}">
                ${projectOptions}
                </select>
            </div>
        </div>
        <p>${toDo.description}</p>
        <small>Due: ${toDo.dueDate} | Priority: ${toDo.priority}</small>
        `;
    toDoDiv.id = toDo.id;

    let parentContainer;
    if (projectID) {
      parentContainer = document.getElementById(`project-${projectID}-todos`);
    } else {
      parentContainer = document.getElementById("unassigned-todos");
    }

    if (parentContainer) {
      parentContainer.appendChild(toDoDiv);
    } else {
      console.warn(`Parent container not found for ToDo ID ${toDo.id}`);
    }

    const doneSelector = toDoDiv.querySelector(`#done-${toDo.id}`);
    doneSelector.addEventListener("change", () => {
      projectManager.toggleToDoComplete(toDo.id);
      render();
    });
    const moveSelector = toDoDiv.querySelector(`#move-${toDo.id}`);
    moveSelector.addEventListener("change", (e) => {
      const newProjectID = e.target.value;
      if (newProjectID) {
        projectManager.moveToDoToProject(toDo.id, projectID, newProjectID);
        render();
      }
    });
  };

  const clearUI = () => {
    content.innerHTML = "";
  };

  const render = () => {
    clearUI();

    projectManager.listAllProjects().forEach((project) => {
      renderProject(project);
    });

    const unassignedDiv = document.createElement("div");
    unassignedDiv.id = "unassigned-todos";
    content.appendChild(unassignedDiv);

    projectManager.listUnassignedToDos().forEach((todo) => {
      renderTodo(todo);
    });
  };

  const clearToDoForm = () => {
    toDoTitle.value = "";
    toDoDescription.value = "";
    toDoDate.value = "";
    toDoPriority.value = "Low";
  };

  const clearProjectForm = () => {
    projectTitle.value = "";
    projectDescription.value = "";
  };

  addToDoButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = toDoTitle.value;
    const description = toDoDescription.value;
    const date = toDoDate.value;
    const priority = toDoPriority.value;

    if (!title.trim()) {
      alert("Please enter a title for your todo.");
      return;
    }

    projectManager.createToDo(title, description, date, priority);
    render();
    clearToDoForm();
  });

  addProjectButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = projectTitle.value;
    const description = projectDescription.value;

    if (!title.trim()) {
      alert("Please enter a title for your project.");
      return;
    }

    projectManager.createProject(title, description);
    render();
    clearProjectForm();
  });

  console.log("UI Initialized");

  const initializeSampleData = () => {
    if (projectManager.listAllProjects().length === 0) {
      const homeProject = projectManager.createProject(
        "Home Tasks",
        "Stuff to do around the house"
      );
      const workProject = projectManager.createProject(
        "Work Projects",
        "Things to handle at work"
      );

      console.log("Home Project:", homeProject);
      console.log("Work Project:", workProject);
      console.log(
        "All Projects after initialization:",
        projectManager.listAllProjects()
      );

      projectManager.createToDo(
        "Do the laundry",
        "Wash, dry, fold",
        "2025-05-12",
        "Medium",
        homeProject.getProjectId()
      );
      projectManager.createToDo(
        "Grocery shopping",
        "Buy milk, eggs, bread",
        "2025-05-11",
        "Low",
        homeProject.getProjectId()
      );
      projectManager.createToDo(
        "Prepare presentation",
        "Quarterly results",
        "2025-05-14",
        "High",
        workProject.getProjectId()
      );

      console.log(
        "All Todos after initialization:",
        projectManager.listAllTodo()
      );
    }
  };

  return { render, initializeSampleData };
}
