import React, { useCallback } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { Spin } from "antd";

import { GET_TASKS, TasksDataType } from "../queries/Task";
import { TaskCard } from ".";
import { STATUS, STATUS_COLUMNS_MAP } from "../constants";
import { ITask } from "../types";
import { Flex, Text, FullContainer } from "./styled";

const CardColumns = styled(Flex)`
  & > div:not(:last-child) {
    margin-right: 32px;
  }
`;

const CardColumn = styled(Flex)`
  min-width: 348px;

  & > p {
    margin-bottom: 16px;
  }

  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Dashboard = () => {
  const { loading, data } = useQuery<TasksDataType>(GET_TASKS, {
    pollInterval: 30000,
  });

  const cardColumns = useCallback(() => {
    const clasifiedTasks = data?.tasks?.reduce(
      (acc: any, task: ITask) => {
        acc[task.status].push(task);
        return acc;
      },
      {
        BACKLOG: [],
        TODO: [],
        IN_PROGRESS: [],
        DONE: [],
        CANCELLED: [],
      }
    );
    return Object.keys(STATUS).map((status) => (
      <CardColumn flexDirection="column" key={status}>
        <Text>
          {STATUS_COLUMNS_MAP[status]} ({clasifiedTasks[status].length})
        </Text>
        {clasifiedTasks[status].map((task: any) => {
          return <TaskCard task={task} key={task.id} />;
        })}
      </CardColumn>
    ));
  }, [data]);

  if (loading) {
    return (
      <FullContainer justifyContent="center" alignItems="center">
        <Spin size="large" />
      </FullContainer>
    );
  }

  return <CardColumns>{cardColumns()}</CardColumns>;
};

export default Dashboard;
