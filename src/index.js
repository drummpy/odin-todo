import "./styles.css";
import { ProjectManager } from "./projectmanager";

const project = ProjectManager();

project.createToDo("Blob", "This is a blob", "1954-02-01", "High");
console.log(project.listAllTodo());
project.createProject("Hi", "Description of hi");
console.log(project.listAllProjects());
