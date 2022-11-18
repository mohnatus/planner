import { ChangeEvent, FormEvent, useRef } from "react"
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "./tasksSlice";

export function TaskForm() {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('id');

  const name = useRef<string>('');


  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    if (id === 'task-name') {
      name.current = value;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!taskId) {
      dispatch(addTask({ name: name.current }))
    }
  }

  return <form onSubmit={handleSubmit}>
    <h1>{ taskId ? 'Редактировать' : 'Новая задача'}</h1>
    <label htmlFor="task-name">Название</label>
    <input type="text" id="task-name" onChange={updateValue} />
    <button type="submit">Сохранить</button>
  </form>
}