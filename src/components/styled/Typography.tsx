import React from "react";
import styled from "styled-components";

type FontWeightType = 100 | 200 | 300 | 400 | 500 | 600 | 800 | 900;

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5;
  fontWeight?: FontWeightType;
  as?: string;
}

const StyledTitle = styled.div<TitleProps>`
  ${({ theme, level }) => {
    return theme.typography.headingFontSizes[level || 5];
  }}
  font-size: ${({ theme, level }) =>
    theme.typography.headingFontSizes[(level && level - 1) || 4]}em;
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  margin: 0;
`;

export const Title: React.FC<TitleProps> = ({
  level,
  fontWeight,
  as,
  children,
}) => (
  // @ts-ignore
  <StyledTitle
    // @ts-ignore
    as={as || (level && `h${level}`) || "p"}
    level={level}
    fontWeight={fontWeight}
  >
    {children}
  </StyledTitle>
);

interface BodyProps {
  level?: 1 | 2 | 3 | 4;
  fontWeight?: FontWeightType;
}

export const Text = styled.p<BodyProps>`
  font-size: ${({ level, theme }) =>
    theme.typography.bodyFontSizes[(level && level - 1) || 2]}em;
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  margin: 0;
  vertical-align: middle;
`;
