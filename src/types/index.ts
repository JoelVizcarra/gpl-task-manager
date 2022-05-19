import { POINT_ESTIMATE, STATUS, TASK_TAGS, USER_TYPE } from "../constants";

export interface IUser {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  type: USER_TYPE;
  updatedAt: string;
}

export interface ITask {
  assignee: IUser;
  createdAt: string;
  creator: IUser;
  dueDate: string;
  id: string;
  name: string;
  pointEstimate: POINT_ESTIMATE;
  position: number;
  status: STATUS;
  tags: TASK_TAGS[];
}

export interface ITaskForm {
  assigneeId: string;
  dueDate: string;
  name: string;
  pointEstimate: string | null;
  status: string | null;
  tags: string[];
}
