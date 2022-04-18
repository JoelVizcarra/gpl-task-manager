import React from 'react';
import styled, { useTheme } from 'styled-components';
import { DatePicker, DatePickerProps } from 'antd';

import CalendarCheckLineIcon from '../../assets/icons/calendar-check-line.svg';

interface CustomDatePickerProps {
	algo?: boolean;
}

const CustomDatePicker = ({
	algo,
	...rest
}: CustomDatePickerProps & DatePickerProps) => {
	const { palette } = useTheme();

	const customStyle = {
		height: '32px',
		fontFamily: 'SF Pro Display',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '15px',
		padding: '4px 16px 4px 48px',
		borderRadius: '4px',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		background: `${palette.neutral.second}10 url(${CalendarCheckLineIcon}) no-repeat 18px center`,
		border: 'none',
		boxShadow: 'none',
		'& *': {
			cursor: 'pointer',
			backgroundColor: `${palette.neutral.second}10`,
		},
	};

	return (
		<>
			{/*
				// @ts-ignore */}
			<DatePicker
				{...rest}
				style={customStyle}
				placeholder="Due Date"
				suffixIcon={null}
				inputReadOnly
				allowClear={false}
				format="MMM. DD YYYY"
			/>
		</>
	);
};

export default CustomDatePicker;
