import { useEffect, useState } from 'react';
import { StyledDatePaginator } from '../StyledComponents';
import { css } from '@emotion/react';

interface IDatePaginatorProps {
  currentDate: Date;
}

const DatePaginator: React.FC<IDatePaginatorProps> = ({ currentDate }) => {
  const [, setDaysCounter] = useState<Date[]>([]);

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    function generateWeekDates(startDate: Date) {
      const weekDates = [];

      const locale = 'en-US';

      const startDayIndex = weekdays.indexOf(
        startDate.toLocaleString(locale, { weekday: 'short' })
      );

      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);

        date.setDate(startDate.getDate() - (startDayIndex - i));
        weekDates.push(date);
      }

      return weekDates;
    }

    const weekDates = generateWeekDates(currentDate);
    setDaysCounter(weekDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <StyledDatePaginator>
      {weekdays.map((weekday) => {
        return (
          <li
            css={css`
              width: calc(100% / 7);
              text-transform: uppercase;
            `}
            key={weekday}
          >
            <p>{weekday}</p>
          </li>
        );
      })}
    </StyledDatePaginator>
  );
};

export default DatePaginator;
