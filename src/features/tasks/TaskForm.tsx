import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask, selectTask } from './tasksSlice';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';

export function TaskForm() {
	const dispatch = useAppDispatch();

	const { id: taskId } = useParams();

	const task = useAppSelector(selectTask(taskId || ''));
	console.log({ task, taskId });

	const [name, setName] = useState('');
  const [description, setDescription] = useState('');

	const updateValue = (e: FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;

    switch(id) {
      case 'task-name':
          setName(value);
          break;
      case 'task-descripion':
          setDescription(value);
          break;
    }
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

    const taskParams = {
        name,
        description
      }

		if (!taskId) {

			dispatch(addTask(taskParams));
		} else {
      dispatch(editTask({
        taskId,
        data: taskParams
      }))
    }
	};

	useEffect(() => {
		setName(task?.name || '');
	}, [task]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{taskId ? 'Редактировать' : 'Новая задача'}</h1>

      { taskId && !task && `Задача с id ${taskId} не существует`}

      <FormGroup id="task-name" label="Название">
        <Input id='task-name' value={name} onChange={updateValue}></Input>
      </FormGroup>

      <FormGroup id="task-description" label="Описание">
        <Textarea id='task-description' value={description} onChange={updateValue}></Textarea>
      </FormGroup>

			<button type='submit'>Сохранить</button>
		</form>
	);
}
