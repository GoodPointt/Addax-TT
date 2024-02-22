import { useSearchParams } from 'react-router-dom';

const CalendarToolbar = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div>
      <label htmlFor="search">
        🔎
        <input
          placeholder="Search tasks by name"
          type="search"
          onChange={(e) => {
            setSearchParams({ search: e.target.value });
          }}
        />
      </label>
    </div>
  );
};

export default CalendarToolbar;
