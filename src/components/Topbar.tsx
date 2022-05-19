import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { Flex, Button } from "./styled";
import { ReactComponent as AddLineIcon } from "./../assets/icons/add-line.svg";
import { ReactComponent as FunctionLineIcon } from "./../assets/icons/function-line.svg";
import { ReactComponent as MenuLineIcon } from "./../assets/icons/menu-line.svg";
import { TaskModalContext } from "../context/TaskModalContext";

const Topbar = () => {
  const { setIsVisible, setSelectedTask } = useContext(TaskModalContext);

  const AddButton = styled(Button)`
    line-height: 0;
    fill: ${({ theme }) => theme.palette.neutral.first};
  `;

  const FunctionLineIconContainer = styled(Flex)<{ active?: boolean }>`
    padding: 10px;
    border-radius: 8px;
    ${({ active, theme }) =>
      active
        ? css`
            fill: ${theme.palette.primary.fourth};
            border: 1px solid ${theme.palette.primary.fourth};
          `
        : css`
            fill: ${theme.palette.neutral.first};
            border: none;
          `}
  `;

  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center">
        <FunctionLineIconContainer>
          <MenuLineIcon />
        </FunctionLineIconContainer>
        <FunctionLineIconContainer active>
          <FunctionLineIcon />
        </FunctionLineIconContainer>
      </Flex>
      <AddButton
        variant="primary"
        onClick={() => {
          setIsVisible(true);
          setSelectedTask(null);
        }}
      >
        <AddLineIcon />
      </AddButton>
    </Flex>
  );
};

export default Topbar;
