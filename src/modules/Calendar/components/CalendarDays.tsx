import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import {
  IDateObject,
  IHoliday,
  ITask,
  TSetTasks,
} from '../../../interfaces/calendar.interfaces';
import { StyledCalendarDaysWrapper } from '../StyledComponents';
import CalendarDay from './CalendarDay';
import { useSearchParams } from 'react-router-dom';
import { fetchWorldwideHolidays } from '../../../api/data';

interface ICalendarDaysProps {
  day: Date;
  tasks: ITask[];
  setTasks: TSetTasks;
}

const CalendarDays: React.FC<ICalendarDaysProps> = ({
  day,
  tasks,
  setTasks,
}) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [labelQuery, setLabelQuery] = useState<string>('');
  const [days, setDays] = useState<IDateObject[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [hasCheked, setHasCheked] = useState<boolean>(false);
  const [holidays, setHolidays] = useState<IHoliday[]>();

  useEffect(() => {
    (async () => {
      const holidaysData = await fetchWorldwideHolidays();
      setHolidays(holidaysData);
    })();
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') ?? '');
    setLabelQuery(searchParams.get('label') ?? '');
  }, [searchParams]);

  useEffect(() => {
    if (hasCheked) localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [hasCheked, tasks]);

  useEffect(() => {
    if (!searchQuery || !labelQuery || labelQuery === 'All') {
      const tasksData = localStorage.getItem('tasks');
      setFilteredTasks([]);
      setTasks(tasksData ? JSON.parse(tasksData) : []);

      setHasCheked(true);
    }
  }, [labelQuery, searchQuery, setTasks]);

  useEffect(() => {
    if (!labelQuery) return;

    const filteredTasksByLabel = tasks.filter((task) => {
      return task.labels.some((label) => label.title === labelQuery);
    });

    setFilteredTasks(filteredTasksByLabel);
  }, [labelQuery, tasks]);

  useEffect(() => {
    if (!searchQuery) return;

    const filteredTasksByLabel = tasks.filter((task) =>
      task.title.includes(searchQuery)
    );

    setFilteredTasks(filteredTasksByLabel);
  }, [searchQuery, tasks]);

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
        holidays: [],
      };

      if (holidays && holidays.length > 0)
        holidays.map((holiday) => {
          if (holiday.date === calendarDay.date) {
            calendarDay.holidays.push(holiday);
          }
        });

      if (filteredTasks?.length > 0) {
        filteredTasks.map((task: ITask) => {
          if (task.date === calendarDay.date) {
            calendarDay.tasks.push(task);
          }
        });
      } else if (tasks?.length > 0 && !searchQuery) {
        tasks.map((task: ITask) => {
          if (task.date === calendarDay.date) {
            calendarDay.tasks.push(task);
          }
        });
      }
      currentDays.push(calendarDay);

      startDate.setDate(startDate.getDate() + 1);
    }

    setDays(currentDays);
  }, [day, filteredTasks, holidays, labelQuery, searchQuery, tasks]);

  return (
    <>
      <StyledCalendarDaysWrapper>
        {days.map((day) => (
          <CalendarDay
            key={day.id}
            day={day}
            setTasks={setTasks}
            tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
          />
        ))}
      </StyledCalendarDaysWrapper>
    </>
  );
};

export default CalendarDays;
