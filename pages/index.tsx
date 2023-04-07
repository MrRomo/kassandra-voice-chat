import {
  OpenAIModelID
} from '@/types/openai';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface HomeProps {
  serverSideApiKeyIsSet: boolean;
  serverSidePluginKeysSet: boolean;
  defaultModelId: OpenAIModelID;
}

const Home: React.FC<HomeProps> = ({
  serverSideApiKeyIsSet,
  serverSidePluginKeysSet,
  defaultModelId,
}) => {
  const [google, setGoogle] = useState({ name: '', id: '' })
  const { data: session } = useSession()
  const router = useRouter()
  const [lightMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auth/providers')
      const json = await res.json()
      if (json) setGoogle(json.google)
    }
    fetchData()
  }, [session])


  useEffect(() => {
    console.log(session);
    
    if(session) router.push('/chat')
  }, [session])

  return (
    <>
      <Head>
        <title>Kassandra Voice Chat</title>
        <meta name="description" content="ChatGPT but better." />
        <meta
          name="viewport"
          content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex h-screen w-screen flex-col text-sm text-white dark:text-white ${lightMode}`}
      >
        {/*  google login button center */}
        <div className="flex flex-row justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signIn(google.id)}
          >
            Sign In
          </button>
        </div>
      </main>
    </>
  );
};
export default Home;

