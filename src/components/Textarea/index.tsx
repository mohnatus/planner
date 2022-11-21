import { FormEvent, RefObject, useCallback } from 'react';

export interface TextareaProps {
	ref?: RefObject<HTMLTextAreaElement>;
	id?: string;
	value: string;
	onChange?: (newValue: string) => void;
}

export function Textarea({ ref, value, onChange, id }: TextareaProps) {
	const handleChange = useCallback(
		(e: FormEvent<HTMLTextAreaElement>) => {
			if (typeof onChange === 'function') onChange(e.currentTarget.value);
		},
		[onChange]
	);

	return (
		<div>
			<textarea ref={ref} id={id} value={value} onChange={handleChange} />
		</div>
	);
}
