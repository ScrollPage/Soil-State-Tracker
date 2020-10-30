import { UserSelectNone } from './../UI/UserSelectNone/index';
import styled from 'styled-components';
import Link from 'next/link';

export const SInner = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SItemBtn = styled.div`
  a {
    color: #000 !important;
  }
`;

export const SItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${SItemBtn} {
    &:first-of-type {
      margin-right: 20px;
    }
  }
`;

export const SHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
  ${UserSelectNone};
  ${SItem} {
      &:last-child {
        display: none;
      }
    }
  @media (max-width: 767.98px) {
    ${SItem} {
      &:nth-child(2) {
        display: none;
      }
      &:nth-child(3) {
        display: none;
      }
      &:last-child {
        display: block;
      }
    }
  }
`;

export const SLogo = styled.div`
  text-transform: uppercase;
  .logo {
    display: block;
    font-weight: 800;
    &-sm {
      display: none;
    }
  }
`;

export const SItemLink = styled(Link)`
  margin: 0;
  font-size: 16px;
  font-weight: 400;  
`;
