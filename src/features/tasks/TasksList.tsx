import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectTasks
} from './tasksSlice';
import styles from './Tasks.module.css';
import { Task } from '../../domain/types';
import { Link } from 'react-router-dom';

export interface TaskProps {
  task: Task
}

export function TaskPreview({ task }: TaskProps) {
  return <div>{ task.name }
      <Link to={`/task/${task.id}`}>Редактировать</Link>
  </div>
}

export function TasksList() {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();


  return (
    <div>
      <h1>Список задач</h1>

      {tasks.map((task: Task) => (<TaskPreview key={task.id} task={task} />))}
    </div>
  );
}
