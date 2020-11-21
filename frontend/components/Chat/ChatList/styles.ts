import styled from 'styled-components';

export const SChatList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SChatListInner = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #000;
    }
`;

export const SChatSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ccc;
`;