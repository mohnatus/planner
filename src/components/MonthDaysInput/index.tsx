import { useCallback, useState } from 'react';

import { WeekDays } from '../../types';
import { ADD_ACTION } from '../../ui/actions';
import { ActionButton, UIAction } from '../ActionButton';

import { MonthDaysModal } from './MonthDaysModal';

interface MonthDaysInputProps extends UIAction {
	value: Array<WeekDays>;
	onChange: (newValue: Array<WeekDays>) => void;
}

function MonthDaysInput({
	value,
	label = 'Выбрать дни месяца',
	action = ADD_ACTION,
	onChange,
}: MonthDaysInputProps) {
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
					<span key={day}>{day}</span>
				))}
			</div>

			<MonthDaysModal
				show={showModal}
				value={value}
				onChange={onChange}
				onClose={closeModal}
			/>
		</div>
	);
}

export type { MonthDaysInputProps };
export { MonthDaysInput };
