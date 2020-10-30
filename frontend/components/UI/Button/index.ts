import styled from 'styled-components';
import { Button } from 'antd';

export const SButton = styled(Button) <{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  background-color: #000;
  color: #fff;
  transition: all 0.3s ease -in -out;
    &:hover, :focus {
    background-color: #fff;
    color: #000;
    border: 1px solid #d9d9d9;
  }
`;



