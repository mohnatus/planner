import styled from 'styled-components';

import { Moment } from '../../types';
import { MS_IN_HOUR } from '../../utils/date/constants';
import { formatDate } from '../../utils/date/format';
import { getTodayMoment } from '../../utils/date/today';

interface DateBlockProps {
	moment: Moment;
}

const LabelView = styled.small`
  font-weight: 400;
`;

function DateBlock({ moment }: DateBlockProps) {
	const dateString = formatDate(moment);

	const today = getTodayMoment();
	const yesterday = today - 24 * MS_IN_HOUR;
	const tomorrow = today + 24 * MS_IN_HOUR;

	let label = null;
	if (today === moment) label = 'Сегодня';
	else if (yesterday === moment) label = 'Вчера';
	else if (tomorrow === moment) label = 'Завтра';

	return (
		<div>
			{label && <LabelView>{label}</LabelView>}
			<div>{dateString}</div>
		</div>
	);
}

export type { DateBlockProps };
export { DateBlock };
