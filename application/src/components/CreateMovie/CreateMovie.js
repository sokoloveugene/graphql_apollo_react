import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MOVIE, GET_MOVIES } from "../../graphql/queries";

const CreateMovie = () => {
  const [addMovie] = useMutation(ADD_MOVIE, {
    // if we want to requery data after mutation just use refetchQueries: [{ query: GET_MOVIES }],
    // also we can call fn after mutation will be successfuly done, use:
    // onCompleted: () => {
    //   console.log("Mutation done");
    // },

    // update cache after mutation
    update: (cache, { data }) => {
      // it is recommended to use try catch
      try {
        // get data from cache that was written after query GET_MOVIES
        const moviesData = cache.readQuery({
          query: GET_MOVIES,
        });

        // update cache with mutation response
        cache.writeQuery({
          query: GET_MOVIES,
          data: {
            movies: [...moviesData.movies, data.addMovie],
          },
        });
      } catch (err) {
        console.warn(err);
      }
    },
  });

  const [state, setState] = useState({ name: "", genre: "", directorId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // check empty fields
    const isValid = validateState();

    if (isValid) {
      // call mutation fn with variables
      addMovie({ variables: { ...state } });
      setState({ name: "", genre: "", directorId: "" });
    }
  };

  const validateState = () => {
    const values = Object.values(state);
    return !values.some((v) => v === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const { name, genre, directorId } = state;

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        type="text"
        placeholder="movie name"
        name="name"
        onChange={handleChange}
      />
      <input
        value={genre}
        type="text"
        placeholder="movie genre"
        name="genre"
        onChange={handleChange}
      />
      <input
        value={directorId}
        type="text"
        placeholder="directorId"
        name="directorId"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateMovie;
