import { FormEvent, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string;
	onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export function Input({ value, onChange, id, type = 'text' }: InputProps) {
	return (
		<div>
			<input type={type} id={id} value={value} onChange={onChange} />
		</div>
	);
}
