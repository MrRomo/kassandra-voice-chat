import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps, session }: Any<{}>) {
  return (
    <SessionProvider session={session}>
      <div className={inter.className}>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default appWithTranslation(App);
