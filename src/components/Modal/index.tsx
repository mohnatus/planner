import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { SPACING_MD } from '../../style/spacing';
import { BASE_TIMING_FUNCTION, TRANSITION_LONG } from '../../style/transitions';

export interface ModalProps {
	show: boolean;
	onClose: () => void;
	title?: string | ReactNode;
	children: ReactNode;
}

const ModalRoot = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	transition: opacity ${TRANSITION_LONG} ${BASE_TIMING_FUNCTION},
		visibility ${TRANSITION_LONG} ${BASE_TIMING_FUNCTION};
	opacity: 0;
	visibility: hidden;

	&.show {
		opacity: 1;
		visibility: visible;
	}
`;

const ModalMask = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	cursor: pointer;
`;

const ModalWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	padding: ${SPACING_MD}px;
	overflow: auto;
	cursor: pointer;
`;

const ModalContent = styled.div`
	margin: auto;
	width: 100%;
	max-width: 500px;
	background: white;
	pointer-events: all;
	transform: scale(0);
	transition: transform ${TRANSITION_LONG} ${BASE_TIMING_FUNCTION};
	cursor: default;

	.show & {
		transform: scale(1);
	}
`;

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

	const onWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
		if (!e.currentTarget || !e.currentTarget.closest(`[data-content]`)) {
			onClose();
		}
	};

	return createPortal(
		<CSSTransition
			nodeRef={modalRef}
			in={show}
			unmountOnExit
			classNames={{
				enterDone: 'show',
			}}
			timeout={{ enter: 0, exit: 400 }}
		>
			<ModalRoot ref={modalRef}>
				<ModalMask></ModalMask>
				<ModalWrapper onClick={onWrapperClick}>
					<ModalContent>
						<div>
							<button onClick={onClose}>&times;</button>
						</div>
						{title && <div>{title}</div>}
						<div>{children}</div>
						<div></div>
					</ModalContent>
				</ModalWrapper>
			</ModalRoot>
		</CSSTransition>,
		document.getElementById('root') as HTMLElement
	);
}
