import React from 'react';
import styled from 'styled-components';

export interface TagProps {
	backgroundColor?: string;
	fontColor?: string;
}

const Tag = styled.div<TagProps>`
	height: 32px;
	padding: 4px 16px;
	border-radius: 4px;
	background-color: ${({ theme, backgroundColor }) =>
		backgroundColor || theme.palette.neutral.second};
	color: ${({ theme, fontColor }) => fontColor || theme.palette.neutral.first};
	display: flex;
	align-items: center;
`;

export default Tag;
