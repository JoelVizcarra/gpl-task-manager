import { useState, useContext, useMemo } from 'react';
import styled, { css } from 'styled-components';
import ReactAvatar from 'react-avatar';
import { useMutation } from '@apollo/client';
import moment from 'moment';
import { message } from 'antd';

import { TaskTag } from '.';
import {
	Avatar,
	Flex,
	Text,
	Tag,
	CardWrapper,
	CardHeader,
	CardBody,
	CardFooter,
	DropDownContainer,
	DropDownListContainer,
	DropDownList,
	ListItem,
} from './styled';
import { ReactComponent as AttachmentIcon } from './../assets/icons/attachment.svg';
import { ReactComponent as NodeTreeIcon } from './../assets/icons/node-tree.svg';
import { ReactComponent as ChatLineIcon } from './../assets/icons/chat-line.svg';
import { ReactComponent as MoreFillIcon } from './../assets/icons/more-fill.svg';
import { ReactComponent as AlarmLineIcon } from './../assets/icons/alarm-line.svg';
import { ReactComponent as PencilLineIcon } from './../assets/icons/pencil-line.svg';
import { ReactComponent as DeleteBinLineIcon } from './../assets/icons/delete-bin-line.svg';
import { TaskModalContext } from '../context/TaskModalContext';
import { DELETE_TASK, GET_TASKS } from '../queries/Task';
import { ITask } from '../types';
import { POINT_ESTIMATE_MAP } from '../constants';

interface TaskCardProps {
	task: ITask;
}

const CardTitle = styled(Text)`
	color: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledMoreFillIcon = styled(MoreFillIcon)`
	fill: ${({ theme }) => theme.palette.neutral.second};
	cursor: pointer;
`;

const CardPointStimate = styled.p`
	color: ${({ theme }) => theme.palette.neutral.first};
	font-weight: 600;
	font-size: 15px;
	line-height: 24px;
	letter-spacing: 0.75px;
`;

const TimeTag = styled(Tag)<{ due?: boolean }>`
	margin-bottom: 16px;
	& > svg {
		margin-right: 10px;
	}

	${({ due, theme }) =>
		due
			? css`
					color: ${theme.palette.primary.fourth};
					background-color: ${theme.palette.primary.fourth}10;

					& > svg {
						fill: ${theme.palette.primary.fourth};
					}
			  `
			: css`
					color: ${theme.palette.neutral.first};
					background-color: ${theme.palette.neutral.second}10;

					& > svg {
						fill: ${theme.palette.neutral.first};
					}
			  `}
`;

const TaskTagContainer = styled(Flex)`
	& > div:not(:last-child) {
		margin-right: 8px;
	}
`;

const IconsContainer = styled(Flex)`
	& > div:not(:last-child) {
		margin-right: 18px;
	}
`;

const IconItem = styled(Flex)`
	& > p {
		margin-right: 5px;
	}
	& > svg {
		fill: ${({ theme }) => theme.palette.neutral.first};
	}
`;

const StyledListItem = styled(ListItem)`
	& > svg {
		fill: ${({ theme }) => theme.palette.neutral.first};
	}
`;

const options = [
	{ option: 'Edit', icon: <PencilLineIcon /> },
	{ option: 'Delete', icon: <DeleteBinLineIcon /> },
];

const TaskCard = ({ task }: TaskCardProps) => {
	const [openCardMenu, setOpenCardMenu] = useState(false);
	const { setIsVisible, setSelectedTask } = useContext(TaskModalContext);
	const [deleteTask, { error: deleteError }] = useMutation<
		{ deleteTask: { id: string } },
		{ input: { id: string } }
	>(DELETE_TASK, {
		update(cache, { data }) {
			const existingTasks: any = cache.readQuery({ query: GET_TASKS });
			const newTasks = existingTasks!.tasks.filter(
				(t: any) => t.id !== data?.deleteTask?.id
			);
			cache.writeQuery({
				query: GET_TASKS,
				data: { tasks: newTasks },
			});
		},
	});

	const dateText = useMemo(() => {
		const mommentObj = moment(task.dueDate);
		let text = mommentObj.format('MMM. DD YYYY');
		const isDue = mommentObj.isBefore(new Date(), 'day');

		if (mommentObj.isSame(new Date(), 'day')) text = 'TODAY';
		if (mommentObj.diff(new Date(), 'day') === -1) text = 'YESTERDAY';

		return {
			isDue,
			text,
		};
	}, [task.dueDate]);

	const toggleCardMenu = () => setOpenCardMenu(!openCardMenu);

	const handleMenuOptionClicked = (value: string) => () => {
		if (value === 'Edit') {
			setSelectedTask(task);
			setIsVisible(true);
		} else {
			deleteTask({ variables: { input: { id: task.id } } });
			if (deleteError) {
				message.success({
					content: 'Task deleted...',
					key: task.id,
					duration: 2,
				});
			} else {
				message.error({
					content: 'There was an error deleting the task...',
					key: task.id,
					duration: 2,
				});
			}
		}
		setOpenCardMenu(false);
	};

	return (
		<CardWrapper>
			<CardHeader justifyContent="space-between">
				<CardTitle level={2}>{task.name}</CardTitle>
				<DropDownContainer>
					<StyledMoreFillIcon onClick={toggleCardMenu} />
					{openCardMenu && (
						<DropDownListContainer>
							<DropDownList>
								{options.map(({ option, icon }) => (
									<StyledListItem
										onClick={handleMenuOptionClicked(option)}
										key={option}
									>
										{icon}
										<Text fontWeight={400}>{option}</Text>
									</StyledListItem>
								))}
							</DropDownList>
						</DropDownListContainer>
					)}
				</DropDownContainer>
			</CardHeader>
			<CardBody flexDirection="column">
				<Flex justifyContent="space-between">
					<CardPointStimate>
						{POINT_ESTIMATE_MAP[task.pointEstimate]} Points
					</CardPointStimate>
					<TimeTag due={dateText ? dateText?.isDue : undefined}>
						<AlarmLineIcon />
						<Text>{dateText?.text}</Text>
					</TimeTag>
				</Flex>
				<TaskTagContainer>
					{task.tags.map((tag) => (
						<TaskTag variant={tag} key={tag} />
					))}
				</TaskTagContainer>
			</CardBody>
			<CardFooter justifyContent="space-between">
				{task.assignee.avatar ? (
					<Avatar src={task.assignee.avatar} size={32} />
				) : (
					<ReactAvatar size="32" name={task.assignee.fullName} round />
				)}
				<IconsContainer>
					<IconItem>
						<AttachmentIcon />
					</IconItem>
					<IconItem>
						<Text fontWeight={400}>5</Text>
						<NodeTreeIcon />
					</IconItem>
					<IconItem>
						<Text fontWeight={400}>3</Text>
						<ChatLineIcon />
					</IconItem>
				</IconsContainer>
			</CardFooter>
		</CardWrapper>
	);
};

export default TaskCard;
