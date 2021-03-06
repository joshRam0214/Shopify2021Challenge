import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import BtnNomination from './BtnNomination';
import DisplayMovie from './Displaymovie';
import DisplayNominations from './DisplayNominations';
import Options from './Options';

function App() {
  const APP_key = '5abc4a1e';
  const [movies, setMovies] = useState([]);
  const [nominate, setNominate] = useState([]);
  const [searchMovie, setSearch] = useState("");
  const [query, setQuery] = useState('');
  const [alert, setAlert] = useState(true);
  const [checkState, setStates] = useState([false, false, false]);
  const [opts, setOpts] = useState(false);

  const getOtps = (value) => {
    setOpts(value);

  }

  const getMovie = async (query) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${APP_key}&s=${query}`);
    const data = await response.json();
    setMovies([]);
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  //Fetch movie data
  useEffect(() => {
    getMovie(query);
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(searchMovie);
    setSearch('');
  }

  const addNomi = (movie) => {
    if (nominate.length < 5) {
      const newNominationList = [...nominate, movie];
      setNominate(newNominationList);
      setAlert(true);
    }
    else {
      setAlert(false);
    }
  }

  const removeNomi = (movie) => {
    const newNominationList = nominate.filter((nomiees) =>
      nomiees.imdbID !== movie.imdbID
    );
    setAlert(true);
    setNominate(newNominationList);
  }

  return (
    <div className="App d-flex flex-column align-items-center">
      <div className="card cardWidth2 m-2 align-items-center text-center">

        <h1>Shoppies</h1>
        <form onSubmit={getSearch} className="movie-title p-2">
          <h2>Movie Title</h2>
          <div className="input-bar d-flex flex-direction-row align-items-center">
            <button className="search" type="submit">Search</button>
            <input className="movie-name" type="text" value={searchMovie} onChange={updateSearch} />
            <div className="p-1 w-100">
              <Options optsUpdate={getOtps} />
            </div>
          </div>
        </form>
      </div>
      <div className="layoutMovie d-flex flex-row p-5">
        <div className="card cardWidth text-center mr-5">
          <h2 className="m-2">{movies.length === 0 ? "No Results" : "Results for " + ' "' + query + '"'}</h2>
          <ul className="list-group">
            <DisplayMovie movies={movies} onClickNomi={addNomi} nominateComp={BtnNomination} compareID={nominate} featureSelection={opts} />
          </ul>
        </div>


        <div className="ml-2">
          <div className="card text-center cardWidth">
            <h2 className="m-2">Nominations</h2>
            <ul className="list-group">
              <DisplayNominations movies={nominate} onClickNomi={removeNomi} nominateComp={BtnNomination} arrayOfFive={alert} />
            </ul>
          </div>
        </div>
      </div>
        {nominate.length === 5 ? <div class="position-fixed w-100 alert alert-danger text-center" role="alert">
          Maximum 5 Nominations
        </div> : null}
    </div>
  );
}
export default App;
