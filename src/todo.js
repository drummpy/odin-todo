//Create Todo Object
export function Todo(
  titleValue,
  descriptionValue,
  dueDateValue,
  priorityValue,
  idValue = crypto.randomUUID(),
  completedValue = false
) {
  return {
    id: idValue,
    title: titleValue,
    description: descriptionValue,
    dueDate: dueDateValue,
    priority: priorityValue,
    completed: completedValue,
  };
}

Todo.fromJSON = function (data) {
  return Todo(
    data.title,
    data.description,
    new Date(data.dueDate),
    data.priority,
    data.id,
    data.completed
  );
};
