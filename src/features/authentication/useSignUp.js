import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useSignUp = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log('🚀 ~ useSignUp ~ user:', user);
      toast.success(
        'Thank you, your account has been created successfully. Activation link has been sent to email to verify.'
      );
    },
  });

  return { signup: mutate, isLoading };
};
