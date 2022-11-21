import { useCallback } from 'react';
import styles from './Toggler.module.css';

export type TogglerOption<T> = {
	id: T;
	name: string;
};
interface TogglerOptionProps<T> {
	option: TogglerOption<T>;
	active: boolean;
	onClick: (id: T) => void;
}

export interface TogglerProps<T> {
	options: Array<TogglerOption<T>>;
	value: T;
	onChange: (newValue: T) => void;
}

function TogglerItem<T>({ option, active, onClick }: TogglerOptionProps<T>) {
	const classes = [styles.TogglerItem, active && styles.Active].filter(Boolean);
	const handleClick = useCallback(() => {
		onClick(option.id);
	}, [option, onClick]);
	return (
		<div className={classes.join(' ')} onClick={handleClick}>
			{option.name}
		</div>
	);
}

export function Toggler<T>({ options, value, onChange }: TogglerProps<T>) {
	console.log('toggler', options, onChange)
	const onOptionClick = (id: T) => {
		onChange(id);
	};

	return (
		<div className={styles.Toggler}>
			<div className={styles.Wrapper}>
				{options.map((option: TogglerOption<T>) => (
					<TogglerItem
						key={`${option.id}`}
						option={option}
						active={option.id === value}
						onClick={onOptionClick}
					/>
				))}
			</div>
		</div>
	);
}
