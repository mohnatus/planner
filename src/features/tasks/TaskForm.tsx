import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask, selectTask } from './tasksSlice';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Toggler, TogglerOption } from '../../components/Toggler';

import { PeriodUnits, RepeatTypes } from '../../domain/types';
import { DateInput } from '../../components/DateInput';
import { getTodayMoment } from '../../utils/date';
import {  MonthDay, WeekDays } from '../../types';
import { Checkbox } from '../../components/Checkbox';
import {
	RepeatParams,
	RepeatTypeToggler,
} from '../../components/RepeatTypeToggler';

const NO_REPEAT = 'no-repeat';
const REPEAT = 'repeat';

const REPEAT_OPTIONS: Array<TogglerOption<string>> = [
	{
		id: NO_REPEAT,
		name: 'Не повторять',
	},
	{
		id: REPEAT,
		name: 'Повторять',
	},
];

export function TaskForm() {
	const dispatch = useAppDispatch();

	const { id: taskId } = useParams();

	const task = useAppSelector(selectTask(taskId || ''));

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [repeat, setRepeat] = useState(NO_REPEAT);
	const [startMoment, setStartMoment] = useState(getTodayMoment());
	const [resheduleToNextDay, setResheduleToNextDay] = useState(false);
	const [repeatType, setRepeatType] = useState(RepeatTypes.WeekDays);
	const [weekDays, setWeekDays] = useState<WeekDays[]>([]);
	const [monthDays, setMonthDays] = useState<MonthDay[]>([]);
	const [periodValue, setPeriodValue] = useState(1);
	const [periodUnit, setPeriodUnit] = useState(PeriodUnits.Days);

	const onChangeRepeatParams = (newParams: Partial<RepeatParams>) => {
		console.log({ newParams });
		if ('repeatType' in newParams) {
			setRepeatType(newParams.repeatType || RepeatTypes.WeekDays);
		}
		if ('weekDays' in newParams) {
			setWeekDays(newParams.weekDays || []);
		}
		if ('monthDays' in newParams) {
			setMonthDays(newParams.monthDays || []);
		}
		if ('periodUnit' in newParams) {
			setPeriodUnit(newParams.periodUnit || PeriodUnits.Days);
		}
		if ('periodValue' in newParams) {
			setPeriodValue(newParams.periodValue || 1);
		}
		if ('startMoment' in newParams) {
			setStartMoment(newParams.startMoment || getTodayMoment());
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const taskParams = {
			name: name,
			description: description,
			repeat: repeat === REPEAT,
			startMoment,
			resheduleToNextDay,
			repeatType,
			weekDays,
			monthDays,
			periodUnit,
			periodValue,
		};

		console.log('handle submit', { taskParams })

		if (!taskId) {
			dispatch(addTask(taskParams));
		} else {
			dispatch(
				editTask({
					taskId,
					data: taskParams,
				})
			);
		}
	};

	useEffect(() => {
		console.log({ task });
		setName(task?.name || '');
		setDescription(task?.description || '');
		setRepeat(task?.repeat ? REPEAT : NO_REPEAT);
		setStartMoment(task?.startMoment ? task.startMoment : getTodayMoment());
		setResheduleToNextDay(task?.resheduleToNextDay || false);
		setRepeatType(task?.repeatType || RepeatTypes.WeekDays);
		setWeekDays(task?.weekDays || []);
		setMonthDays(task?.monthDays || []);
		setPeriodUnit(task?.periodUnit || PeriodUnits.Days);
		setPeriodValue(task?.periodValue || 1);
	}, [task]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{taskId ? 'Редактировать' : 'Новая задача'}</h1>

			{taskId && !task && `Задача с id ${taskId} не существует`}

			<FormGroup id='task-name' label='Название'>
				<Input id='task-name' value={name} onChange={setName}></Input>
			</FormGroup>

			<FormGroup id='task-description' label='Описание'>
				<Textarea
					id='task-description'
					value={description}
					onChange={setDescription}
				></Textarea>
			</FormGroup>

			<Toggler
				options={REPEAT_OPTIONS}
				value={repeat}
				onChange={setRepeat}
			></Toggler>

			{repeat === NO_REPEAT && (
				<div>
					<div>
						Начиная с{' '}
						<DateInput
							value={startMoment}
							onChange={setStartMoment}
						></DateInput>
					</div>

					<Checkbox
						label='Переносить на следующий день'
						checked={resheduleToNextDay}
						onChange={setResheduleToNextDay}
					/>
				</div>
			)}

			{repeat === REPEAT && (
				<div>
					<RepeatTypeToggler
						repeatType={repeatType}
						weekDays={weekDays}
						monthDays={monthDays}
						startMoment={startMoment}
						periodUnit={periodUnit}
						periodValue={periodValue}
						onChange={onChangeRepeatParams}
					/>
				</div>
			)}

			<button type='submit'>Сохранить</button>
		</form>
	);
}
