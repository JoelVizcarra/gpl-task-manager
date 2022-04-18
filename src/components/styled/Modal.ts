import styled from 'styled-components';

export const ModalBlock = styled.div`
	align-items: center;
	bottom: 0;
	justify-content: center;
	left: 0;
	overflow: hidden;
	position: fixed;
	right: 0;
	top: 0;
	display: flex;
	opacity: 1;
	z-index: 400;
`;

export const ModalOverlay = styled.a`
	cursor: default;
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
`;

export const ModalContainer = styled.div`
	background-color: ${({ theme }) => theme.palette.neutral.third};
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	min-height: 200px;
	max-width: 750px;
	padding: 16px;
	width: 100%;
	animation: slide-down 0.2s ease 1;
	z-index: 1;
`;

export const ModalBody = styled.div`
	margin-bottom: 20px;
`;

export const ModalHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	color: #303742;
	margin-bottom: 24px;
`;

export const ModalFooter = styled.div`
	padding: 10px 0px;
	text-align: right;
`;
