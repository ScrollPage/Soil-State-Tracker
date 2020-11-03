import { SButton } from '@/components/UI/Button';
import styled from "styled-components";

export const SCompanyItem = styled.div`
  p {
    margin-bottom: 10px !important;
    span {
      font-weight: 500;
    }
  }
  .ant-card-body {
    display: flex;
    flex-direction: column;
    height: 270px;
  }
`;

export const SCompanyItemMain = styled.div`
  flex: 1;
`;
export const SCompanyItemBtns = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
  ${SButton} {
    &:first-of-type {
      margin-right: 10px;
    }
  }
`;