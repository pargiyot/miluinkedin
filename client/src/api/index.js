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

export const createReserver = async (imageUrl, linkedinName, linkedinURL, name, rank) => {
  const reservitId = await client.mutate({
    variables: {
      imageUrl,
      linkedinName,
      linkedinURL,
      name,
      rank
    },
    mutation: gql`
       mutation insert_reserva(
         $imageUrl: String, 
         $linkedinName: String, 
         $linkedinURL: String, 
         $name: String, 
         $rank: String
        ) {
        insert_reservists(
          objects: {
            image_url: $imageUrl, 
            linkedin_name: $linkedinName, 
            linkedin_url: $linkedinURL,
            name: $name, 
            rank: $rank, 
          }) {
          returning {
            id
          }
        }
      }`
  });

  console.log(reservitId.data.insert_reservists.returning[0].id)
  return reservitId.data.insert_reservists.returning[0].id;
}

//   "e317da3c-5387-4d4b-9cc8-d83c627abcbd"
export const reservistById = async (id) => {
  const reservist = await client.query({
    query: gql`
            query myQuery($id: uuid!) {
              reservist: reservists_by_pk(id: $id) {
              image_url
              linkedin_name
              linkedin_url
              name
              rank
              experiences {
                company
                role
                start_date
                end_date
              }
              skills {
                name
                score
              }
              tags {
                id
                name
              }
            }
          }
        `,
    variables: {
      id
    }
  });

  return reservist.data.reservist;
}