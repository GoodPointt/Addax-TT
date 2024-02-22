import { css } from '@emotion/react';
import { StyledCalendarDay, StyledTasksList } from '../StyledComponents';
import { useDrop } from 'react-dnd';

import {
  IDateObject,
  ILabel,
  ITask,
} from '../../../interfaces/calendar.interfaces';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import TaskCardItem from './TaskCardItem';

type TSetTasks = React.Dispatch<React.SetStateAction<ITask[]>>;

interface ICalendarDayProps {
  day: IDateObject;
  tasks: ITask[];
  setTasks: TSetTasks;
}

const CalendarDay: React.FC<ICalendarDayProps> = ({ day, setTasks, tasks }) => {
  const [dayTasks] = useState<ITask[]>(day.tasks);
  const [isDayHovered, setIsDayHovered] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | string>(
    'low'
  );
  const [isAddingNewLabel, setIsAddingNewLabel] = useState<boolean>(false);
  const [labelName, setLabelName] = useState('');
  const [labelColor, setLabelColor] = useState('#1A8E27');
  const [taskLabels, setTaskLabels] = useState<ILabel[]>([]);

  const today = new Date().getMonth();

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

  const onPressEditTask = (taskId: string) => {
    setEditingTask(taskId);
    setTaskTitle(dayTasks.filter((item) => item.id === taskId)[0].title);
    setPriority(dayTasks.filter((item) => item.id === taskId)[0].priority);
    setTaskLabels(dayTasks.filter((item) => item.id === taskId)[0].labels);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => taskId !== task.id));
  };

  const moveTaskOnDay = (dragIndex: number, hoverIndex: number) => {
    const task = dayTasks[dragIndex];
    const newDayTasks = dayTasks.filter((_, idx) => idx !== dragIndex);
    newDayTasks.splice(hoverIndex, 0, task);
    setTasks((prev) => [
      ...newDayTasks,
      ...prev.filter((task) => task.date !== day.date),
    ]);
  };

  const addTaskToDay = (task: ITask) => {
    const newTask = { ...task, date: day.date };

    const newTasks = tasks.map((t) => {
      if (t.id !== task.id) return t;
      return newTask;
    });
    setTasks(newTasks);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: ({ task }: { task: ITask }) => addTaskToDay(task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <StyledCalendarDay
      key={tasks.length}
      ref={drop}
      onMouseOver={() => {
        setIsDayHovered(true);
      }}
      onMouseOut={() => {
        setIsDayHovered(false);
      }}
      css={css`
        color: ${day.currentMonth ? '#fff' : 'gray'};
        background-color: ${isOver && '#4a4949'};
      `}
    >
      {isAddingTask || editingTask ? (
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
      ) : (
        <>
          <span
            css={css`
              font-weight: ${day.selected && day.month === today && 900};
              color: ${day.selected && day.month === today && 'yellow'};
            `}
          >
            {day.number}
          </span>
          {dayTasks.length > 0 && (
            <StyledTasksList>
              {dayTasks.map((task, index) => (
                <TaskCardItem
                  key={task.id}
                  index={index}
                  task={task}
                  moveTaskOnDay={moveTaskOnDay}
                  onPressEditTask={onPressEditTask}
                  handleDeleteTask={handleDeleteTask}
                />
              ))}
            </StyledTasksList>
          )}
        </>
      )}
      {isDayHovered && !isAddingTask && !editingTask && (
        <button
          onClick={() => setIsAddingTask(true)}
          css={css`
            position: absolute;
            left: 11px;
            top: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            border-radius: 10px;
            border: 1px solid #382667;
            width: 20px;
            height: 20px;
            &:hover {
              cursor: pointer;
              background-color: #000004;
            }
          `}
        >
          <span>➕</span>
        </button>
      )}
    </StyledCalendarDay>
  );
};

export default CalendarDay;
