import { FormEvent, RefObject, useCallback } from 'react';
import styled from 'styled-components'
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_SM, SPACING_XS, SPACING_XXS } from '../../style/spacing';

export interface TextareaProps {
	ref?: RefObject<HTMLTextAreaElement>;
	id?: string;
	value: string;
	onChange?: (newValue: string) => void;
}

const TextareaWrapper = styled.div`

`

const TextareaControl = styled.textarea`
	display: block;
	width: 100%;
	min-height: 80px;
	background-color: ${COLORS.controlsBackground};
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
`

export function Textarea({ ref, value, onChange, id }: TextareaProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLTextAreaElement>) => {
			if (typeof onChange === 'function') onChange(e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<TextareaWrapper>
			<TextareaControl ref={ref} id={id} value={value} onChange={handleChange} />
		</TextareaWrapper>
	);
}
