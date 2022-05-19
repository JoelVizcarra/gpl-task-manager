export const API_URL = process.env.REACT_APP_API_URL;
export const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export enum TASK_TAGS {
  ANDROID = "ANDROID",
  IOS = "IOS",
  NODE_JS = "NODE_JS",
  RAILS = "RAILS",
  REACT = "REACT",
}

export enum POINT_ESTIMATE {
  EIGHT = "EIGHT",
  FOUR = "FOUR",
  ONE = "ONE",
  TWO = "TWO",
  ZERO = "ZERO",
}

export enum STATUS {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
  CANCELLED = "CANCELLED",
}

export enum USER_TYPE {
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
}

export const POINT_ESTIMATE_MAP: Record<string, string> = {
  EIGHT: "8",
  FOUR: "4",
  ONE: "1",
  TWO: "2",
  ZERO: "0",
};

export const TASK_TAGS_MAP: Record<string, string> = {
  ANDROID: "ANDROID",
  IOS: "IOS APP",
  NODE_JS: "NODEJS",
  RAILS: "RAILS",
  REACT: "REACT",
};

export const STATUS_MAP: Record<string, string> = {
  BACKLOG: "BACKLOG",
  CANCELLED: "CANCELLED",
  DONE: "DONE",
  IN_PROGRESS: "IN PROGRESS",
  TODO: "TODO",
};

export const STATUS_COLUMNS_MAP: Record<string, string> = {
  BACKLOG: "Backlog",
  CANCELLED: "Cancelled",
  DONE: "Completed",
  IN_PROGRESS: "Working",
  TODO: "To Do",
};
