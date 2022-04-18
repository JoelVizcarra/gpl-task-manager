import { gql } from '@apollo/client';
import { IUser } from '../types';

export type UsersDataType = {
	users: IUser[];
};

export type ProfileDataType = {
	profile: IUser;
};

export const GET_USERS = gql`
	query GetUsers {
		users {
			avatar
			fullName
			id
		}
	}
`;

export const GET_PROFILE = gql`
	query GetProfile {
		profile {
			avatar
			createdAt
			email
			fullName
			id
			type
			updatedAt
		}
	}
`;
