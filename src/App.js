import {useState, useEffect} from 'react';
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  // Initial start with a blank useState to later be filled with the Pokemon Api fetch result
  const [pokemon, setPokemon] = useState([])
  // Fetching's the Pokemon from the api and sets it as the current page in state
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  // Initially set loading to true until the fetch request is complete
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()
  },[currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

 if (loading) return 'Loading....'
  return (
    <>
   <PokemonList pokemon={pokemon}/>
   <Pagination 
   gotoNextPage = {nextPageUrl ? gotoNextPage : null}
    gotoPrevPage = {prevPageUrl ? gotoPrevPage : null} />
    </>
  );
}

export default App;
