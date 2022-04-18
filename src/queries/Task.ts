import { gql } from '@apollo/client';
import { ITask } from '../types';

export type TasksDataType = {
	tasks: ITask[];
};

export const CORE_TASK_FIELDS = gql`
	fragment CoreTaskFields on Task {
		assignee {
			id
			avatar
			fullName
		}
		dueDate
		id
		name
		pointEstimate
		status
		tags
	}
`;

export const GET_TASKS = gql`
	${CORE_TASK_FIELDS}
	query GetTasks {
		tasks(input: {}) {
			...CoreTaskFields
		}
	}
`;

export const CREATE_TASK = gql`
	${CORE_TASK_FIELDS}
	mutation CreateTask($input: CreateTaskInput!) {
		createTask(input: $input) {
			...CoreTaskFields
		}
	}
`;

export const UPDATE_TASK = gql`
	${CORE_TASK_FIELDS}
	mutation UpdateTask($input: UpdateTaskInput!) {
		updateTask(input: $input) {
			...CoreTaskFields
		}
	}
`;

export const DELETE_TASK = gql`
	mutation DeleteTask($input: DeleteTaskInput!) {
		deleteTask(input: $input) {
			id
		}
	}
`;
