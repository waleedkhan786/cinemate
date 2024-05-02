import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export const MovieDetail = ({ id }) => {
  const params = useParams();
  
  const [movie, setMovie] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

 
  useEffect(() => {
    async function fetchMovies() {

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}`,
        options
      );
      const json = await response.json();

      setMovie(json);
    }
    fetchMovies();
  }, [params.id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/images`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzgyYTU4YTJmMjE0MmFlYTlmYWZkZGFiZDRkYTMxNyIsInN1YiI6IjY2MWU3YzMxMjE2MjFiMDE2NGYwNGM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0X86eU2Iiy53dEj_eV8Bh08QpGE229gUDQEf1_EIjpc",
            },
          }
        );
        const data = await response.json();
        // Assuming the first image URL in the response is the one you want to display
        if (data && data.backdrops && data.backdrops.length > 0) {
          setImageUrl(
            `https://image.tmdb.org/t/p/w500${data.backdrops[0].file_path}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [params.id]);

  useEffect(()=>{
    document.title = `${movie.title}/Cinemate`
  })

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="h-auto  max-w-xl">
          <img className="rounded" src={imageUrl} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3  text-center lg:text-left">
            {movie.title}
          </h1>
          <p className="my-4">{movie.overview}</p>

          <p className="my-7 flex flex-wrap gap-2">
            {movie.genre_ids &&
              movie.genre_ids.map((genre) => (
                <span
                  className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
          </p>

          <div className="flex items-center justify-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ml-2   text-gray-900 dark:text-white">
              {movie.vote_average}
            </p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <span className=" font-medium text-gray-900  dark:text-white">
              {movie.vote_count} reviews
            </span>
          </div>

          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.runtime} min.</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>{movie.budget} </span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>{movie.revenue} </span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Relese Date:</span>
            <span>{movie.release_date} </span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <span>{movie.imdb_id} </span>
          </p>
        </div>
      </section>
    </main>
  );
};
