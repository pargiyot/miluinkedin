import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'https://innocent-lemming-13.hasura.app/v1/graphql',
    headers: {
        "x-hasura-admin-secret": "zmqjascyz7YrkFric7zip7QHF0ZQaeODUkm6N1vpLi3ckPvKfuO64j3QOM0uhPbh"
    },
    cache: new InMemoryCache()
  });


  export const getAllReservists = async () => {
    const reservits = await client.query({
      query: gql`
        query AllReservists {
            reservists {
            id
            image_url
            linkedin_url
            name
            rank
            }
        }      
      `
    });

    console.log(reservits)
    return reservits;
  }

//   "e317da3c-5387-4d4b-9cc8-d83c627abcbd"
  export const reservistById = async (id) =>{
    const reservist = await client.query({
        query: gql`
            query MyQuery {
                reservists_by_pk(id: "${id}") {
                id
                image_url
                linkedin_url
                name
                rank
                }
            }
        `
    });

    return reservist.data.reservists_by_pk;
  }