import { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeRoutine, selectRoutines } from './routinesSlice';
import { RepeatTypes, Routine } from '../../types';

import { WEEK_DAYS } from '../../texts/Date';
import { formatTime } from '../../utils/date/time';
import { SPACING_LG } from '../../ui/spacing';

import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../containers/Container';
import { Card, CardContent, CardTitle } from '../../containers/Card';

export interface RoutineProps {
	routine: Routine;
}

const RoutineCard = styled(Card)`
	&:not(:last-child) {
		margin-bottom: ${SPACING_LG}px;
	}
`;

export function RoutinePreview({ routine }: RoutineProps) {
	let repeatBlock: ReactNode = null;
	const dispatch = useAppDispatch();

	if (routine.repeat) {
		let days = '';

		if (routine.repeatType === RepeatTypes.WeekDays) {
			days = routine.weekDays.map((d) => WEEK_DAYS[d]).join(', ');
		} else if (routine.repeatType === RepeatTypes.MonthDays) {
			days = routine.monthDays.join(', ') + ' числам месяца';
		} else {
			days = `Раз в ${routine.periodValue} ${routine.periodUnit}`;
		}

		repeatBlock = <div>Повторять: {days}</div>;
	} else {
		repeatBlock = <div>Не повторять</div>;
	}

	const onRemove = () => {
		dispatch(removeRoutine(routine));
	};

	return (
		<RoutineCard>
			<div>
				<CardTitle>{routine.name}</CardTitle>
			</div>

			<CardContent bordered>
				<div>{routine.description}</div>
				<div>{repeatBlock}</div>
				<div>
					{/* Время:{' '}
					{routine.subRoutines
						.map((subRoutine) => formatTime(subRoutine.time))
						.join(', ')} */}
				</div>
				<Link to={`/routine/${routine.id}`}>Редактировать</Link>
				<div>
					<button onClick={onRemove}>Удалить</button>
				</div>
			</CardContent>
		</RoutineCard>
	);
}

export function RoutinesList() {
	const routines = useAppSelector(selectRoutines);

	return (
		<div>
			<PageHeader title='Список задач'></PageHeader>

			<Container>
				{routines.map((routine: Routine) => (
					<RoutinePreview key={routine.id} routine={routine} />
				))}
			</Container>
		</div>
	);
}
