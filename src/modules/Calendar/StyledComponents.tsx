import styled from '@emotion/styled';

export const StyledCalendarWrapper = styled.div`
  display: block;
  width: 100%;
`;

export const StyledDatePaginator = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding-left: 0;
  text-align: center;

  background-color: #0c0925;
  border: 1px solid rgba(255, 255, 255, 0.15);

  border-radius: 8px;
  padding: 14px 0;

  & li:not(:last-child) {
    border-right: 1px solid gray;
  }
`;

export const StyledCalendarDaysWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  list-style: none;

  border: 1px solid rgba(18, 17, 17, 0.15);
  border-radius: 8px;

  background-color: #151515;
  padding-left: 0;
  overflow-wrap: normal;
`;

export const StyledCalendarDay = styled.li`
  position: relative;
  text-align: right;
  padding: 2px;

  transition: all 300ms ease;

  padding: 10px;
  height: 144px;

  &:hover {
    background-color: #272727;
    box-shadow: 0px 0px 30px -16px rgba(95, 100, 125, 1);
  }

  &:nth-child(7n) {
    border-left: 1px solid rgba(255, 255, 255, 0.15);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
  &:nth-child(7n + 1) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  &:not(:nth-child(7n)):not(:nth-child(7n + 1)) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    border-left: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

export const StyledTasksList = styled.ul`
  overflow-y: scroll;
  max-height: 130px;
  padding: 0;

  &::-webkit-scrollbar {
    margin-left: 10px;
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: darkgray;
  }
`;

export const StyledTaskItem = styled.li`
  position: relative;
  overflow-x: auto;
  max-width: 300px;
  margin-bottom: 5px;
  white-space: pre-wrap;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
  display: block;
  text-align: left;
  text-transform: initial;
  padding: 2px;
  border-radius: 8px;
  border: 1px solid transparent;
  margin-right: 5px;
  border-bottom: 1px solid gray;
  &:hover {
    cursor: grab;
    background-color: #171616;
  }
`;
