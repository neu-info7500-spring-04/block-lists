import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client'; 
import BlocksComponent from './BlocksComponent'; 

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                
                <BlocksComponent />
            </div>
        </ApolloProvider>
    );
};

export default App;
