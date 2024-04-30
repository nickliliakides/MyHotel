import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import StyledFormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: editId, ...restRoomProps } = cabin;
  const isEditMode = !!editId;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? restRoomProps : {},
  });
  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isProccessing = isCreating || isEditing;

  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    const resetAndClose = () => {
      reset();
      onCloseModal?.();
    };

    if (isEditMode) {
      editCabin(
        { roomData: { ...data, image }, id: editId },
        {
          onSuccess: () => resetAndClose(),
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => resetAndClose(),
        }
      );
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <StyledFormRow label='Room name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', { required: 'Name is required' })}
        />
      </StyledFormRow>

      <StyledFormRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          min='1'
          {...register('maxCapacity', {
            required: 'Max capacity is required',
            min: { value: 1, message: 'Capacity must be at least 1' },
          })}
        />
      </StyledFormRow>

      <StyledFormRow label='Regular price' error={errors?.price?.message}>
        <Input
          type='number'
          id='price'
          min='1'
          {...register('price', {
            required: 'Price is required',
            min: { value: 1, message: 'Price must be at least 1' },
          })}
        />
      </StyledFormRow>

      <StyledFormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Discount is required',
            validate: (value) =>
              value <= getValues().price ||
              'Discount should be less that price',
          })}
        />
      </StyledFormRow>

      <StyledFormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: 'Description is required' })}
        />
      </StyledFormRow>

      <StyledFormRow label='Description'>
        {/* <Label htmlFor='image'>Cabin photo</Label> */}
        <FileInput
          id='image'
          accept='image/*'
          type='file'
          {...register('image', {
            required: isEditMode ? false : 'Description is required',
          })}
        />
      </StyledFormRow>

      <StyledFormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isProccessing}>{`${
          isEditMode ? 'Edit' : 'Add'
        } room`}</Button>
      </StyledFormRow>
    </Form>
  );
}

export default CreateCabinForm;
