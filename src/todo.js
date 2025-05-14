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
