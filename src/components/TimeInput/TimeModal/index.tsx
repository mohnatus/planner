import { useCallback, useEffect, useState } from "react";
import { Time } from "../../../types";
import { MS_IN_HOUR, MS_IN_MIN } from "../../../utils/date/constants";
import { getCurrentTime, getTimeComponents } from "../../../utils/date/time";
import { Modal } from "../../Modal";

export interface TimeModalProps {
  show: boolean,
  value?: Time,
  onChange: (newValue: Time) => void,
  onClose: () => void
}

export function TimeModal({ value, onChange, show, onClose }: TimeModalProps) {

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const {_hours, _minutes} = getTimeComponents(value || getCurrentTime());
    setHours(_hours);
    setMinutes(_minutes)
  }, [setHours, setMinutes, value, show])

  const onSubmit = useCallback(() => {
    const time = hours * MS_IN_HOUR + minutes * MS_IN_MIN;
    onChange(time);
    onClose();
  }, [onChange, hours, minutes, onClose])

  return (
    <Modal show={show} onClose={onClose}>
      <div>
        <div>
          <button onClick={() => setHours(prev => prev - 1)}>-</button>
          <span>{hours}</span>
          <button onClick={() => setHours(prev => prev + 1)}>+</button>
        </div>

         <div>
          <button onClick={() => setMinutes(prev => prev - 1)}>-</button>
          <span>{minutes}</span>
          <button onClick={() => setMinutes(prev => prev + 1)}>+</button>
        </div>
      </div>
      <button onClick={onSubmit}>Сохранить</button>
    </Modal>
  )
}