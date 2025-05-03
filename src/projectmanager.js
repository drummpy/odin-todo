import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { validateDateInputs, validateStringInputs } from "./validators.js";
import { parseISO } from "date-fns";

//Create Project Manager
export function ProjectManager() {
  let allTodos = [];
  let allProjects = [];

  const listAllTodo = () => allTodos;
  const listAllProjects = () => allProjects;

  const createToDo = (
    titleValue,
    descriptionValue,
    dueDateValue,
    priorityValue
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
  };

  const toggleToDoComplete = (id) => {
    const found = allTodos.find((todo) => id === todo.id);
    if (!found) {
      console.warn(`ToDo with id ${id} not found.`);
      return;
    }
    found.completed = !found.completed;
    console.log(`Todo id ${id} switched completed flag to ${found.completed}`);
  };

  const removeToDo = (id) => {
    const index = allTodos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      allTodos.splice(index, 1);
      console.log(`Id ${id} removed from ToDo list`);

      allProjects.forEach((project) => {
        project.removeToDoReference(id);
      });
    }
  };

  const createProject = (title, description) => {
    if (!validateStringInputs(title, description)) {
      console.warn("Invalid string entry when creating project.");
      return;
    }
    const newProject = Project(title.trim(), description.trim());
    allProjects.push(newProject);
    console.log(`Project with title ${title.trim()} added to project list.`);
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
    } else {
      console.warn(`Unable to find & delete project ID ${id}`);
    }
  };

  const getProject = (id) => {
    const project = allProjects.find((project) => project.id === id);
    if (!project) {
      console.warn(`Project with id ${id} not found!`);
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
    } else {
      console.warn(
        `Unable to link todo with ID ${todoID} to project, already present`
      );
    }
  };

  const moveToDoToProject = (todoID, fromProjectId, toProjectId) => {
    const fromproject = getProject(fromProjectId);
    const toproject = getProject(toProjectId);

    if (!fromproject || !toproject) {
      console.warn(`One or both project IDs are invalid`);
      return;
    }

    const fromrefs = fromproject.getToDoReferences();
    const torefs = toproject.getToDoReferences();

    if (torefs.includes(todoID)) {
      console.warn(
        `Todo with id ${todoID} is already present in ${toProjectId}`
      );
      return;
    }

    if (!fromrefs.includes(todoID)) {
      console.warn(`Todo with id ${todoID} was not found in ${fromProjectId}`);
      return;
    }

    fromproject.removeToDoReference(todoID);
    toproject.addToDoReference(todoID);
    console.log(
      `Todo with id ${todoID} moved from ${fromProjectId} to ${toProjectId}`
    );
  };

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
  };
}
