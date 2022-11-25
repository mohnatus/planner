import { useCallback, useState } from 'react';

import { WeekDays } from '../../types';
import { WEEK_DAYS } from '../../texts/Date';

import { WeekDaysModal } from './WeekDaysModal';

interface WeekDaysInputProps {
	value: Array<WeekDays>;
	onChange: (newValue: Array<WeekDays>) => void;
}

function WeekDaysInput({ value, onChange }: WeekDaysInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	return (
		<div>
			<button type='button' onClick={openModal}>
				Выбрать дни недели
			</button>

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
