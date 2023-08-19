import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux'; // Add this import
import store from './yourReduxStore'; // Replace with the path to your Redux store
import Nav from './components/Nav';
// Remove the import for StoreProvider

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* Use Provider from react-redux */}
      <Provider store={store}>
        <Nav />
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
