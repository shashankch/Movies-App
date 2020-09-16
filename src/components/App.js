import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate(); //never use this method..
    });

    // make api call
    // dispatch action

    // store.dispatch({
    //   type: "ADD_MOVIES",
    //   movies: data,
    // });

    store.dispatch(addMovies(data));
    console.log(this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();//{movies:{},search:{}}

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      // found the movie
      return true;
    }

    return false;
  };

  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };

  render() {
    const {movies,search} =this.props.store.getState();//{movies:{},search:{}}
    const { list, favourites, showFavourites } = movies; 
    console.log("render", this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar
         dispatch={this.props.store.dispatch} search={search}/>
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length===0? <div className="no-movies">OOPs No Favourites!</div>:null}
        </div>
      </div>
    );
  }
}

// function App(props) {

//   const movies=props.store.getState();
//   return (
//     <div className='App'>
//       <Navbar />
//       <div className='main'>
//         <div className='tabs'>
//           <div className='tab'>Movies</div>
//           <div className='tab'>Favourites</div>
//         </div>
//         <div className='list'>
//           {movies.map((movie,index) => (
//             <MovieCard movie={movie} key={`movies-${index}`} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default App;

// {data.map((movie,index) => (
//   <MovieCard movie={movie} key={`movies-${index}`} />
// ))}
