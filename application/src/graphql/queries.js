import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query {
    movies {
      id
      name
      genre
      director {
        id
        name
        age
      }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      id
      name
      genre
      director {
        name
        age
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;
