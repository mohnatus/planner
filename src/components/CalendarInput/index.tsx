import { useCallback, useState } from "react";
import { Moment } from "../../types";
import { CalendarModal } from "../CalendarModal";

export interface CalendarInputProps {
  value: Moment,
  onChange: (newValue: Moment) => void
}

interface CalendarInputViewProps {
  value: Moment,
  onClick: () => void
}

function CalendarInputView({ value, onClick }: CalendarInputViewProps) {
  return <div onClick={onClick}>{ value }</div>
}

export function CalendarInput({ value, onChange }: CalendarInputProps) {
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => {
    setShowModal(true)
  }, [setShowModal])

  const closeModal = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])

  const onDayChange = useCallback((moment: Moment) => {
    onChange(moment);
  }, [onChange])


  return <div>
    <CalendarInputView value={value} onClick={openModal} />
    <CalendarModal show={showModal} onClose={closeModal} value={value} onChange={onDayChange}></CalendarModal>
  </div>
}