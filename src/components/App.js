import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { StoreContext, connect } from '../index';

class App extends React.Component {
  componentDidMount() {
   


    this.props.dispatch(addMovies(data));
   
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props; //{movies:{},search:{}}

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      // found the movie
      return true;
    }

    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies, search } = this.props; //{movies:{},search:{}}
    const { list, favourites, showFavourites } = movies;
    console.log('render', this.props);
    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className='App'>
        <Navbar dispatch={this.props.dispatch} search={search} />
        <div className='main'>
          <div className='tabs'>
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : ''}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className='list'>
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movies-${index}`}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className='no-movies'>OOPs No Favourites!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

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

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}

const connectedComponent = connect(mapStateToProps)(App);

export default connectedComponent;

// {data.map((movie,index) => (
//   <MovieCard movie={movie} key={`movies-${index}`} />
// ))}
