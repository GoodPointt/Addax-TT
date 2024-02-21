import { css } from '@emotion/react';

interface IPeriodPaginator {
  prevDate: () => void;
  nextDate: () => void;
  currentDate: Date;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const PeriodPaginator: React.FC<IPeriodPaginator> = ({
  prevDate,
  nextDate,
  currentDate,
}) => {
  const nameOfDate = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;

  return (
    <div
      css={css`
        width: fit-content;
        display: flex;
        flex-direction: column;
      `}
    >
      <h4>{nameOfDate}</h4>
      <div
        css={css`
          display: flex;
          gap: 10px;
          font-size: 24px;
          border-radius: 4px;
        `}
      >
        <button onClick={prevDate}>{'<'}</button>
        <button onClick={nextDate}>{'>'}</button>
      </div>
    </div>
  );
};

export default PeriodPaginator;
