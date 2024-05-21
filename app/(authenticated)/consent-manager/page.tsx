import { enableCMP, fetchCMP } from "@/app/lib/actions";
import { getSession } from "@auth0/nextjs-auth0";

const ConsentManager = async () => {
  const session = await getSession();
  const internalId: string = session?.user.email;
  const cmp = await fetchCMP(internalId);
  const onSubmit = enableCMP.bind(null, internalId, session?.user.email!);

  return (
    <div className="flex flex-col items-start bg-black text-white p-4 h-full flex-grow">
      <h1 className="mb-4 text-lg">Consent Manager</h1>
      {cmp ? (
        <a className='mt-4 px-3 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg' href={cmp.loginUrl} target='_blank'>Visit CMP</a>
      ) : (
        <form action={onSubmit} className="flex flex-col">
          <label className="text-sm text-primary-400 mb-1">Domain</label>
          <input type='text' name='domain' required className="text-black text-sm" placeholder="example.com" />
          <button className='mt-6 px-3 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg' type='submit'>Enable CMP</button>
        </form>
      )}
    </div>
  )
}

export default ConsentManager;