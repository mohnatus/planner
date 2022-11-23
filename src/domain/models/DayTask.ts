import { nanoid } from "nanoid";
import { DayTask, Task } from "../../types";

export function DayTaskModel(task: Task, time: number|null): DayTask {
  const { id, name, description } = task;

  return {
    id: nanoid(),
    taskId: id,
    name,
    description,
    time
  }
}