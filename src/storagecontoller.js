import { Project } from "./project";
import { Todo } from "./todo";

export function StorageController() {
  const storageAvailable = (type) => {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  };

  const saveData = (todoList, projectList) => {
    const data = { todos: todoList, projects: projectList };
    if (storageAvailable("localStorage")) {
      localStorage.setItem("todoAppData", JSON.stringify(data));
      console.log(`Data saved: ${data}`);
    } else {
      console.warn("Unable to save data.");
    }
  };

  const loadData = () => {
    if (storageAvailable("localStorage")) {
      const rawData = localStorage.getItem("todoAppData");
      if (!rawData) return { todos: [], projects: [] }; // No Data Stored yet

      const parsedData = JSON.parse(rawData);

      const todos = parsedData.todos.map(Todo.fromJSON);
      const projects = parsedData.projects.map(Project.fromJSON);
      console.log(`Data loaded.`);
      return { todos, projects };
    } else {
      console.warn("Unable to load data.");
      return { todos: [], projects: [] };
    }
  };

  const clearData = () => {
    if (storageAvailable("localStorage")) {
      localStorage.removeItem("todoAppData");
      console.log("Data cleared");
    }
  };

  return { saveData, loadData, clearData };
}
