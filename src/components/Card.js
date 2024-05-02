import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
export const Card = ({movie}) => {
  const {original_title,overview,id} = movie;
 

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images`,
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
          setImageUrl(`https://image.tmdb.org/t/p/w500${data.backdrops[0].file_path}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImage();
  }, [id]);

  

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzgyYTU4YTJmMjE0MmFlYTlmYWZkZGFiZDRkYTMxNyIsInN1YiI6IjY2MWU3YzMxMjE2MjFiMDE2NGYwNGM3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0X86eU2Iiy53dEj_eV8Bh08QpGE229gUDQEf1_EIjpc'
  //   }
  // };
  
  // const image = fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(err => console.error(err));
   

  return (
   

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`/movie/${id}`}>
    {imageUrl && (
          <img className="rounded-t-lg" src={imageUrl} alt={original_title} />
        )}
    </Link>
    <div className="p-5">
        <Link to={`/movie/${id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{original_title}</h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{overview}</p>
       
    </div>
</div>

  )
}
