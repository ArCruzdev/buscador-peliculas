import React from 'react'
const urlBase = "http://www.omdbapi.com/?apikey="
const bySearch = "&s="
const API_KEY = "3bd22320"

export const fetchPeliculas = async({search}) => {
    if(search == '') return null
    try {
      const response = await fetch(`${urlBase}${API_KEY}${bySearch}${search}`)
      const data = await response.json()
      const movie = data.Search
      
      return movie?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
      }))
      
    } catch (error) {
        throw new Error('Error searching movies')
    }
  }
