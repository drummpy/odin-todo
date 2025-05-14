import "./styles.css";
import { UIController } from "./uicontroller";

const UI = UIController();
window.UI = UI;
UI.initializeSampleData();
UI.render();
