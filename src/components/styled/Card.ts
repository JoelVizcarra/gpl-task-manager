import styled from 'styled-components';

import { Flex } from '.';

export const CardWrapper = styled.div`
	background-color: ${({ theme }) => theme.palette.neutral.fourth};
	border-radius: 8px;
	width: 348px;
	height: 208px;
	color: ${({ theme }) => theme.palette.neutral.first};
	padding: 16px;
	display: flex;
	flex-direction: column;
`;

export const CardHeader = styled(Flex)`
	margin-bottom: 20px;
`;

export const CardBody = styled(Flex)`
	margin-bottom: 16px;
`;

export const CardFooter = styled(Flex)``;
