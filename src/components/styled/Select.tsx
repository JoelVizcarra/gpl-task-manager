import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import {
	DropDownContainer,
	DropDownHeader,
	DropDownListContainer,
	DropDownList,
	ListItem,
} from './Dropdown';
import { Text } from './Typography';
import Flex from './Flex';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ReactComponent as CheckboxLineIcon } from '../../assets/icons/checkbox-line.svg';
import { ReactComponent as CheckboxBlankLineIcon } from '../../assets/icons/checkbox-blank-line.svg';

type ValueType = string | null;

type OptionType = {
	display: string | JSX.Element;
	value: ValueType;
};

interface SelectProps {
	value: ValueType | ValueType[];
	onChange: (value: ValueType | ValueType[]) => void;
	options?: OptionType[];
	menuHeader?: string;
	defaultOption?: JSX.Element;
	multiselect?: boolean;
}

const SelectHeaderText = styled(Text)`
	color: ${({ theme }) => theme.palette.neutral.second};
	font-weight: 600;
	font-size: 20px;
	line-height: 32px;
	padding: 6px 24px;
	white-space: nowrap;
`;

const StyledDropDownHeader = styled(DropDownHeader)<{ isSelected?: boolean }>`
	${({ isSelected }) => isSelected && 'background:transparent;'}
`;

const MultiSelectHeader = styled(Flex)`
	& > div:not(:last-child) {
		margin-right: 5px;
		margin-bottom: 5px;
	}
`;

const StyledCheckboxLineIcon = styled(CheckboxLineIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const StyledCheckboxBlankLineIcon = styled(CheckboxBlankLineIcon)`
	fill: ${({ theme }) => theme.palette.neutral.first};
`;

const Select = ({
	value,
	options,
	onChange,
	defaultOption,
	menuHeader,
	multiselect = false,
}: SelectProps) => {
	const [openMenu, setOpenMenu] = useState(false);
	const [selected, setSelected] = useState<ValueType | ValueType[] | null>(
		value
	);
	const wrapperRef = useRef(null);
	useOutsideClick(wrapperRef, () => setOpenMenu(false));

	const toggleOpenMenu = () => setOpenMenu(!openMenu);

	const handleMenuOptionClicked = (value: ValueType) => () => {
		if (multiselect) {
			setSelected((current) => {
				if (current === null) return [value];
				else if (Array.isArray(current)) {
					const idx = current.indexOf(value);
					if (idx > -1) {
						const newState = current.filter((_, index) => index !== idx);
						return newState.length ? newState : null;
					} else {
						return [...current, value];
					}
				} else return null;
			});
		} else {
			setSelected(value);
		}
	};

	useEffect(() => {
		onChange(selected);
		if (!multiselect) setOpenMenu(false);
	}, [selected]);

	const renderSelected = useCallback(() => {
		if (selected === null || selected?.length === 0) return defaultOption;
		if (!multiselect)
			return options?.find(({ value }) => value === selected)?.display;
		else
			return (
				<MultiSelectHeader flexDirection="column" alignItems="start">
					{Array.isArray(selected) &&
						options
							?.filter(({ value }) => selected?.find((ele) => ele === value))
							?.map(({ value, display }) => (
								<DropDownHeader key={value}>{display}</DropDownHeader>
							))}
				</MultiSelectHeader>
			);
	}, [multiselect, selected, options, defaultOption]);

	return (
		<DropDownContainer ref={wrapperRef}>
			<StyledDropDownHeader isSelected={!!selected} onClick={toggleOpenMenu}>
				{renderSelected()}
			</StyledDropDownHeader>
			{openMenu && (
				<DropDownListContainer>
					<DropDownList>
						{menuHeader && <SelectHeaderText>{menuHeader}</SelectHeaderText>}
						{options?.map(({ display, value }) => (
							<ListItem onClick={handleMenuOptionClicked(value)} key={value}>
								{multiselect &&
									value &&
									(selected?.includes(value) ? (
										<StyledCheckboxLineIcon />
									) : (
										<StyledCheckboxBlankLineIcon />
									))}
								{display}
							</ListItem>
						))}
					</DropDownList>
				</DropDownListContainer>
			)}
		</DropDownContainer>
	);
};

export default Select;
