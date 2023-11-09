import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import '../static/styles/app.css';
import { AuthProvider } from '@/contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default appWithTranslation(MyApp);
