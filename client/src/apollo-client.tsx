import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
} from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                bitcoin: {
                    merge(existing = {}, incoming) {
                        return { ...existing, ...incoming };
                    },
                },
            },
        },
    },
});


const httpLink = new HttpLink({
    uri: "http://localhost:4000/api/graphql", // Make sure this matches your server endpoint
});



const client = new ApolloClient({
    link: from([httpLink]),
    cache,
});

export default client;
