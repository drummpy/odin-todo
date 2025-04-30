//Create Todo Object
export function Todo(
  titleValue,
  descriptionValue,
  dueDateValue,
  priorityValue
) {
  return {
    id: crypto.randomUUID(), // or use Date.now() if needed
    title: titleValue,
    description: descriptionValue,
    dueDate: dueDateValue,
    priority: priorityValue,
    completed: false,
  };
}
