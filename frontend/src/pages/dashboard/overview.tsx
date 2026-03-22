import { CONFIG } from 'src/global-config';
import { OverviewView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

const metadata = { title: `Overview | Dashboard | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <OverviewView />
    </>
  );
}
