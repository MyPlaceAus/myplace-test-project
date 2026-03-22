import { CONFIG } from 'src/global-config';

import { SignupView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SignupView />
    </>
  );
}
