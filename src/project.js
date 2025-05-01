//Create Project Object
export function Project(titleValue, descriptionValue) {
  const todoIds = [];
  const projectId = crypto.randomUUID();

  const getProjectId = () => projectId;
  const getTitle = () => titleValue;
  const getDescription = () => descriptionValue;
  const getToDoReferences = () => todoIds;

  const addToDoReference = (id) => {
    if (id && !todoIds.includes(id)) {
      todoIds.push(id);
      console.log(`Todo id ${id} added`);
    } else {
      console.log("Unable to add ToDoId to project ID list");
    }
  };

  const removeToDoReference = (id) => {
    const index = todoIds.findIndex((todoref) => todoref === id);
    if (index !== -1) {
      todoIds.splice(index, 1);
      console.log(`Id ${id} removed from project ID list`);
    }
  };

  return {
    getTitle,
    getDescription,
    getProjectId,
    addToDoReference,
    removeToDoReference,
    getToDoReferences,
  };
}
