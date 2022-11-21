import { useCallback, useState } from 'react';
import { WEEK_DAYS } from '../../texts/Date';
import { WeekDays } from '../../types';
import { MonthDaysModal } from '../MonthDaysModal';
import { WeekDaysModal } from '../WeekDaysModal';

export interface MonthDaysInputProps {
	value: Array<WeekDays>;
	onChange: (newValue: Array<WeekDays>) => void;
}


export function MonthDaysInput({ value, onChange }: MonthDaysInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	return (
		<div>
			<button type="button" onClick={openModal}>Выбрать дни месяца</button>

      <div>
        {value.map(day => (<span key={day}>{day}</span>))}
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
