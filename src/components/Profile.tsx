import React from "react";
import { useQuery } from "@apollo/client";
import ReactAvatar from "react-avatar";
import { Descriptions, Spin, Space } from "antd";

import { GET_PROFILE, ProfileDataType } from "../queries/User";
import { Flex, FullContainer, Avatar } from "./styled";

const Profile = () => {
  const { loading, data } = useQuery<ProfileDataType>(GET_PROFILE);

  if (loading) {
    return (
      <FullContainer justifyContent="center" alignItems="center">
        <Spin size="large" />
      </FullContainer>
    );
  }

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Space direction="vertical" align="center" size="large">
        {data?.profile.avatar ? (
          <Avatar src={data?.profile.avatar} size={128} />
        ) : (
          <ReactAvatar size="128" name={data?.profile.fullName} round />
        )}
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Full Name">
            {data?.profile.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="E-mail">
            {data?.profile.email}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Flex>
  );
};

export default Profile;
