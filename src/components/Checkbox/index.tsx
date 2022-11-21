import { FormEvent, RefObject, useCallback, useRef } from 'react';

export interface CheckboxProps {
	ref?: RefObject<HTMLInputElement>;
	label: string;
	checked: boolean;
	onChange: (newChecked: boolean) => void;
}

let unique = 1;

export function Checkbox({ ref, label, checked, onChange }: CheckboxProps) {
	const id = useRef<string>(`checkbox-${unique++}`);
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function')
				onChange(e.currentTarget.checked);
		},
		[onChange]
	);

	return (
		<div>
			<input
				ref={ref}
				id={id.current}
				type='checkbox'
				checked={checked}
				onChange={handleChange}
			/>
			<label htmlFor={id.current}>{label}</label>
		</div>
	);
}
