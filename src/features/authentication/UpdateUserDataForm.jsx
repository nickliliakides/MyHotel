import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';
import styled from 'styled-components';

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 12px;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
`;

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <BottomContainer>
        {currentAvatar && (
          <AvatarImage
            width={128}
            height={128}
            src={currentAvatar || 'default-user-avatar.png'}
            alt='avatar'
          />
        )}

        <FormRow>
          <Button type='reset' variation='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </FormRow>
      </BottomContainer>
    </Form>
  );
}

export default UpdateUserDataForm;
