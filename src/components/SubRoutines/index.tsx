import { useCallback } from 'react';
import { SubRoutineModel } from '../../domain/models/SubRoutine';
import { SubRoutine, SubRoutineId, SubRoutinesList, Time } from '../../types';
import { TimeInput } from '../TimeInput';

interface SubRoutinesProps {
	subRoutines: SubRoutinesList;
	onChange: (list: SubRoutinesList) => void;
}

interface SubRoutineItemProps {
	subRoutine: SubRoutine;
	onChange: (id: SubRoutineId, time: Time | null) => void;
	onRemove: (id: SubRoutineId) => void;
}

function SubRoutineItem({
	subRoutine,
	onChange,
	onRemove,
}: SubRoutineItemProps) {
	const onTimeChange = (time: Time | null) => {
		onChange(subRoutine.id, time);
	};

	return (
		<div>
			<TimeInput value={subRoutine.time} onChange={onTimeChange} />
			<button type='button' onClick={() => onRemove(subRoutine.id)}>
				&times;
			</button>
		</div>
	);
}

function SubRoutines({ subRoutines, onChange }: SubRoutinesProps) {
	const onSubRoutineChange = (id: SubRoutineId, time: Time | null) => {
		const newList = subRoutines.map((subRoutine: SubRoutine) => {
			if (subRoutine.id === id) {
				return {
					...subRoutine,
					time,
				};
			}
			return subRoutine;
		});
		onChange(newList);
	};

	const removeSubRoutine = (id: SubRoutineId) => {
		const newList = subRoutines.filter(
			(subRoutine: SubRoutine) => subRoutine.id !== id
		);
		onChange(newList);
	};

	const addSubRoutine = () => {
		const newList = [...subRoutines, SubRoutineModel()];
		onChange(newList);
	};

	return (
		<div>
			{subRoutines.map((subRoutine) => (
				<SubRoutineItem
					key={subRoutine.id}
					subRoutine={subRoutine}
					onChange={onSubRoutineChange}
					onRemove={removeSubRoutine}
				/>
			))}
			<button type='button' onClick={addSubRoutine}>
				Добавить
			</button>
		</div>
	);
}

export type { SubRoutinesProps };
export { SubRoutines };
