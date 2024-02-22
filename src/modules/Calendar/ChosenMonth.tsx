import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import DatePaginator from './components/DatePaginator';
import CalendarDays from './components/CalendarDays';
import { StyledCalendarWrapper } from './StyledComponents';
import PeriodPaginator from './components/PeriodPaginator';
import { css } from '@emotion/react';
import CalendarToolbar from './components/CalendarToolbar';
import { ITask } from '../../interfaces/calendar.interfaces';

const ChosenMonth = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<ITask[]>([]);

  const navigate = useNavigate();
  const { currentMonth } = useParams();

  const updateURL = (date: Date) => {
    const searchParams = new URLSearchParams(window.location.search);
    navigate(`/${date.toISOString().slice(0, 7)}?${searchParams.toString()}`);
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
    updateURL(nextMonthDate);
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setCurrentDate(prevMonthDate);
    updateURL(prevMonthDate);
  };

  return (
    <StyledCalendarWrapper>
      {currentMonth}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <PeriodPaginator
          nextDate={nextMonth}
          prevDate={prevMonth}
          currentDate={currentDate}
        />
        <CalendarToolbar tasks={tasks} setTasks={setTasks} />
      </div>

      <DatePaginator currentDate={currentDate} />
      <CalendarDays day={currentDate} tasks={tasks} setTasks={setTasks} />
    </StyledCalendarWrapper>
  );
};

export default ChosenMonth;
