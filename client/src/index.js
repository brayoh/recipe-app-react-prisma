import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

// css
import './styles/index.css';

const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/bkuriakb/react-prisma-recipe-app/dev'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
