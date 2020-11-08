import { useQuery, useMutation } from "@apollo/client";
import { GET_MOVIES, DELETE_MOVIE } from "../../graphql/queries";

const MovieTable = () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    // updating list with no rerequest. Just update cache
    update: (cache, { data }) => {
      try {
        // get data from cache that was written by GET_MOVIES
        const moviesData = cache.readQuery({
          query: GET_MOVIES,
        });

        // rewrite cache due to data recieved after mutation { data } contains id

        const { id } = data.deleteMovie;

        cache.writeQuery({
          query: GET_MOVIES,
          data: {
            movies: [...moviesData.movies].filter((movie) => movie.id !== id),
          },
        });
      } catch (err) {
        console.warn(err);
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = (id) => {
    // if we have id we can call mutation fn with variable
    id && deleteMovie({ variables: { id } });
  };

  return (
    <div>
      <p>Movie Table component</p>

      {data.movies.map(
        ({ id, name, genre, director: { name: directorName, age } }) => (
          <div key={id}>
            <p>Film name: {name}</p>
            <p>Film genre: {genre}</p>

            <ul>
              <li>Director name: {directorName}</li>
              <li>Director age: {age}</li>
            </ul>
            <button onClick={() => handleDelete(id)}>Delete</button>
            <br />
          </div>
        )
      )}
    </div>
  );
};

export default MovieTable;
