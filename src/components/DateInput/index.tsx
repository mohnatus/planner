import { useCallback, useState } from 'react';
import { Moment } from '../../types';
import { formatDate } from '../../utils/date/format';
import { DateModal } from './DateModal';

export interface DateInputProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

interface DateInputViewProps {
	value: Moment;
	onClick: () => void;
}

function DateInputView({ value, onClick }: DateInputViewProps) {
	return <div onClick={onClick}>{formatDate(value)}</div>;
}

export function DateInput({ value, onChange }: DateInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	const onDayChange = useCallback(
		(moment: Moment) => {
			onChange(moment);
		},
		[onChange]
	);

	return (
		<div>
			<DateInputView value={value} onClick={openModal} />

			<DateModal
				show={showModal}
				onClose={closeModal}
				value={value}
				onChange={onDayChange}
			></DateModal>
		</div>
	);
}
