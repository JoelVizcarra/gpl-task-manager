import React, { createContext, useState } from 'react';

import { TaskModal } from '../components';
import { ITask } from '../types';

export type TaskModalContextType = {
	selectedTask: ITask | null;
	isVisible: boolean;
	setSelectedTask: React.Dispatch<React.SetStateAction<ITask | null>>;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskModalContextInitialState: TaskModalContextType = {
	selectedTask: null,
	setSelectedTask: () => {},
	isVisible: false,
	setIsVisible: () => {},
};

export const TaskModalContext = createContext<TaskModalContextType>(
	TaskModalContextInitialState
);

export const TaskModalProvider: React.FC = ({ children }) => {
	const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	const value = {
		selectedTask,
		setSelectedTask,
		isVisible,
		setIsVisible,
	};

	return (
		<TaskModalContext.Provider value={value}>
			<TaskModal />
			{children}
		</TaskModalContext.Provider>
	);
};
