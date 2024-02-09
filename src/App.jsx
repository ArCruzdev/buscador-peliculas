import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

export const useSerch = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const firstInput = useRef(true)

  useEffect(() => {
    if(firstInput.current) {
      firstInput.current == search == ''
    }
    if(search === ''){
      setError('no se puede buscar una pelicula vacia')
      return
    }
    if(search.match(/^\d+$/)){
      setError('no se puede buscar una pelicula con un numero')
      return
    }
    if(search.length < 3){
      setError('la busqueda debe tener almenos 3 caracterres')
      return
    }
    setError(null)
  },[search])

  return{
    search,
    setSearch,
    error
  }
}



function App() {

  const [sort, setSort] = useState(false)

  const { search, setSearch, error} = useSerch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  const debounceGetMovies = useCallback(debounce(search => {
    getMovies({search})
  }, 300),[getMovies])
  
  
  const onInputChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debounceGetMovies({newSearch})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies()
  }

  return (
    <>
    <header>
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input 
         type='text'
         placeholder='spiderman, blade runner, avanger'
         value={search}
         onChange={onInputChange}
         style={{border: '1px solid transparent', borderColor: error ? 'red': 'transparent'}}
        />
        <input type='checkbox' onChange={handleSort} checked={sort}/>
        <button type='submit'>Buscar</button>
      </form>
    </header>
    <main>
      {
        loading 
        ? <p>Cargando......</p>
        : <Movies movie={movies}/>
      }
     
    </main>
    </>
  )
}

export default App
