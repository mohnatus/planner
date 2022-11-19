import {
	KeyboardEvent,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';

export interface ModalProps {
	show: boolean;
	onClose: () => void;
	title?: string | ReactNode;
	children: ReactNode;
}

export function Modal({ show, onClose, title, children }: ModalProps) {
	const modalRef = useRef<null | HTMLDivElement>(null);


	const closeOnEscapeKeydown = useCallback(
		(e: { key: string }) => {
			if (e.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener('keydown', closeOnEscapeKeydown);
		return () =>
			document.removeEventListener('keydown', closeOnEscapeKeydown);
	}, [closeOnEscapeKeydown]);




	return createPortal(
		<CSSTransition
			nodeRef={modalRef}
			in={show}
			unmountOnExit
			classNames={{
				enterDone: styles.Show,
			}}
			timeout={{ enter: 0, exit: 400 }}
		>
			<div className={styles.Root} ref={modalRef}>
				<div className={styles.Mask} onClick={onClose}></div>
				<div className={styles.Wrapper}>
					<div className={styles.Content}>
						<div className={styles.Close}>
							<button onClick={onClose}>&times;</button>
						</div>
						{title && <div className={styles.Header}>{title}</div>}
						<div className={styles.Body}>{children}</div>
						<div className={styles.Footer}></div>
					</div>
				</div>
			</div>
		</CSSTransition>,
		document.getElementById('root') as HTMLElement
	);
}
