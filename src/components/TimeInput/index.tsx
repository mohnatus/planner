import { useCallback, useState } from 'react';
import { Time } from '../../types';
import { formatTime } from '../../utils/date/time';
import { ActionButton } from '../ActionButton';
import { TimeModal } from './TimeModal';
import styled from 'styled-components';
import { SPACING_SM, SPACING_XS, SPACING_XXS } from '../../style/spacing';

const TimeView = styled.div`
	display: flex;
	align-items: center;
  margin: 0 ${SPACING_XXS}px ${SPACING_XS}px;
`;

const RemoveButton = styled.button`

`

interface TimeItemProps {
	time: Time;
	onRemove: (time: Time) => void;
}

function TimeItem({ time, onRemove }: TimeItemProps) {
	return (
		<TimeView>
			{formatTime(time)}
			<RemoveButton type='button' onClick={() => onRemove(time)}>
				&times;
			</RemoveButton>
		</TimeView>
	);
}

const TimeList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: ${SPACING_SM}px;
  margin-left: ${-1 * SPACING_XXS}px;
  margin-right: ${-1 * SPACING_XXS}px;
`;

export interface TimeInputProps {
	values: Array<Time>;
	onChange: (newValue: Array<Time>) => void;
}

export function TimeInput({ values, onChange }: TimeInputProps) {
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
			{values.length && (
				<TimeList>
					{values.map((time) => (
						<TimeItem
							key={`${time}`}
							time={time}
							onRemove={removeTime}
						/>
					))}
				</TimeList>
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
