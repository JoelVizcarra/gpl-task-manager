import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";

import {
  Dashboard,
  MyTask,
  Navbar,
  Profile,
  Sidebar,
  Topbar,
} from "./components";
import theme, { GlobalStyle } from "./theme";
import { TaskModalProvider } from "./context/TaskModalContext";
import "./App.less";

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.neutral.fifth};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 32px;
  display: grid;

  grid-template-columns: 232px 1fr;
  grid-template-rows: 72px 48px 1fr;
  grid-gap: 32px;

  grid-template-areas:
    "sidebar navbar navbar navbar"
    "sidebar topbar topbar topbar"
    "sidebar main main main"
    "sidebar main main main"
    "sidebar main main main";
`;

const GridSidebar = styled.div`
  grid-area: sidebar;
`;

const GridNavbar = styled.div`
  grid-area: navbar;
`;

const GridTopbar = styled.div`
  grid-area: topbar;
  margin-bottom: -12px;
`;

const GridMain = styled.div`
  grid-area: main;
  overflow: auto;

  ::-webkit-scrollbar {
    position: absolute;
    left: -100px;
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.neutral.fifth};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.neutral.second};
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <TaskModalProvider>
          <AppContainer>
            <GridSidebar>
              <Sidebar />
            </GridSidebar>
            <GridNavbar>
              <Navbar />
            </GridNavbar>
            <GridTopbar>
              <Topbar />
            </GridTopbar>
            <GridMain>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/my-tasks" element={<MyTask />} />
                <Route path="/my-profile" element={<Profile />} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
              </Routes>
            </GridMain>
          </AppContainer>
        </TaskModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
