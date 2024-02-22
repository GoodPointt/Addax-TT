import React, { useRef } from 'react';
import { StyledTaskItem } from '../StyledComponents';
import { css } from '@emotion/react';
import { useDrag, useDrop } from 'react-dnd';
import { ITask } from '../../../interfaces/calendar.interfaces';

interface ITaskCardItemProps {
  task: ITask;
  index: number;
  onPressEditTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  moveTaskOnDay: (dragIndex: number, hoverIndex: number) => void;
}

const TaskCardItem: React.FC<ITaskCardItemProps> = ({
  task,
  onPressEditTask,
  handleDeleteTask,
  moveTaskOnDay,
  index,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    hover(item: { task: ITask; index: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIdx = item.index;
      const hoverIdx = index;

      if (dragIdx === hoverIdx) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 1.1;
      const mousePosition = monitor.getClientOffset();

      if (mousePosition !== null) {
        const hoverClientY = mousePosition.y - hoveredRect.top;

        if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      moveTaskOnDay(dragIdx, hoverIdx);
      item.index = hoverIdx;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [, drag] = useDrag(() => ({
    type: 'task',
    item: {
      task,
      index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(drop(ref));

  return (
    <StyledTaskItem
      ref={ref}
      css={css`
        background-color: ${isOver && '#4e4e4e49'};
        padding: 11px 0;
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
          css={css`
            padding: 0;
          `}
          onClick={() => {
            onPressEditTask(task.id);
          }}
        >
          📃
        </button>
        <button
          css={css`
            padding: 0;
          `}
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
