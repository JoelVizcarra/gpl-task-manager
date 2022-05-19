import { Tag, Text } from "./styled";
import { TASK_TAGS } from "../constants";

interface TaskTagProps {
  variant: TASK_TAGS;
}

const taskTagStyles = {
  [TASK_TAGS.ANDROID]: {
    backgroundColor: "rgba(229, 180, 84, 0.1)",
    fontColor: "#E5B454",
  },
  [TASK_TAGS.IOS]: {
    backgroundColor: "rgba(112, 178, 82, 0.1)",
    fontColor: "#70B252",
  },
  [TASK_TAGS.NODE_JS]: {
    backgroundColor: "rgba(229, 180, 84, 0.1)",
    fontColor: "#E5B454",
  },
  [TASK_TAGS.RAILS]: {
    backgroundColor: "rgba(229, 180, 84, 0.1)",
    fontColor: "#E5B454",
  },
  [TASK_TAGS.REACT]: {
    backgroundColor: "rgba(229, 180, 84, 0.1)",
    fontColor: "#E5B454",
  },
};

const TaskTag = ({ variant }: TaskTagProps) => {
  return (
    <Tag {...taskTagStyles[variant]}>
      <Text level={3}>{variant}</Text>
    </Tag>
  );
};

export default TaskTag;
