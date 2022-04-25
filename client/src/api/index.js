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

export const getAllSkills = async() => {
    const skills = await client.query({
        query: gql `
    query getSkills {
      skills: skills_aggregate(distinct_on: name) {
        nodes {
          name
          id    
        }
      }
    }
    `
    });

    return skills.data.skills.nodes
}

export const getAllTags = async() => {
    const tags = await client.query({
        query: gql `
  query getTags {
    tags: tags_aggregate(distinct_on: name) {
      nodes {
        name
        id    
      }
    }
  }
  `
    });

    return tags.data.tags.nodes
}

export const getAllReservists = async() => {
    const reservists = await client.query({
        query: gql `
        query getAllReservists {
          reservists {
          id
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
            id
            name
            score
          }
          tags {
            id
            name
          }
        }
      }     
      `
    });

    return reservists.data.reservists;
}

export const reservistById = async(id) => {
    const reservist = await client.query({
        query: gql `
            query getReservistById($id: uuid!) {
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