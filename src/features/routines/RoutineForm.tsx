import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	MonthDay,
	Time,
	WeekDays,
	PeriodUnits,
	RepeatTypes,
	SubRoutine,
} from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addRoutine, editRoutine, selectRoutine } from './routinesSlice';

import { getTodayMoment } from '../../utils/date/today';

import { FormGroup } from '../../containers/FormGroup';
import { Container } from '../../containers/Container';
import { ServiceText } from '../../containers/ServiceText';
import { DateGroup } from '../../containers/DateGroup';
import { ToggleBlock } from '../../containers/ToggleBlock';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Toggler, TogglerOption } from '../../components/Toggler';
import { Checkbox } from '../../components/Checkbox';
import {
	RepeatParams,
	RepeatTypeToggler,
} from '../../components/RepeatTypeToggler';
import { TimeInput } from '../../components/TimeInput';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/Button';
import { SubRoutines } from '../../components/SubRoutines';

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

export function RoutineForm() {
	const dispatch = useAppDispatch();

	const { id: routineId } = useParams();

	const routine = useAppSelector(selectRoutine(routineId || ''));

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [repeat, setRepeat] = useState(NO_REPEAT);
	const [startMoment, setStartMoment] = useState(getTodayMoment());
	const [resheduleToNextDay, setResheduleToNextDay] = useState(true);
	const [repeatType, setRepeatType] = useState(RepeatTypes.WeekDays);
	const [weekDays, setWeekDays] = useState<WeekDays[]>([]);
	const [monthDays, setMonthDays] = useState<MonthDay[]>([]);
	const [periodValue, setPeriodValue] = useState(1);
	const [periodUnit, setPeriodUnit] = useState(PeriodUnits.Days);
	const [subRoutines, setSubRoutines] = useState<SubRoutine[]>([]);

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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const routineParams = {
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
			subRoutines,
		};

		console.log('handle submit', { routineParams });

		if (!routineId) {
			dispatch(addRoutine(routineParams));
		} else {
			dispatch(editRoutine(routineId, routineParams));
		}
	};

	useEffect(() => {
		console.log({ routine });
		setName(routine?.name || '');
		setDescription(routine?.description || '');
		setRepeat(routine?.repeat ? REPEAT : NO_REPEAT);
		setStartMoment(routine?.startMoment ? routine.startMoment : getTodayMoment());
		setResheduleToNextDay(routine ? routine.resheduleToNextDay : true);
		setRepeatType(routine?.repeatType || RepeatTypes.WeekDays);
		setWeekDays(routine?.weekDays || []);
		setMonthDays(routine?.monthDays || []);
		setPeriodUnit(routine?.periodUnit || PeriodUnits.Days);
		setPeriodValue(routine?.periodValue || 1);
		setSubRoutines(routine?.subRoutines || []);
	}, [routine]);

	return (
		<div>
			<PageHeader
				title={routineId ? 'Редактировать' : 'Новая задача'}
			></PageHeader>

			<Container>
				{routineId && !routine ? (
					<ServiceText>
						Задача с id ${routineId} не существует
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
							</>
						)}

						{repeat === REPEAT && (
							<FormGroup>
								<RepeatTypeToggler
									repeatType={repeatType}
									weekDays={weekDays}
									monthDays={monthDays}
									startMoment={startMoment}
									periodUnit={periodUnit}
									periodValue={periodValue}
									onChange={onChangeRepeatParams}
								/>
							</FormGroup>
						)}

						<FormGroup>
							<Checkbox
								label='Переносить на следующий день'
								checked={resheduleToNextDay}
								onChange={setResheduleToNextDay}
							/>
						</FormGroup>

						<hr />

						<ToggleBlock title='Внутри дня'>
							<SubRoutines subRoutines={subRoutines} onChange={setSubRoutines} />
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
