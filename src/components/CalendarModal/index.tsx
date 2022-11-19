import { Modal } from '../Modal';

export interface CalendarModalProps {
  show: boolean;
  onClose: () => void;
}

export function CalendarModal({ show, onClose }: CalendarModalProps) {
	return (
		<Modal show={show} onClose={onClose}>
			Календарь
		</Modal>
	);
}
