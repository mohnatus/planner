import { useCallback, useState } from 'react';
import { MONTHS } from '../../texts/Date';

import { DayOfYear } from '../../types';
import { ADD_ACTION } from '../../ui/actions';
import { ActionButton, UIAction } from '../ActionButton';

import { YearDaysModal } from './YearDaysModal';

interface YearDaysInputProps extends UIAction {
	value: Array<DayOfYear>;
	onChange: (newValue: Array<DayOfYear>) => void;
}

function formatDayOfYear(day: DayOfYear) {
	const [date, month] = day.split('-');
	return `${date} ${MONTHS[Number(month)]}`
}

function YearDaysInput({
	value,
	label = 'Выбрать дни года',
	action = ADD_ACTION,
	onChange,
}: YearDaysInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	return (
		<div>
			<ActionButton label={label} action={action} onClick={openModal} />

			<div>
				{value.map((day) => (
					<span key={day}>{formatDayOfYear(day)}</span>
				))}
			</div>

			<YearDaysModal
				show={showModal}
				value={value}
				onChange={onChange}
				onClose={closeModal}
			/>
		</div>
	);
}

export type { YearDaysInputProps };
export { YearDaysInput };
