import { ProjectManager } from "./projectmanager";

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

  const renderProject = (project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project-card");

    const projectHeader = `
      <h3>${project.getTitle()}</h3>
      <p>${project.getDescription()}</p>`;
    projectDiv.innerHTML = projectHeader;

    const toDoListDiv = document.createElement("div");
    toDoListDiv.classList.add("todo-list");
    toDoListDiv.id = `project-${project.id}-todos`;

    projectDiv.appendChild(toDoListDiv);
    content.appendChild(projectDiv);

    project.getToDoReferences().forEach((todo) => {
      renderTodo(todo, project.id);
    });
  };

  const renderTodo = (toDo, projectID = null) => {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo-card");

    const projectOptions = ProjectManager.listAllProjects()
      .map(
        (project) =>
          `<option value="${project.id}" ${
            project.id === projectID ? "selected disabled" : ""
          }>${project.title}</option>`
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
      ProjectManager.toggleToDoComplete(toDo.id);
      render();
    });
    const moveSelector = toDoDiv.querySelector(`#move-${toDo.id}`);
    moveSelector.addEventListener("change", (e) => {
      const newProjectID = e.target.value;
      if (newProjectID) {
        ProjectManager.moveToDoToProject(toDo.id, projectID, newProjectID);
        render();
      }
    });
  };

  const clearUI = () => {
    content.innerHTML = "";
  };
  // TODO: render()
  const render = () => {
    clearUI();

    ProjectManager.listAllProjects().forEach((project) => {
      renderProject(project);
    });

    const unassignedDiv = document.createElement("div");
    unassignedDiv.id = "unnassigned-todos";
    content.appendChild(unassignedDiv);

    ProjectManager.listUnassignedToDos().forEach((todo) => {
      renderTodo(todo);
    });
  };

  // TODO: renderUnassignedTodo()
  // TODO: write return statement
}
