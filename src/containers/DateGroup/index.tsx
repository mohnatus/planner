import { useState } from 'react';
import styled from 'styled-components';
import { DateInput, DateInputProps } from '../../components/DateInput';
import { COLORS } from '../../style/colors';
import { RADIUS_SM } from '../../style/decor';
import { CONTROL_HEIGHT } from '../../style/sizes';
import { SPACING_XS } from '../../style/spacing';

export interface DateGroupProps extends DateInputProps {
	label: string;
}

const Wrapper = styled.div`
	display: flex;
  align-items: center;
`;

const Label = styled.label`
	flex-grow: 1;
  color: ${COLORS.serviceText};
`;



export function DateGroup({ label, ...props }: DateGroupProps) {
	return (
		<Wrapper>
			<Label>{label}</Label>

			<DateInput {...props} />
		</Wrapper>
	);
}
