import '../styles/globals.css'
import { ContextProvider } from '@/context/context';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    connectToDevTools: true,
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </ApolloProvider>
  )
}
