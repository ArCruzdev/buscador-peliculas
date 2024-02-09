const ListMovies = ({ movie}) => {
    return(
        <ul className="movies">
        {
          movie.map(movie => {
            return (
                <li key={movie.id} className="movie">
                <h1>{movie.title}</h1>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title}/>
                </li>
            )
          })
        }
      </ul>
    )
}

const NoResults = () => {
    return(
        <p>No se encontraron resultados para esta pelicula</p>
    )
}

export const Movies = ({movie}) => {
    const hasMovie = movie?.length > 0
    return(
        hasMovie 
        ? <ListMovies movie={movie} />
        : <NoResults />
    )
}