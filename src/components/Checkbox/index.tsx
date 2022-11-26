import { FormEvent, RefObject, useCallback } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../ui/colors';
import { RADIUS_SM } from '../../ui/decor';
import { SPACING_SM } from '../../ui/spacing';

interface CheckboxProps {
	ref?: RefObject<HTMLInputElement>;
	label: string;
	checked: boolean;
	onChange: (newChecked: boolean) => void;
}

const WrapperView = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const ControlView = styled.input`
	visibility: hidden;
	position: absolute;
	width: 1px;
	height: 1px;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
	clip-path: inset(100%);
	clip: rect(0 0 0 0);
	overflow: hidden;
`;

const BoxView = styled.div`
	width: 25px;
	height: 25px;
	border: 1px solid ${COLORS.border};
	border-radius: ${RADIUS_SM}px;
	background: ${COLORS.controls.color};
	margin-right: ${SPACING_SM}px;

	input:checked ~ & {
		border-color: ${COLORS.accent.color};
	}
`;

const LabelView = styled.span`
	color: ${COLORS.serviceText};

	input:checked ~ & {
		color: ${COLORS.text};
	}
`;

function Checkbox({ ref, label, checked, onChange }: CheckboxProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function')
				onChange(e.currentTarget.checked);
		},
		[onChange]
	);

	return (
		<WrapperView>
			<ControlView
				ref={ref}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			<BoxView />
			<LabelView>{label}</LabelView>
		</WrapperView>
	);
}

export type { CheckboxProps };
export { Checkbox };
