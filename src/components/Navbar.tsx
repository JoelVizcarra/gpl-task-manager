import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import ReactAvatar from "react-avatar";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";

import { GET_PROFILE, ProfileDataType } from "../queries/User";
import { ReactComponent as NotificationLineIcon } from "./../assets/icons/notification-line.svg";
import { ReactComponent as UserFillIcon } from "./../assets/icons/user-fill.svg";
import SearchLineIcon from "./../assets/icons/search-line.svg";
import {
  Flex,
  Text,
  Avatar,
  Input,
  DropDownContainer,
  DropDownListContainer,
  DropDownList,
  ListItem,
} from "./styled";

const NavbarContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.neutral.fourth};
  border-radius: 16px;
  height: 64px;
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled(Input)`
  width: calc(100% - 120px);
  height: 64px;
  background: transparent url(${SearchLineIcon}) no-repeat 10px center;
  padding: 10px 10px 10px 55px;
`;

const StyledNotificationLineIcon = styled(NotificationLineIcon)`
  fill: ${({ theme }) => theme.palette.neutral.second};
`;

const StyledListItem = styled(ListItem)`
  & > svg {
    fill: ${({ theme }) => theme.palette.neutral.first};
  }
`;

const StyledUserFillIcon = styled(UserFillIcon)`
  fill: ${({ theme }) => theme.palette.neutral.first};
`;

const options = [{ option: "My Profile", icon: <StyledUserFillIcon /> }];

const Navbar = () => {
  const { loading, data } = useQuery<ProfileDataType>(GET_PROFILE);
  const [openCardMenu, setOpenCardMenu] = useState(false);
  const navigate = useNavigate();
  const toggleCardMenu = () => setOpenCardMenu(!openCardMenu);

  const handleProfileClick = useCallback(() => {
    setOpenCardMenu(false);
    navigate("/my-profile");
  }, [setOpenCardMenu, navigate]);

  return (
    <NavbarContainer>
      <SearchInput placeholder="Search" />
      <StyledNotificationLineIcon />
      <DropDownContainer>
        <Flex onClick={toggleCardMenu}>
          {loading ? (
            <Skeleton.Avatar size={32} />
          ) : data?.profile.avatar ? (
            <Avatar src={data?.profile.avatar} size={32} />
          ) : (
            <ReactAvatar size="32" name={data?.profile.fullName} round />
          )}
        </Flex>
        {openCardMenu && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(({ option, icon }) => (
                <StyledListItem onClick={handleProfileClick} key={option}>
                  {icon}
                  <Text fontWeight={400}>{option}</Text>
                </StyledListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </NavbarContainer>
  );
};

export default Navbar;
