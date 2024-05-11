import { getSession } from "@auth0/nextjs-auth0";

export default async function TopBar() {
  const { user } = await getSession() || {};
  return (
    <div className='px-5 py-4 flex justify-between bg-primary-600 text-white shadow-md'>
      <span>Privacy Shire</span>
      <div className="text-sm">
        {user && (
          <>
            <span>{user.email}</span>
            <span className="mx-3">|</span>
          </>
        )}
        <a href="/api/auth/logout" className="text-sm hover:text-primary-800">Log out</a>
      </div>
    </div>
  );
}