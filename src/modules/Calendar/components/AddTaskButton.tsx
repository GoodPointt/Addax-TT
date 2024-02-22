import React from 'react';
import { css } from '@emotion/react';

interface IAddTaskButtonProps {
  setIsAddingTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTaskButton: React.FC<IAddTaskButtonProps> = ({ setIsAddingTask }) => {
  return (
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
  );
};

export default AddTaskButton;
