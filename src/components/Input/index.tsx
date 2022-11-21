import {
	FormEvent,
	RefObject,
	useCallback,
} from 'react';

export interface InputProps {
	ref?: RefObject<HTMLInputElement>;
	id?: string;
	type?: string;
	value: string;
	onChange: (newValue: string) => void;
}

export function Input({ ref, value, onChange, id, type = 'text' }: InputProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function') onChange(e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<div>
			<input
				ref={ref}
				type={type}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}
