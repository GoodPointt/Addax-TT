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
}
