export interface ILabel {
  title: string;
  color: string;
}

export interface ITask {
  id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low' | string;
  labels: ILabel[];
}

export interface IDateObject {
  id: string;
  currentMonth: boolean;
  date: string;
  month: number;
  number: number;
  selected: boolean;
  year: number;
  tasks: ITask[];
  holidays: IHoliday[];
}

export interface IHoliday {
  counties: null | string[];
  countryCode: string;
  date: string;
  fixed: boolean;
  global: boolean;
  launchYear: null | number;
  localName: string;
  name: string;
  types: string[];
}

export type TSetTasks = React.Dispatch<React.SetStateAction<ITask[]>>;
