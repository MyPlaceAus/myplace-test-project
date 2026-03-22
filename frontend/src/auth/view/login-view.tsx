import * as zod from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, PersonStandingIcon } from 'lucide-react';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';

import { Button } from 'src/components/ui/button';
import { Form, Field } from 'src/components/hook-form';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from 'src/components/ui/card';
import { getErrorMessage } from '../utils/error-message';
import { signInWithPassword } from '../context/jwt/action';
import { useAuthContext } from '../hooks/use-auth-context';

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .email({ message: 'Email must be a valid email address!' })
    .min(1, { message: 'Email is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});
export default function LoginView() {
  const router = useRouter();

  const showPassword = useBoolean();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { checkUserSession } = useAuthContext();

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      router.refresh();
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
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {!!errorMessage && (
            <Alert severity="error">
              <AlertDescription className="items-center">{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Form methods={methods}>
            <div className="space-y-3 px-3">
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

              <Button
                color="primary"
                variant="contained"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                Login
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                Don&apos;t have an account?{' '}
                <RouterLink
                  href={paths.auth.jwt.signUp}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </RouterLink>
              </p>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
