import { css } from '@emotion/react';
import { StyledCalendarDay, StyledTasksList } from '../StyledComponents';
import { useDrop } from 'react-dnd';

import {
  IDateObject,
  ILabel,
  ITask,
  TSetTasks,
} from '../../../interfaces/calendar.interfaces';
import { useState } from 'react';
import TaskCardItem from './TaskCardItem';
import TaskForm from './TaskForm';
import AddTaskButton from './AddTaskButton';

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
  const [taskLabels, setTaskLabels] = useState<ILabel[]>([]);

  const today = new Date().getMonth();

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
        <TaskForm
          day={day}
          setTasks={setTasks}
          taskTitle={taskTitle}
          priority={priority}
          taskLabels={taskLabels}
          setTaskLabels={setTaskLabels}
          editingTask={editingTask}
          isAddingTask={isAddingTask}
          setTaskTitle={setTaskTitle}
          setPriority={setPriority}
          setIsAddingTask={setIsAddingTask}
          setEditingTask={setEditingTask}
        />
      ) : (
        <>
          <span
            css={css`
              font-size: 20px;
              font-weight: ${day.selected && day.month === today && 900};
              color: ${day.selected && day.month === today && 'yellow'};
            `}
          >
            {day.number}
          </span>
          {day.holidays.length > 0 && (
            <p
              css={css`
                position: absolute;
                top: 1px;
                left: 1px;
                font-style: italic;
                color: #dc7b7bb6;
              `}
            >
              🎉{day.holidays[0].name}
            </p>
          )}
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
        <AddTaskButton setIsAddingTask={setIsAddingTask} />
      )}
    </StyledCalendarDay>
  );
};

export default CalendarDay;
