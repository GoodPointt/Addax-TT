import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLabelTitles } from '../../../utils/helpers/getLabelTitles';
import { css } from '@emotion/react';
import { ITask } from '../../../interfaces/calendar.interfaces';

const CalendarToolbar = ({ tasks }: { tasks: ITask[] }) => {
  const [, setSearchParams] = useSearchParams();
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const labelTitles = getLabelTitles(tasks);
    setLabels(labelTitles);
  }, [tasks]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <label htmlFor="search">
        🔎
        <input
          placeholder="Search by task name"
          type="search"
          onChange={(e) => {
            setSearchParams({ search: e.target.value });
          }}
        />
      </label>

      {labels.length > 0 && (
        <label htmlFor="label">
          Filter by label
          <select
            id="label"
            onChange={(e) => {
              setSearchParams({ label: e.target.value });
            }}
          >
            <option value="All">All</option>
            {labels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default CalendarToolbar;
