import { useCallback, useState } from 'react';

import { WeekDays } from '../../types';
import { WEEK_DAYS } from '../../texts/Date';

import { WeekDaysModal } from './WeekDaysModal';
import { ActionButton, UIAction } from '../ActionButton';
import { ADD_ACTION } from '../../ui/actions';

interface WeekDaysInputProps extends UIAction {
	value: Array<WeekDays>;
	onChange: (newValue: Array<WeekDays>) => void;
}

function WeekDaysInput({
	value,
	onChange,
	label = 'Выбрать дни недели',
	action = ADD_ACTION,
}: WeekDaysInputProps) {
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
					<span key={day}>{WEEK_DAYS[day]}</span>
				))}
			</div>

			<WeekDaysModal
				show={showModal}
				value={value}
				onChange={onChange}
				onClose={closeModal}
			/>
		</div>
	);
}

export type { WeekDaysInputProps };
export { WeekDaysInput };
