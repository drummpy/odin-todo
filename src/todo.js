//Create Todo Object
export function Todo(
  titleValue,
  descriptionValue,
  dueDateValue,
  priorityValue
) {
  return {
    id: crypto.randomUUID(),
    title: titleValue,
    description: descriptionValue,
    dueDate: dueDateValue,
    priority: priorityValue,
    completed: false,
  };
}
