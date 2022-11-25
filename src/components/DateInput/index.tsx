import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Moment } from '../../types';
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_XS } from '../../style/spacing';
import { formatDate } from '../../utils/date/format';

import { DateModal } from './DateModal';

interface DateInputProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

interface DateInputViewProps {
	value: Moment;
	onClick: () => void;
}

const DateInputControl = styled.div`
	width: 186px;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${CONTROL_HEIGHT}px;
	padding-left: ${SPACING_XS}px;
	padding-right: ${SPACING_XS}px;
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	cursor: pointer;
`;

function DateInputView({ value, onClick }: DateInputViewProps) {
	return (
		<DateInputControl onClick={onClick}>
			{formatDate(value)}
		</DateInputControl>
	);
}

function DateInput({ value, onChange }: DateInputProps) {
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

export type { DateInputProps };
export { DateInput };
