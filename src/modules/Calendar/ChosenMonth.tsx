import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import DatePaginator from './components/DatePaginator';
import CalendarDays from './components/CalendarDays';
import { StyledCalendarWrapper } from './StyledComponents';
import PeriodPaginator from './components/PeriodPaginator';
import { css } from '@emotion/react';
import CalendarToolbar from './components/CalendarToolbar';

const ChosenMonth = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const navigate = useNavigate();
  const { currentMonth } = useParams();

  // useEffect(() => {
  //   dispatch(fetchTasks(currentMonth));
  // }, [dispatch, currentDate, currentMonth]);

  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
    navigate(`/${new Date(nextMonthDate).toISOString().slice(0, 7)}`);
  };

  const prevMonth = () => {
    const currentDateCopy = new Date(currentDate);
    currentDateCopy.setMonth(currentDateCopy.getMonth() - 1);
    setCurrentDate(currentDateCopy);
    navigate(`/${new Date(currentDateCopy).toISOString().slice(0, 7)}`);
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
        <CalendarToolbar />
      </div>

      <DatePaginator currentDate={currentDate} />
      <CalendarDays day={currentDate} />
    </StyledCalendarWrapper>
  );
};

export default ChosenMonth;
