import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLabelTitles } from '../../../utils/helpers/getLabelTitles';
import { css } from '@emotion/react';
import { ITask, TSetTasks } from '../../../interfaces/calendar.interfaces';
import ExportJsonButton from './ExportJsonButton';
import ExportAsImage from './ExportAsImage';

const CalendarToolbar = ({
  tasks,
  setTasks,
}: {
  tasks: ITask[];
  setTasks: TSetTasks;
}) => {
  const [, setSearchParams] = useSearchParams();
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const labelTitles = getLabelTitles(tasks);
    setLabels(labelTitles);
  }, [tasks]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const jsonData = await readFile(file);
      setTasks(jsonData);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const readFile = (file: File) => {
    return new Promise<ITask[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div
      css={css`
        display: flex;
        gap: 5px;
        flex-direction: column;
      `}
    >
      <input
        type="file"
        accept=".json"
        placeholder="JSON"
        onChange={handleFileUpload}
      />
      <ExportJsonButton dataObject={tasks} />
      <ExportAsImage />
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
