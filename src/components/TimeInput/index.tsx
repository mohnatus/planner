import { useCallback, useState } from "react";
import { Time } from "../../types";
import { formatTime } from "../../utils/date/time";
import { TimeModal } from "./TimeModal";

export interface TimeInputProps {
  values: Array<Time>,
  onChange: (newValue: Array<Time>) => void
}

export function TimeInput({values, onChange}: TimeInputProps) {
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

  const removeTime = useCallback((time: Time) => {
    onChange(values.filter(t => t !== time))
  }, [onChange, values])

	return (
		<div>

      <div>
        {values.map(time => (<div key={`${time}`}>{formatTime(time)}
          <button type="button" onClick={() => removeTime(time)}>remove</button>
        </div>))}
      </div>

      <button type="button" onClick={openModal}>Добавить время</button>

			<TimeModal
				show={showModal}
				onClose={closeModal}
				onChange={addTime}
			></TimeModal>
		</div>
	);
}