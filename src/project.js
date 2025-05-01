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

  return {
    title: titleValue,
    description: descriptionValue,
    getToDoList,
    getProjectId,
    addToDo,
    removeToDo,
  };
}
