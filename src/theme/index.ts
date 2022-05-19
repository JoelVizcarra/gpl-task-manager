import { createGlobalStyle, DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    typography: {
      headingFontSizes: string[];
      bodyFontSizes: string[];
    };
    palette: Record<string, Record<string, string>>;
  }
}

export const GlobalStyle = createGlobalStyle`
	* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
	html{
		font-size: 16px;
		font-family: 'SF Pro Display' Sans-Serif;
	}
	h1, h2, h3, h4, h5, p, span {
		font-style: normal;
	}
	p, span {
		letter-spacing: .75px
	}
`;

const theme: DefaultTheme = {
  typography: {
    headingFontSizes: ["4", "3.5", "3", "2", "1.5"],
    bodyFontSizes: ["1.25", "1.125", "0.9375", "0.8125"],
  },
  palette: {
    primary: {
      first: "#F4CCC8",
      second: "#EBA59E",
      third: "#E27D73",
      fourth: "#DA584B",
    },
    secondary: {
      first: "#C8E1BC",
      second: "#AAD199",
      third: "#8DC275",
      fourth: "#70B252",
    },
    tertiary: {
      first: "#F9EED7",
      second: "#F2DAAB",
      third: "#EBC77F",
      fourth: "#E5B454",
    },
    neutral: {
      first: "#FFFFFF",
      second: "#94979A",
      third: "#393D41",
      fourth: "#2C2F33",
      fifth: "#222528",
    },
  },
};

export default theme;
