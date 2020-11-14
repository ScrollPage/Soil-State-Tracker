import styled from 'styled-components';

export const SChat = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  width: 100%;
  height: calc(100vh - 80px);
`;

export const SChatLeft = styled.div`
  display: flex; 
  flex-direction: column;
  width: 200px;
`;
export const SChatRight = styled.div`
  display: flex; 
  flex-direction: column;
  flex: 1;
  border-left: 1px solid #ccc;
`;
