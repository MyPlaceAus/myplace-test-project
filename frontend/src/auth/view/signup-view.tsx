import * as zod from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, PersonStandingIcon } from 'lucide-react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import axios, { endpoints } from 'src/lib/axios';
import { toast } from 'src/components/snackbar';
import { Button } from 'src/components/ui/button';
import { Form, Field } from 'src/components/hook-form';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from 'src/components/ui/card';

import { getErrorMessage } from '../utils/error-message';

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  email: zod
    .email({ message: 'Email must be a valid email address!' })
    .min(1, { message: 'Email is required!' }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
  organization: zod.string().optional(),
});

export default function SignupView() {
  const router = useRouter();
  const showPassword = useBoolean();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: SignUpSchemaType = {
    email: '',
    name: '',
    password: '',
    organization: '',
  };

  const methods = useForm<SignUpSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage(null);

    try {
      await axios.post(endpoints.auth.jwt.signUp, {
        email: data.email,
        name: data.name,
        password: data.password,
        company: data.organization?.trim() ? data.organization.trim() : null,
      });

      toast.success('Account created. You can now sign in.');
      router.push(paths.auth.jwt.signIn);
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          {!!errorMessage && (
            <Alert severity="error">
              <AlertDescription className="items-center">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Form methods={methods}>
            <div className="space-y-3 px-3">
              <Field.Text name="name" label="Name" placeholder="John Doe" />
              <Field.Text name="email" label="Email" placeholder="john@doe.com" />
              <Field.Text
                name="password"
                label="Password"
                helperText="Must be at least 6 characters"
                placeholder="••••••••"
                type={showPassword.value ? 'text' : 'password'}
                endIcon={
                  <button
                    type="button"
                    onClick={showPassword.onToggle}
                    className="flex items-center border-transparent! border-0! hover:border-none! outline-none! ring-0 p-0 text-gray-400 hover:text-gray-600 bg-transparent! focus:outline-none! hover:ring-0"
                  >
                    {!showPassword.value ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                }
              />
              <Field.Text
                name="organization"
                label="Organization"
                placeholder="advantageair.com.au"
                helperText="Optional"
              />

              <Button
                color="primary"
                variant="contained"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                Create account
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                Already have an account?{' '}
                <RouterLink
                  href={paths.auth.jwt.signIn}
                  className="text-primary font-medium hover:underline"
                >
                  Back to login
                </RouterLink>
              </p>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
