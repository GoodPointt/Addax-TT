import { css } from '@emotion/react';
import { StyledCalendarDay, StyledTasksList } from '../StyledComponents';
import { useDrop } from 'react-dnd';

import { IDateObject, ITask } from '../../../interfaces/calendar.interfaces';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import TaskCardItem from './TaskCardItem';

type TSetTasks = React.Dispatch<React.SetStateAction<ITask[]>>;

interface ICalendarDayProps {
  day: IDateObject;
  setTasks: TSetTasks;
  tasks: ITask[];
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

  const today = new Date().getMonth();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: nanoid(), title: taskTitle, priority, date: day.date },
    ]);

    setTaskTitle('');
    setPriority('low');
    setIsAddingTask(false);
    setEditingTask('');
  };

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (editingTask === task.id) {
          return { ...task, title: taskTitle, priority };
        } else return task;
      })
    );

    setTaskTitle('');
    setPriority('low');
    setEditingTask('');
  };

  const onPressEditTask = (taskId: string) => {
    setEditingTask(taskId);
    setTaskTitle(dayTasks.filter((item) => item.id === taskId)[0].title);
    setPriority(dayTasks.filter((item) => item.id === taskId)[0].priority);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => taskId !== task.id));
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
      ref={drop}
      onMouseOver={() => {
        setIsDayHovered(true);
      }}
      onMouseOut={() => {
        setIsDayHovered(false);
      }}
      css={css`
        color: ${day.currentMonth ? '#fff' : 'gray'};
        background-color: ${isOver && 'green'};
      `}
    >
      <span
        css={css`
          font-weight: ${day.selected && day.month === today && 900};
          color: ${day.selected && day.month === today && 'yellow'};
        `}
      >
        {day.number}
      </span>

      {isAddingTask || editingTask ? (
        <form onSubmit={isAddingTask ? handleAddTask : handleEditTask}>
          <div>
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
          <div>
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              css={css`
                width: 100%;
                margin-bottom: 15px;
              `}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              font-size: 12px;
            `}
          >
            <button
              type="button"
              onClick={() => {
                setIsAddingTask(false), setEditingTask('');
              }}
            >
              Cancel
            </button>
            <button>{isAddingTask ? 'Add Task' : 'Edit Task'}</button>
          </div>
        </form>
      ) : (
        dayTasks.length > 0 && (
          <StyledTasksList>
            {dayTasks.map((task) => (
              <TaskCardItem
                key={task.id}
                task={task}
                onPressEditTask={onPressEditTask}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </StyledTasksList>
        )
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
