import { useRef, useState, useMemo } from "react"
import { fetchPeliculas } from "../services/fetchPeliculas"

export const useMovies = ({search, sort}) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [errors, setErros] = useState(null)
    const previusSearch = useRef(search)

const getMovies = async() => {
  if(search === previusSearch.current) return
  try {
    setLoading(true)
    setErros(null)
    previusSearch.current = search
    const newMovie = await fetchPeliculas({search})
    setMovies(newMovie)
  } catch (error) {
    setMovies(null)
    setErros(error.message)
  } finally{
    setLoading(false)
    
  }
}

const sortedMovies = useMemo(() => {
  return sort
? [...movies].sort((a,b) => a.title.localeCompare(b.title))
: movies},[sort, movies])
    

    return{
      movies: sortedMovies,
      getMovies,
      errors,
      loading
    }
  }