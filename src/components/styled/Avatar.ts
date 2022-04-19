import styled from 'styled-components';

interface AvatarProps {
	size?: number;
}

const Avatar = styled.img<AvatarProps>`
	height: ${({ size }) => size || 40}px;
	width: ${({ size }) => size || 40}px;
	border-radius: 20px;
`;

export default Avatar;
