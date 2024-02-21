import { css } from '@emotion/react';
import {
  StyledCalendarDay,
  StyledTaskItem,
  StyledTasksList,
} from '../StyledComponents';
import { IDateObject, ITask } from '../../../interfaces/calendar.interfaces';
import { useState } from 'react';
import { nanoid } from 'nanoid';

const CalendarDay = ({ day }: { day: IDateObject }) => {
  const [dayTasks, setDayTasks] = useState<ITask[]>(day.tasks);
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

    console.log('Task Title:', taskTitle);
    console.log('Priority:', priority);

    setDayTasks((prev) => [
      { id: nanoid(), title: taskTitle, priority, date: day.date },
      ...prev,
    ]);

    setTaskTitle('');
    setPriority('low');
    setIsAddingTask(false);
    setEditingTask('');
  };

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDayTasks((prev) =>
      prev.map((task) => {
        if (editingTask === task.id) {
          return { ...task, title: taskTitle, priority };
        } else return task;
      })
    );

    setTaskTitle('');
    setPriority('low');
    setEditingTask('');
  };

  const handleDeleteTask = (taskId: string) => {
    setDayTasks((prev) => prev.filter((task) => taskId !== task.id));
  };

  console.log(taskTitle);

  return (
    <StyledCalendarDay
      onMouseOver={() => {
        setIsDayHovered(true);
      }}
      onMouseOut={() => {
        setIsDayHovered(false);
      }}
      css={css`
        color: ${day.currentMonth ? '#fff' : 'gray'};
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
              <StyledTaskItem
                key={task.id}
                css={css`
                  border-left: 5px solid
                    ${(task.priority === 'high' && 'crimson') ||
                    (task.priority === 'medium' && 'orange') ||
                    (task.priority === 'low' && 'green')};
                `}
              >
                <p>{task.title}</p>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    right: 0;
                    top: 0;
                  `}
                >
                  <button
                    aria-label="edit task"
                    onClick={() => {
                      setEditingTask(task.id);
                      console.log('1111', dayTasks);
                      console.log('1111', dayTasks);
                      setTaskTitle(
                        dayTasks.filter((a) => a.id === task.id)[0].title
                      );
                    }}
                  >
                    📃
                  </button>
                  <button
                    aria-label="delete task"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    ❌
                  </button>
                </div>
              </StyledTaskItem>
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
