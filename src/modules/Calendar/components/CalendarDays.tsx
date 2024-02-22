import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IDateObject, ITask } from '../../../interfaces/calendar.interfaces';
import { StyledCalendarDaysWrapper } from '../StyledComponents';
import CalendarDay from './CalendarDay';

interface ICalendarDaysProps {
  day: Date;
}

const CalendarDays: React.FC<ICalendarDaysProps> = ({ day }) => {
  const [days, setDays] = useState<IDateObject[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [hasCheked, setHasCheked] = useState<boolean>(false);

  useEffect(() => {
    hasCheked && localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [hasCheked, tasks]);

  useEffect(() => {
    const tasksData = localStorage.getItem('tasks');

    setTasks(tasksData ? JSON.parse(tasksData) : []);

    setHasCheked(true);
  }, []);

  useEffect(() => {
    const firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    const daysInWeek = 7;
    const daysToSkip = (weekdayOfFirstDay - 2 + daysInWeek) % daysInWeek;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startDate = new Date((firstDayOfMonth as any) - 1);

    startDate.setDate(startDate.getDate() - daysToSkip);

    const currentDays = [];

    for (let d = 0; d < 42; d++) {
      const calendarDay: IDateObject = {
        id: nanoid(),
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

    setDays(currentDays);
  }, [day, tasks]);

  return (
    <>
      <StyledCalendarDaysWrapper>
        {days.map((day) => (
          <CalendarDay
            key={day.id}
            day={day}
            setTasks={setTasks}
            tasks={tasks}
          />
        ))}
      </StyledCalendarDaysWrapper>
    </>
  );
};

export default CalendarDays;
