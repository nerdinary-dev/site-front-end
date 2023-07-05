import React from 'react';
import { Avatar, Card, Text, Title } from '@mantine/core';

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

export const Profile = ({ name, email, bio, avatarUrl }: ProfileProps) => {
  return (
    <Card shadow="sm" padding="lg">
      <Avatar src={avatarUrl} alt={name} size={120} style={{ marginBottom: 20 }} />
      <Title order={2}>{name}</Title>
      <Text size="sm" color="gray">{email}</Text>
      <Text style={{ marginTop: 20 }}>{bio}</Text>
    </Card>
  );
}