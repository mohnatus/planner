import { FormEvent, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	value: string;
	onChange: (e: FormEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({ value, onChange, id }: TextareaProps) {
	return (
		<div>
			<textarea  id={id} value={value} onChange={onChange} />
		</div>
	);
}
