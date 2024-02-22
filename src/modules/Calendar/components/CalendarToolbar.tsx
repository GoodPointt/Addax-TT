import { useSearchParams } from 'react-router-dom';

const CalendarToolbar = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <label>
      🔎
      <input
        placeholder="Search tasks by name"
        type="search"
        onChange={(e) => {
          setSearchParams({ search: e.target.value });
        }}
      />
    </label>
  );
};

export default CalendarToolbar;
