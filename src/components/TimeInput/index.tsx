import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Time } from '../../types';
import { formatTime } from '../../utils/date/time';
import { SPACING_SM, SPACING_XS, SPACING_XXS } from '../../ui/spacing';
import { COLORS } from '../../ui/colors';

import { ActionButton } from '../ActionButton';
import { TimeModal } from './TimeModal';
import { CONTROL_HEIGHT } from '../../ui/sizes';
import { RADIUS_SM } from '../../ui/decor';

interface TimeItemProps {
	time: Time;
	onRemove: (time: Time) => void;
}

interface TimeInputProps {
	values: Array<Time>;
	onChange: (newValue: Array<Time>) => void;
}

const TimeView = styled.div`
	display: flex;
	align-items: center;
	margin: 0 ${SPACING_XXS}px ${SPACING_XS}px;
	background-color: ${COLORS.controls.color};
	color: ${COLORS.controls.contrast};
	height: ${CONTROL_HEIGHT}px;
	padding: ${SPACING_XXS}px ${SPACING_SM}px;
	border-radius: ${RADIUS_SM}px;
	border: 1px solid ${COLORS.border};
`;

const RemoveButtonView = styled.button`
	margin-left: ${SPACING_XS}px;
	margin-right: ${-1 * SPACING_XXS}px;
`;

const TimeListView = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: ${SPACING_SM}px;
	margin-left: ${-1 * SPACING_XXS}px;
	margin-right: ${-1 * SPACING_XXS}px;
`;

function TimeItem({ time, onRemove }: TimeItemProps) {
	return (
		<TimeView>
			{formatTime(time)}
			<RemoveButtonView type='button' onClick={() => onRemove(time)}>
				&times;
			</RemoveButtonView>
		</TimeView>
	);
}

function TimeInput({ values, onChange }: TimeInputProps) {
	const [showModal, setShowModal] = useState(false);

	const openModal = useCallback(() => {
		setShowModal(true);
	}, [setShowModal]);

	const closeModal = useCallback(() => {
		setShowModal(false);
	}, [setShowModal]);

	const addTime = useCallback(
		(time: Time) => {
			if (values.includes(time)) return;
			onChange([...values, time]);
		},
		[onChange, values]
	);

	const removeTime = useCallback(
		(time: Time) => {
			onChange(values.filter((t) => t !== time));
		},
		[onChange, values]
	);

	return (
		<div>
			{values.length > 0 && (
				<TimeListView>
					{values.map((time) => (
						<TimeItem
							key={`${time}`}
							time={time}
							onRemove={removeTime}
						/>
					))}
				</TimeListView>
			)}

			<ActionButton
				action='add'
				label='Добавить время'
				onClick={openModal}
			></ActionButton>

			<TimeModal
				show={showModal}
				onClose={closeModal}
				onChange={addTime}
			></TimeModal>
		</div>
	);
}

export type { TimeInputProps };
export { TimeInput };
