import { useCallback } from 'react';
import styles from './Toggler.module.css';

export type TogglerOption = {
	id: string;
	name: string;
};
interface TogglerOptionProps {
	option: TogglerOption;
	active: boolean;
	onClick: (id: string) => void;
}

export interface TogglerProps {
	options: Array<TogglerOption>;
	value: string;
	onChange: (newValue: string) => void;
}

function TogglerItem({ option, active, onClick }: TogglerOptionProps) {
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

export function Toggler({ options, value, onChange }: TogglerProps) {
	const onOptionClick = (id: string) => {
		onChange(id);
	};

	return (
		<div className={styles.Toggler}>
			<div className={styles.Wrapper}>
				{options.map((option: TogglerOption) => (
					<TogglerItem
						key={option.id}
						option={option}
						active={option.id === value}
						onClick={onOptionClick}
					/>
				))}
			</div>
		</div>
	);
}
