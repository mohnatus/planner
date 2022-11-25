import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask, selectTask } from './tasksSlice';
import { FormGroup } from '../../containers/FormGroup';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Toggler, TogglerOption } from '../../components/Toggler';

import {
	MonthDay,
	Time,
	WeekDays,
	PeriodUnits,
	RepeatTypes,
} from '../../types';
import { DateInput } from '../../components/DateInput';
import { getTodayMoment } from '../../utils/date/today';

import { Checkbox } from '../../components/Checkbox';
import {
	RepeatParams,
	RepeatTypeToggler,
} from '../../components/RepeatTypeToggler';
import { TimeInput } from '../../components/TimeInput';
import {
	TaskExceptionParams,
	TaskExceptions,
} from '../../components/TaskExceptions';
import { Container } from '../../containers/Container';
import { PageHeader } from '../../components/PageHeader';
import { ServiceText } from '../../containers/ServiceText';
import { DateGroup } from '../../containers/DateGroup';
import { Button } from '../../components/Button';
import { ToggleBlock } from '../../containers/ToggleBlock';

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
	const [defaultTime, setDefaultTime] = useState<Time[]>([]);
	const [excludeWeekDays, setExcludeWeekDays] = useState<WeekDays[]>([]);
	const [excludeMonthDays, setExcludeMonthDays] = useState<MonthDay[]>([]);

	const onChangeRepeatParams = (newParams: Partial<RepeatParams>) => {
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

	const onChangeExceptionsParams = (
		newParams: Partial<TaskExceptionParams>
	) => {
		if ('weekDays' in newParams) {
			setExcludeWeekDays(newParams.weekDays || []);
		}
		if ('monthDays' in newParams) {
			setExcludeMonthDays(newParams.monthDays || []);
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
			defaultTime,
			exclude: {
				weekDays: excludeWeekDays,
				monthDays: excludeMonthDays,
			},
		};

		console.log('handle submit', { taskParams });

		if (!taskId) {
			dispatch(addTask(taskParams));
		} else {
			dispatch(editTask(taskId, taskParams));
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
		setDefaultTime(task?.defaultTime || []);
		setExcludeWeekDays(task?.exclude.weekDays || []);
		setExcludeMonthDays(task?.exclude.monthDays || []);
	}, [task]);

	return (
		<div>
			<PageHeader
				title={taskId ? 'Редактировать' : 'Новая задача'}
			></PageHeader>

			<Container>
				{taskId && !task ? (
					<ServiceText>
						Задача с id ${taskId} не существует
					</ServiceText>
				) : (
					<form onSubmit={handleSubmit}>
						<FormGroup id='task-name' label='Название'>
							<Input
								id='task-name'
								value={name}
								onChange={setName}
							></Input>
						</FormGroup>

						<FormGroup id='task-description' label='Описание'>
							<Textarea
								id='task-description'
								value={description}
								onChange={setDescription}
							></Textarea>
						</FormGroup>

						<FormGroup>
							<Toggler
								options={REPEAT_OPTIONS}
								value={repeat}
								onChange={setRepeat}
							></Toggler>
						</FormGroup>

						{repeat === NO_REPEAT && (
							<>
								<FormGroup>
									<DateGroup
										label='Начиная с'
										value={startMoment}
										onChange={setStartMoment}
									/>
								</FormGroup>

								<FormGroup>
									<Checkbox
										label='Переносить на следующий день'
										checked={resheduleToNextDay}
										onChange={setResheduleToNextDay}
									/>
								</FormGroup>
							</>
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

						<hr />

						<ToggleBlock title='Настроить время'>
							<TimeInput
								values={defaultTime}
								onChange={setDefaultTime}
							/>
						</ToggleBlock>

						<hr />

						<ToggleBlock title='Настроить исключения'>
							<TaskExceptions
								weekDays={excludeWeekDays}
								monthDays={excludeMonthDays}
								onChange={onChangeExceptionsParams}
							/>
						</ToggleBlock>

						<Button type='submit' accent block>
							Сохранить
						</Button>
					</form>
				)}
			</Container>
		</div>
	);
}
