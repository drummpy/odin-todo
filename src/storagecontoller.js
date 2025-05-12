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
      localStorage.setItem("todoStorage", JSON.stringify(data));
    } else {
      console.warn("Unable to save data.");
    }
  };
  // TODO: Implement load data and deserialize

  return { saveData };
}
