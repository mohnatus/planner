import { PeriodUnits, RepeatTypes } from "../../domain/types";
import { Moment, MonthDay, WeekDays } from "../../types";

export interface RepeatTypeTogglerProps {
  repeatType: RepeatTypes,
  weekDays: Array<WeekDays>,
  monthDays: Array<MonthDay>,
  startMoment: Moment,
  periodValue: number,
  periodUnit: PeriodUnits
}

export function RepeatTypeToggler({ repeatType, weekDays, monthDays, startMoment, periodValue, periodUnit } : RepeatTypeTogglerProps) {

}