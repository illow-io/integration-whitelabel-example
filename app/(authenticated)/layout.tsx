import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import LeftNavigationPanel from '@/components/LeftNavigationPanel';
import TopBar from '@/components/TopBar';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col h-screen'>
      <TopBar />
      <div className='flex flex-1 items-stretch'>
        <LeftNavigationPanel />
        {children}
      </div>
    </main>
  );
}

// TS hack to workaround NextJS + Auth0 issue
const layout = withPageAuthRequired(Layout as any, { returnTo: '/api/auth/login' });
export default (layout as any);