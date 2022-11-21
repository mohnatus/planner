import { Time } from "../../../types";
import { Modal } from "../../Modal";

export interface TimeModalProps {
  show: boolean,
  value: Time,
  onChange: (newValue: Time) => void,
  onClose: () => void
}

export function TimeModal({ value, onChange, show, onClose }: TimeModalProps) {

  

  return (
    <Modal show={show} onClose={onClose}>
      <div>

      </div>
      <button>Сохранить</button>
    </Modal>
  )
}