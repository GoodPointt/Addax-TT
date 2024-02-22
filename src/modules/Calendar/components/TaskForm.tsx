import { css } from '@emotion/react';
import { nanoid } from 'nanoid';
import {
  IDateObject,
  ILabel,
  TSetTasks,
} from '../../../interfaces/calendar.interfaces';
import { useState } from 'react';

interface ITaskFormProps {
  day: IDateObject;
  setTasks: TSetTasks;
  taskTitle: string;
  priority: 'low' | 'medium' | 'high' | string;
  taskLabels: ILabel[];
  setTaskLabels: React.Dispatch<React.SetStateAction<ILabel[]>>;
  editingTask: string;
  isAddingTask: boolean;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setPriority: React.Dispatch<
    React.SetStateAction<'low' | 'medium' | 'high' | string>
  >;
  setIsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingTask: React.Dispatch<React.SetStateAction<string>>;
}

const TaskForm: React.FC<ITaskFormProps> = ({
  day,
  setTasks,
  taskTitle,
  priority,
  taskLabels,
  setTaskLabels,
  editingTask,
  isAddingTask,
  setTaskTitle,
  setPriority,
  setIsAddingTask,
  setEditingTask,
}) => {
  const [isAddingNewLabel, setIsAddingNewLabel] = useState<boolean>(false);
  const [labelName, setLabelName] = useState('');
  const [labelColor, setLabelColor] = useState('#1A8E27');

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: nanoid(),
        title: taskTitle,
        priority,
        date: day.date,
        labels: taskLabels,
      },
    ]);

    setTaskTitle('');
    setPriority('low');
    setIsAddingTask(false);
    setEditingTask('');
  };

  const handleAddNewLable = () => {
    setTaskLabels((prev) => [...prev, { title: labelName, color: labelColor }]);

    setIsAddingNewLabel(false);
  };

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (editingTask === task.id) {
          return { ...task, title: taskTitle, priority, labels: taskLabels };
        } else return task;
      })
    );

    setTaskTitle('');
    setPriority('low');
    setEditingTask('');
    setTaskLabels([]);
  };
  return (
    <form onSubmit={isAddingTask ? handleAddTask : handleEditTask}>
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-bottom: 2px;
        `}
      >
        <label
          htmlFor="taskTitle"
          css={css`
            font-size: 10px;
          `}
        >
          Task:
        </label>
        <input
          css={css`
            width: 100%;
          `}
          type="text"
          id="taskTitle"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
          placeholder={'Add new task...'}
        />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-bottom: 2px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <label
              htmlFor="priority"
              css={css`
                font-size: 10px;
              `}
            >
              Priority:
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div
          css={css`
            display: flex;
            gap: 5px;
            align-items: center;
          `}
        >
          <p
            css={css`
              font-size: 10px;
              text-align: left;
            `}
          >
            Labels:
          </p>
          <button
            type="button"
            css={css`
              font-size: 10px;
            `}
            onClick={() => setIsAddingNewLabel((prev) => !prev)}
          >
            ➕
          </button>
        </div>

        {taskLabels.length > 0 && (
          <ul
            css={css`
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 10px;
            `}
          >
            {taskLabels.map((label, idx) => (
              <li
                key={idx}
                css={css`
                  background-color: ${label.color};
                  display: flex;
                  font-size: 8px;
                  border-radius: 7px;
                  margin-bottom: 1px;
                  padding-left: 4px;
                  width: fit-content;
                  align-items: center;
                `}
              >
                <p>{label.title}</p>
                <button
                  type="button"
                  onClick={() => {
                    setTaskLabels((prev) =>
                      prev.filter((l) => l.title !== label.title)
                    );
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isAddingNewLabel && (
        <div
          css={css`
            display: flex;
            gap: 1px;
            margin-bottom: 10px;
          `}
        >
          <input
            type="text"
            placeholder="Label"
            value={labelName}
            required
            onChange={(e) => setLabelName(e.target.value)}
            css={css`
              width: 100%;
            `}
          />
          <input
            type="color"
            value={labelColor}
            onChange={(e) => setLabelColor(e.target.value)}
            css={css`
              padding: 0;
              font-size: 10px;
            `}
          />
          <button
            type="button"
            css={css`
              background-color: green;
            `}
            onClick={() => handleAddNewLable()}
          >
            add
          </button>
        </div>
      )}
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          align-items: center;
          margin-bottom: 2px;
        `}
      >
        <button
          css={css`
            background-color: #c2454583;
          `}
          type="button"
          onClick={() => {
            setIsAddingTask(false);
            setEditingTask('');
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          css={css`
            background-color: #45c27d83;
          `}
        >
          {isAddingTask ? 'Add Task' : 'Edit Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
