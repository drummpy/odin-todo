//Create Project Object
export function Project(
  titleValue,
  descriptionValue,
  idValue = crypto.randomUUID(),
  todoReferences = []
) {
  const todoIds = todoReferences;
  const projectId = idValue;
  const title = titleValue;
  const description = descriptionValue;

  const getProjectId = () => projectId;
  const getTitle = () => title;
  const getDescription = () => description;
  const getToDoReferences = () => [...todoIds];

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

  //Returns these items for JSON stringify instead of whole object, must be named this
  const toJSON = () => ({ projectId, title, description, todoIds });

  return {
    getTitle,
    getDescription,
    getProjectId,
    addToDoReference,
    removeToDoReference,
    getToDoReferences,
    toJSON,
  };
}
