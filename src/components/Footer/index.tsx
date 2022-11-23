import { Link } from "react-router-dom";

export function Footer() {
  return <footer>
    <Link to="/tasks">Tasks List</Link>
    <Link to="/calendar">Calendar</Link>
    <Link to="/task/new">Add task</Link>
  </footer>
}