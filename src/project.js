//Create Project Object
export function Project(titleValue, descriptionValue) {
  const todoList = [];
  const projectId = crypto.randomUUID();

  const getToDoList = () => todoList;

  const getProjectId = () => projectId;

  const addToDo = (todo) => {
    if (todo && todo.id) {
      todoList.push(todo);
      console.log(`Todo if id ${todo.id} added`);
    } else {
      console.log("Unable to add ToDo, invalid object");
    }
  };

  const removeToDo = (id) => {
    const index = todoList.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todoList.splice(index, 1);
      console.log(`Todo with id ${id} removed`);
    }
  };

  const toggleToDoComplete = (id) => {
    const found = todoList.find((todo) => id === todo.id);
    if (!found) {
      console.warn(`ToDo with id ${id} not found.`);
      return;
    }
    found.completed = !found.completed;
    console.log(`Todo id ${id} switched completed flag to ${found.completed}`);
  };

  const getToDo = (id) => {
    if (!id) {
      console.warn(`Invalid id passed to getToDo: ${id}`);
      return;
    }
    return todoList.find((todo) => id === todo.id);
  };

  const updateToDo = (id, updates) => {
    const todo = todoList.find((todo) => id === todo.id);
    if (!todo) {
      console.warn(`Todo with id ${id} not found.`);
      return;
    }
    Object.assign(todo, updates);
    console.log(`Todo with id ${id} updated.`);
  };

  return {
    title: titleValue,
    description: descriptionValue,
    getToDoList,
    getProjectId,
    addToDo,
    removeToDo,
    toggleToDoComplete,
    getToDo,
  };
}
