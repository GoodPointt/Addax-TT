import React from 'react';
import { StyledTaskItem } from '../StyledComponents';
import { css } from '@emotion/react';
import { useDrag } from 'react-dnd';
import { ITask } from '../../../interfaces/calendar.interfaces';

interface ITaskCardItemProps {
  task: ITask;
  onPressEditTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
}

const TaskCardItem: React.FC<ITaskCardItemProps> = ({
  task,
  onPressEditTask,
  handleDeleteTask,
}) => {
  const [, drag] = useDrag(() => ({
    type: 'task',
    item: {
      task,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <StyledTaskItem
      ref={drag}
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
            onPressEditTask(task.id);
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
  );
};

export default TaskCardItem;
