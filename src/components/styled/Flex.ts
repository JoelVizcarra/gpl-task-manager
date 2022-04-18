import styled from 'styled-components';

interface FlexProps {
	flexDirection?: 'row' | 'column';
	justifyContent?: string;
	alignItems?: string;
}

const Flex = styled.div<FlexProps>`
	display: flex;
	${({ flexDirection }) => `flex-direction: ${flexDirection || 'row'};`}
	${({ justifyContent }) =>
		`justify-content: ${justifyContent || 'flex-start'};`}
	${({ alignItems }) => `align-items: ${alignItems || 'stretch'};`}
`;

export default Flex;
