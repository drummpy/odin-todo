import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { validateDateInputs, validateStringInputs } from "./validators.js";
import { parseISO } from "date-fns";
import { saveData } from "./storagecontoller.js";

//Create Project Manager
export function ProjectManager() {
  let allTodos = [];
  let allProjects = [];

  const listAllTodo = () => allTodos;
  const listAllProjects = () => {
    console.log("Listing all projects:", allProjects); // Debugging log
    return allProjects;
  };

  const listUnassignedToDos = () => {
    const assignedToDoIds = allProjects.flatMap((project) =>
      project.getToDoReferences()
    );
    return allTodos.filter((todo) => !assignedToDoIds.includes(todo.id));
  };

  const createToDo = (
    titleValue,
    descriptionValue,
    dueDateValue,
    priorityValue,
    projectID = null // Accept optional projectID
  ) => {
    if (!validateStringInputs(titleValue, descriptionValue, priorityValue)) {
      console.warn("Invalid string type entry when creating ToDo.");
      return;
    }
    if (!validateDateInputs(dueDateValue)) {
      console.warn("Invalid date input for dueDate");
      return;
    }

    const dueDate = parseISO(dueDateValue);

    const newTodo = Todo(
      titleValue.trim(),
      descriptionValue.trim(),
      dueDate,
      priorityValue.trim()
    );
    allTodos.push(newTodo);
    console.log(`Todo with title ${titleValue.trim()} added to Todo list.`);
    saveData(allTodos, allProjects);

    // If a projectID is provided, associate the Todo with the project
    if (projectID) {
      const project = getProject(projectID);
      if (project) {
        project.addToDoReference(newTodo.id);
        console.log(
          `Todo with ID ${newTodo.id} associated with Project ID ${projectID}`
        );
      } else {
        console.warn(`Project with ID ${projectID} not found.`);
      }
    }

    return newTodo;
  };

  const getToDo = (id) => {
    if (!id) {
      console.warn(`Invalid id passed to getToDo: ${id}`);
      return;
    }
    return allTodos.find((todo) => id === todo.id);
  };

  const updateToDo = (id, updates) => {
    const todo = allTodos.find((todo) => id === todo.id);
    if (!todo) {
      console.warn(`Todo with id ${id} not found.`);
      return;
    }
    Object.assign(todo, updates);
    console.log(`Todo with id ${id} updated.`);
    saveData(allTodos, allProjects);
  };

  const toggleToDoComplete = (id) => {
    const found = allTodos.find((todo) => id === todo.id);
    if (!found) {
      console.warn(`ToDo with id ${id} not found.`);
      return;
    }
    found.completed = !found.completed;
    console.log(`Todo id ${id} switched completed flag to ${found.completed}`);
    saveData(allTodos, allProjects);
  };

  const removeToDo = (id) => {
    const index = allTodos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      allTodos.splice(index, 1);
      console.log(`Id ${id} removed from ToDo list`);

      allProjects.forEach((project) => {
        project.removeToDoReference(id);
      });
      saveData(allTodos, allProjects);
    }
  };

  const createProject = (title, description) => {
    if (!validateStringInputs(title, description)) {
      console.warn("Invalid string entry when creating project.");
      return;
    }
    const newProject = Project(title.trim(), description.trim());
    allProjects.push(newProject);
    console.log(`Project created:`, newProject);
    console.log(`All projects:`, allProjects); // Debugging log
    saveData(allTodos, allProjects);
    return newProject;
  };

  const deleteProject = (id) => {
    const index = allProjects.findIndex((project) => project.id === id);
    if (index !== -1) {
      const project = allProjects[index];
      const todoids = project.getToDoReferences();

      todoids.forEach((todoid) => {
        removeToDo(todoid);
      });

      allProjects.splice(index, 1);
      console.log(`ID ${id} removed from project list`);
      saveData(allTodos, allProjects);
    } else {
      console.warn(`Unable to find & delete project ID ${id}`);
    }
  };

  const getProject = (id) => {
    const project = allProjects.find(
      (project) => project.getProjectId() === id
    );
    if (!project) {
      console.warn(`Project with id ${id} not found!`);
      console.log("Current projects:", allProjects); // Debugging log
      return null;
    }
    return project;
  };

  const assignToDoToProject = (todoID, projectID) => {
    const project = allProjects.find((proj) => proj.id === projectID);
    if (!project) {
      console.warn(`Project with ID ${projectID} not found.`);
      return;
    }

    const projectrefs = project.getToDoReferences();
    const alreadylinked = projectrefs.includes(todoID);

    if (!alreadylinked) {
      project.addToDoReference(todoID);
      console.log(`Todo ID ${todoID} linked with project ID ${projectID}`);
      saveData(allTodos, allProjects);
    } else {
      console.warn(
        `Unable to link todo with ID ${todoID} to project, already present`
      );
    }
  };

  const moveToDoToProject = (todoID, fromProjectId, toProjectId) => {
    const toProject = getProject(toProjectId);
    if (!toProject) {
      console.warn(`Target project ID ${toProjectId} is invalid.`);
      return;
    }

    if (fromProjectId) {
      const fromProject = getProject(fromProjectId);
      if (fromProject && fromProject.getToDoReferences().includes(todoID)) {
        fromProject.removeToDoReference(todoID);
      } else {
        console.warn(
          `Todo with ID ${todoID} not found in project ${fromProjectId}`
        );
      }
    }

    if (!toProject.getToDoReferences().includes(todoID)) {
      toProject.addToDoReference(todoID);
      console.log(`Todo with id ${todoID} moved to project ${toProjectId}`);
      saveData(allTodos, allProjects);
    } else {
      console.warn(
        `Todo with id ${todoID} is already in project ${toProjectId}`
      );
    }
  };

  console.log("Project Manager initialized.");

  return {
    listAllTodo,
    listAllProjects,
    createToDo,
    getToDo,
    updateToDo,
    toggleToDoComplete,
    removeToDo,
    createProject,
    deleteProject,
    assignToDoToProject,
    moveToDoToProject,
    listUnassignedToDos,
  };
}
