import { FormEvent, RefObject, useCallback } from 'react';

interface NumberInputProps {
	ref?: RefObject<HTMLInputElement>;
	id?: string;
	value: number;
	onChange: (newValue: number) => void;
}

function NumberInput({ ref, value, onChange, id }: NumberInputProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			if (typeof onChange === 'function')
				onChange(+e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<div>
			<input
				ref={ref}
				type='number'
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export type { NumberInputProps };
export { NumberInput };
