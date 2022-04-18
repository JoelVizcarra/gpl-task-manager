import styled, { css } from 'styled-components';

interface ButtonProps {
	variant: 'primary' | 'secondary';
}

const Button = styled.button<ButtonProps>`
	font-family: 'SF Pro Display';
	font-style: normal;
	font-weight: 400;
	font-size: 15px;
	letter-spacing: 0.75px;
	padding: 8px;
	border-radius: 8px;
	cursor: pointer;
	color: ${({ theme }) => theme.palette.neutral.first};
	border: none;

	${({ variant }) =>
		variant === 'primary' &&
		css`
			background-color: ${({ theme }) => theme.palette.primary.fourth};
		`}
	${({ variant }) =>
		variant === 'secondary' &&
		css`
			background-color: transparent;
		`};
`;

export default Button;
