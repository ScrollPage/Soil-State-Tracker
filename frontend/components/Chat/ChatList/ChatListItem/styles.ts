import styled, { css } from 'styled-components';

export const SChatListItem = styled.div<{ isNotify: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  ${({ isNotify }) => isNotify && css`
    background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);  
    justify-content: space-between !important;
  `}
`;
