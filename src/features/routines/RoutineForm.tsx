import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	MonthDay,
	Time,
	WeekDays,
	PeriodUnits,
	RepeatTypes,
	SubRoutine,
	DayOfYear,
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
import { SubRoutineModel } from '../../domain/models/SubRoutine';

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
	const navigate = useNavigate();

	const routine = useAppSelector(selectRoutine(routineId || ''));

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [repeat, setRepeat] = useState(NO_REPEAT);
	const [startMoment, setStartMoment] = useState(getTodayMoment());
	const [resheduleToNextDay, setResheduleToNextDay] = useState(true);
	const [repeatType, setRepeatType] = useState(RepeatTypes.WeekDays);
	const [weekDays, setWeekDays] = useState<WeekDays[]>([]);
	const [monthDays, setMonthDays] = useState<MonthDay[]>([]);
	const [yearDays, setYearDays] = useState<DayOfYear[]>([]);
	const [periodValue, setPeriodValue] = useState(1);
	const [periodUnit, setPeriodUnit] = useState(PeriodUnits.Days);
	const [subRoutines, setSubRoutines] = useState<SubRoutine[]>([
		SubRoutineModel(),
	]);

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
		if ('yearDays' in newParams) {
			setYearDays(newParams.yearDays || []);
		}
		if ('periodUnit' in newParams) {
			setPeriodUnit(newParams.periodUnit || PeriodUnits.Days);
		}
		if ('periodValue' in newParams) {
			setPeriodValue(newParams.periodValue || 1);
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
			yearDays,
			periodUnit,
			periodValue,
			subRoutines,
		};

		if (!routineId) {
			dispatch(addRoutine(routineParams));
		} else {
			dispatch(editRoutine(routineId, routineParams));
		}

		navigate(`/routines`);
	};

	useEffect(() => {
		setName(routine?.name || '');
		setDescription(routine?.description || '');
		setRepeat(routine?.repeat ? REPEAT : NO_REPEAT);
		setStartMoment(
			routine?.startMoment ? routine.startMoment : getTodayMoment()
		);
		setResheduleToNextDay(routine ? routine.resheduleToNextDay : true);
		setRepeatType(routine?.repeatType || RepeatTypes.WeekDays);
		setWeekDays(routine?.weekDays || []);
		setMonthDays(routine?.monthDays || []);
		setYearDays(routine?.yearDays || []);
		setPeriodUnit(routine?.periodUnit || PeriodUnits.Days);
		setPeriodValue(routine?.periodValue || 1);
		setSubRoutines(routine ? routine.subRoutines : [SubRoutineModel()]);
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



						{repeat === REPEAT && (
							<FormGroup>
								<RepeatTypeToggler
									repeatType={repeatType}
									weekDays={weekDays}
									monthDays={monthDays}
									yearDays={yearDays}
									periodUnit={periodUnit}
									periodValue={periodValue}
									onChange={onChangeRepeatParams}
								/>
							</FormGroup>
						)}

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

						<hr />

						<ToggleBlock title='Внутри дня'>
							<SubRoutines
								subRoutines={subRoutines}
								onChange={setSubRoutines}
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
