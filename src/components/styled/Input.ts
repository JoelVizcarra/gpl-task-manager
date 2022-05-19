import styled from "styled-components";

const Input = styled.input`
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.neutral.second};
  background-color: ${({ theme }) => theme.palette.neutral.third};
  outline: none !important;
  border: none;
`;

export default Input;
