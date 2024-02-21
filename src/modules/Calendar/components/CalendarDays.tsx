import { nanoid } from 'nanoid';
import { IDateObject, ITask } from '../../../interfaces/calendar.interfaces';
import { StyledCalendarDaysWrapper } from '../StyledComponents';
import CalendarDay from './CalendarDay';

interface ICalendarDaysProps {
  day: Date;
}

const tasks: ITask[] = [
  {
    id: nanoid(),
    title: 'tes',
    date: new Date().toISOString().slice(0, 10),
    priority: 'high',
  },
  {
    id: nanoid(),
    title: 'test2',
    date: new Date().toISOString().slice(0, 10),
    priority: 'medium',
  },
];

const CalendarDays: React.FC<ICalendarDaysProps> = ({ day }) => {
  // const { tasks } = useTasks();

  const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);

  const weekdayOfFirstDay = firstDayOfMonth.getDay();

  const daysInWeek = 7;

  const daysToSkip = (weekdayOfFirstDay - 2 + daysInWeek) % daysInWeek;

  const currentDays = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startDate = new Date((firstDayOfMonth as any) - 1);

  startDate.setDate(startDate.getDate() - daysToSkip);

  for (let d = 0; d < 42; d++) {
    const calendarDay: IDateObject = {
      currentMonth: startDate.getMonth() === day.getMonth(),
      date: new Date(startDate).toISOString().slice(0, 10),
      month: startDate.getMonth(),
      number: startDate.getDate(),
      selected: startDate.toDateString() === day.toDateString(),
      year: startDate.getFullYear(),
      tasks: [],
    };

    if (tasks?.length > 0)
      tasks.map((task: ITask) => {
        if (task.date === calendarDay.date) {
          calendarDay.tasks.push(task);
        }
      });

    currentDays.push(calendarDay);

    startDate.setDate(startDate.getDate() + 1);
  }

  return (
    <StyledCalendarDaysWrapper>
      {currentDays.map((day) => {
        return <CalendarDay key={nanoid()} day={day} />;
      })}
    </StyledCalendarDaysWrapper>
  );
};

export default CalendarDays;
