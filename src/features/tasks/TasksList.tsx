import React, { ReactNode, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectTasks
} from './tasksSlice';
import styles from './Tasks.module.css';
import { RepeatTypes, Task } from '../../domain/types';
import { Link } from 'react-router-dom';
import { WEEK_DAYS } from '../../texts/Date';

export interface TaskProps {
  task: Task
}

export function TaskPreview({ task }: TaskProps) {
  let repeatBlock: ReactNode = '';

  if (task.repeat) {
    let days = '';

    if (task.repeatType === RepeatTypes.WeekDays) {
      days = task.weekDays.map(d => WEEK_DAYS[d]).join(', ')
    } else if (task.repeatType === RepeatTypes.MonthDays) {
      days = task.monthDays.join(', ') + ' числам месяца';
    } else {
      days = `Раз в ${task.periodValue} ${task.periodUnit}`
    }

    repeatBlock = <div>
      Повторять: {days}
    </div>
  } else {
    repeatBlock = <div>Не повторять</div>
  }


  return <div>
    <div>{ task.name }</div>
    <div>{task.description}</div>
    <div>{repeatBlock}</div>
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
