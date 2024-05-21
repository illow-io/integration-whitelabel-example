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

// @ts-ignore
export default withPageAuthRequired(Layout, { returnTo: '/api/auth/login' });
