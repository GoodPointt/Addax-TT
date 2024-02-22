import { ITask } from '../../interfaces/calendar.interfaces';

export const getLabelTitles = (tasks: ITask[]): string[] => {
  const uniqueTitles: Set<string> = new Set();

  tasks.forEach((task) => {
    task.labels.forEach((label) => {
      uniqueTitles.add(label.title);
    });
  });

  return Array.from(uniqueTitles);
};
