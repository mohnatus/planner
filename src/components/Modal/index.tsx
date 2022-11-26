import { MouseEvent, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { RADIUS_LG } from '../../ui/decor';
import { SPACING_LG, SPACING_MD, SPACING_XS } from '../../ui/spacing';
import { BASE_TIMING_FUNCTION, TRANSITION_LONG } from '../../ui/transitions';

interface ModalProps {
	width?: number;
	show: boolean;
	onClose: () => void;
	title?: string | ReactNode;
	children: ReactNode;
}

interface ContentViewProps {
	width?: number;
}

const RootView = styled.div`
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

const MaskView = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.8);
	cursor: pointer;
`;

const WrapperView = styled.div`
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

const ContentView = styled.div<ContentViewProps>`
	margin: auto;
	width: 100%;
	max-width: ${(props) => props?.width || 280}px;
	background: white;
	pointer-events: all;
	transform: scale(0);
	transition: transform ${TRANSITION_LONG} ${BASE_TIMING_FUNCTION};
	cursor: default;
	padding: ${SPACING_XS}px ${SPACING_MD}px ${SPACING_LG}px;
	border-radius: ${RADIUS_LG}px;

	.show & {
		transform: scale(1);
	}
`;

const CloseView = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-right: ${(-1 * SPACING_MD) / 2};
	margin-bottom: ${SPACING_XS}px;
`;

function Modal({ width, show, onClose, title, children }: ModalProps) {
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
		const target = e.target as HTMLElement;
		const contentParent = target.closest('[data-content]');
		if (!contentParent) {
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
			<RootView ref={modalRef}>
				<MaskView></MaskView>
				<WrapperView onClick={onWrapperClick}>
					<ContentView data-content width={width}>
						<CloseView>
							<button type='button' onClick={onClose}>
								&times;
							</button>
						</CloseView>
						{title && <div>{title}</div>}
						<div>{children}</div>
					</ContentView>
				</WrapperView>
			</RootView>
		</CSSTransition>,
		document.getElementById('root') as HTMLElement
	);
}

export type { ModalProps };
export { Modal };
