import React, { useContext, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactAvatar from 'react-avatar';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { message } from 'antd';

import { TaskModalContext } from '../context/TaskModalContext';
import { ReactComponent as IncreaseDeacreaseFillIcon } from './../assets/icons/increase-decrease-fill.svg';
import { ReactComponent as UserFillIcon } from './../assets/icons/user-fill.svg';
import { ReactComponent as PriceTagFillIcon } from './../assets/icons/price-tag-fill.svg';
import { ReactComponent as ListCheckIcon } from './../assets/icons/list-check.svg';
import {
	Flex,
	Text,
	Button,
	Input,
	Select,
	ModalBlock,
	ModalBody,
	ModalContainer,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Avatar,
	CustomDatePicker,
} from './styled';
import {
	POINT_ESTIMATE,
	POINT_ESTIMATE_MAP,
	TASK_TAGS,
	TASK_TAGS_MAP,
	STATUS,
	STATUS_MAP,
} from '../constants';
import { GET_USERS, UsersDataType } from '../queries/User';
import { CREATE_TASK, GET_TASKS, UPDATE_TASK } from '../queries/Task';
import { ITask, ITaskForm } from '../types';

const StyledModalContainer = styled(ModalContainer)`
	color: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledModalFooter = styled(ModalFooter)`
	& > button:not(:last-child) {
		margin-right: 24px;
	}
`;

const StyledInput = styled(Input)`
	font-weight: 600;
	font-size: 20px;
	width: 100%;
`;

const StyledIncreaseDeacreaseFillIcon = styled(IncreaseDeacreaseFillIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledUserFillIcon = styled(UserFillIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledPriceTagFillIcon = styled(PriceTagFillIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledListCheckIcon = styled(ListCheckIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const Option = styled(Text)`
	white-space: nowrap;
	font-weight: 400;
`;

const SelectsContainer = styled(Flex)`
	min-width: 123px;

	& > div:not(:last-child) {
		margin-right: 15px;
	}
`;

const taskFormInitialState: ITaskForm = {
	assigneeId: '',
	dueDate: '',
	name: '',
	pointEstimate: null,
	status: null,
	tags: [],
};

const estimateOptions = Object.keys(POINT_ESTIMATE).map((value: string) => ({
	value,
	display: (
		<>
			<StyledIncreaseDeacreaseFillIcon />
			<Option>{POINT_ESTIMATE_MAP[value]} Points</Option>
		</>
	),
}));

const tagOptions = Object.keys(TASK_TAGS).map((value: string) => ({
	value,
	display: <Option>{TASK_TAGS_MAP[value]}</Option>,
}));

const statusOptions = Object.keys(STATUS).map((value: string) => ({
	value,
	display: <Option>{STATUS_MAP[value]}</Option>,
}));

const TaskModal = () => {
	const { isVisible, setIsVisible, selectedTask, setSelectedTask } =
		useContext(TaskModalContext);
	const { register, handleSubmit, formState, setValue, reset } =
		useForm<ITaskForm>({
			defaultValues: taskFormInitialState,
		});
	const { loading, data: usersData } = useQuery<UsersDataType>(GET_USERS);
	const [createTask, { error: createError, data: createData }] = useMutation<
		{ createTask: ITask },
		{ input: ITaskForm }
	>(CREATE_TASK);
	const [updateTask, { error: updateError, data: updateData }] = useMutation<
		{ updateTask: ITask },
		{ input: ITaskForm & { id: string } }
	>(UPDATE_TASK);
	useEffect(() => {
		if (!!selectedTask)
			reset({
				assigneeId: selectedTask.assignee.id,
				dueDate: selectedTask.dueDate,
				name: selectedTask.name,
				pointEstimate: selectedTask.pointEstimate,
				status: selectedTask.status,
				tags: selectedTask.tags,
			});
		else reset(taskFormInitialState);
	}, [selectedTask, selectedTask?.id, reset]);

	const onSubmit = (data: ITaskForm) => {
		message.loading({ content: 'Loading...', key: data.name });
		if (selectedTask) {
			updateTask({
				variables: { input: { ...data, id: selectedTask.id } },
				optimisticResponse: {
					updateTask: {
						...selectedTask,
						...data,
						tags: data.tags as TASK_TAGS[],
						pointEstimate:
							(data.pointEstimate as POINT_ESTIMATE) ||
							selectedTask.pointEstimate,
						status: (data.status as STATUS) || selectedTask.status,
					},
				},
			});
			message.success({
				content: 'Task Updated...',
				key: data.name,
				duration: 2,
			});
		} else {
			createTask({
				variables: { input: data },
				update(cache, { data }) {
					const getExistingTasks: any = cache.readQuery({ query: GET_TASKS });
					const existingTasks = getExistingTasks ? getExistingTasks.tasks : [];
					const newTask = data?.createTask;
					cache.writeQuery({
						query: GET_TASKS,
						data: { tasks: [newTask, ...existingTasks] },
					});
				},
			});
			message.success({
				content: 'Task Created...',
				key: data.name,
				duration: 2,
			});
		}
		setIsVisible(false);
	};
	const handleCloseModal = useCallback(() => {
		setIsVisible(false);
		setSelectedTask(null);
	}, [setIsVisible, setSelectedTask]);

	const assigneeOptions = useMemo(
		() =>
			usersData?.users?.map(({ id, avatar, fullName }) => ({
				value: id,
				display: (
					<>
						{avatar ? (
							<Avatar src={avatar} size={32} />
						) : (
							<ReactAvatar size="32" name={fullName} round />
						)}
						<Text fontWeight={400}>{fullName}</Text>
					</>
				),
			})),
		[usersData?.users]
	);

	const handleOnChange = useCallback(
		(field, value) => {
			if (value !== null) setValue(field, value);
		},
		[setValue]
	);

	if (!isVisible) {
		return null;
	}

	if (loading) {
		return null;
	}

	return (
		<ModalBlock>
			<ModalOverlay onClick={() => handleCloseModal()}></ModalOverlay>
			<StyledModalContainer>
				<form onSubmit={handleSubmit(onSubmit)} className="simpleForm">
					<ModalHeader>
						<StyledInput
							placeholder="Task Title"
							type="text"
							{...register('name')}
						/>
					</ModalHeader>
					<ModalBody>
						<SelectsContainer alignItems="center">
							<Select
								defaultOption={
									<>
										<StyledIncreaseDeacreaseFillIcon />
										<Text>Estimate</Text>
									</>
								}
								menuHeader="Estimate"
								options={estimateOptions}
								value={selectedTask && selectedTask.pointEstimate}
								onChange={(value) =>
									setValue('pointEstimate', value as POINT_ESTIMATE)
								}
							/>
							<Select
								defaultOption={
									<>
										<StyledUserFillIcon />
										<Text>Assignee</Text>
									</>
								}
								menuHeader="Assign To.."
								options={assigneeOptions}
								value={selectedTask && selectedTask.assignee.id}
								onChange={(value) => handleOnChange('assigneeId', value)}
							/>
							<Select
								defaultOption={
									<>
										<StyledPriceTagFillIcon />
										<Text>Label</Text>
									</>
								}
								menuHeader="Tag Title"
								options={tagOptions}
								value={selectedTask && selectedTask.tags}
								onChange={(value) => handleOnChange('tags', value)}
								multiselect
							/>
							<CustomDatePicker
								defaultValue={
									(selectedTask && moment(selectedTask.dueDate)) || undefined
								}
								onChange={(value) => handleOnChange('dueDate', value)}
							/>
							<Select
								defaultOption={
									<>
										<StyledListCheckIcon />
										<Text>Status</Text>
									</>
								}
								menuHeader="Status"
								options={statusOptions}
								value={selectedTask && selectedTask.status}
								onChange={(value) => setValue('status', value as STATUS)}
							/>
						</SelectsContainer>
					</ModalBody>
					<StyledModalFooter>
						<Button variant="secondary" onClick={() => handleCloseModal()}>
							Cancel
						</Button>
						<Button type="submit" variant="primary">
							{selectedTask ? 'Edit' : 'Create'}
						</Button>
					</StyledModalFooter>
				</form>
			</StyledModalContainer>
		</ModalBlock>
	);
};

export default TaskModal;
