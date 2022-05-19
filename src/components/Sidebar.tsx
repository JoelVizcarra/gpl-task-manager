import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import RavnIcon from "./../assets/icons/ravn.svg";
import { ReactComponent as FunctionLineIcon } from "./../assets/icons/function-line.svg";
import { ReactComponent as MenuLineIcon } from "./../assets/icons/menu-line.svg";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 24px;
  height: calc(100vh - 64px);
  width: 232px;
  background-color: ${({ theme }) => theme.palette.neutral.fourth};
  color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 15px 25px 15px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  width: 100%;

  & a {
    color: ${({ theme }) => theme.palette.neutral.second};
    text-decoration: none;
  }
`;

const SidebarMenuItem = styled.li`
  height: 56px;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;

  & > svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.palette.neutral.second};
  }

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(186, 37, 37, 0) 0%,
      rgba(210, 77, 77, 0.1) 100%
    );

    border-right: solid ${({ theme }) => theme.palette.primary.fourth} 4px;
    cursor: pointer;

    & > p {
      color: ${({ theme }) => theme.palette.primary.fourth};
    }

    & > svg {
      fill: ${({ theme }) => theme.palette.primary.fourth};
    }
  }
`;

const SidebarMenuItemLabel = styled.p`
  padding-left: 20px;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 0;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={RavnIcon} />
      </LogoContainer>
      <SidebarMenu>
        <Link to="/">
          <SidebarMenuItem>
            <FunctionLineIcon />
            <SidebarMenuItemLabel>Dashboard</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </Link>
        <Link to="/my-tasks">
          <SidebarMenuItem>
            <MenuLineIcon />
            <SidebarMenuItemLabel>My Task</SidebarMenuItemLabel>
          </SidebarMenuItem>
        </Link>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
