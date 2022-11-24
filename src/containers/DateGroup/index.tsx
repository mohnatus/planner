import { useState } from 'react';
import styled from 'styled-components'
import { DateInput, DateInputProps } from '../../components/DateInput';

export interface DateGroupProps extends DateInputProps {
	label: string;
}

const Wrapper = styled.div`
display: flex;`

const Label = styled.label``

const DateGroupInput = styled(DateInput)`

`

export function DateGroup({ label, ...props }: DateGroupProps) {
	return (
		<Wrapper>
			<Label>{label}</Label>

			<DateGroupInput {...props} />
		</Wrapper>
	);
}
