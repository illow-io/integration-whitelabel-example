import { fetchCMP } from "@/app/lib/actions";
import ConsentManagerScreen from "@/components/ConsentManagerScreen";
import { getSession } from "@auth0/nextjs-auth0";

const ConsentManagerHome = async () => {
  const session = await getSession();
  const internalId: string = session?.user.email;
  const cmp = await fetchCMP(internalId);

  return (
    <div className="flex-1">
      {session && session.idToken && cmp && (
        <ConsentManagerScreen
          authToken={session.idToken}
          tenantId={cmp.tenantId}
          path='/main/home'
        />
      )}
    </div>
  )
}

export default ConsentManagerHome;