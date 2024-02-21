export interface ITask {
  id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low' | string;
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
