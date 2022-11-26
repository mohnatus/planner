import { FormEvent, RefObject, useCallback } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { RADIUS_SM } from '../../ui/decor';
import { SPACING_SM } from '../../ui/spacing';

interface TextareaProps {
	ref?: RefObject<HTMLTextAreaElement>;
	id?: string;
	value: string;
	onChange?: (newValue: string) => void;
}

const WrapperView = styled.div``;

const ControlView = styled.textarea`
	display: block;
	width: 100%;
	min-height: 80px;
	background-color: ${COLORS.controls.color};
	text: ${COLORS.controls.contrast};
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	padding: 17px ${SPACING_SM}px;
	resize: vertical;

	&::placeholder {
		color: ${COLORS.placeholder};
	}

	&:focus {
		outline: none;
		border-color: ${COLORS.focus};
	}
`;

function Textarea({ ref, value, onChange, id }: TextareaProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLTextAreaElement>) => {
			if (typeof onChange === 'function') onChange(e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<WrapperView>
			<ControlView
				ref={ref}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</WrapperView>
	);
}

export type { TextareaProps };
export { Textarea };
