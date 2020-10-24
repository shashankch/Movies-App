import React from 'react';
import { handleMovieSearch, addMovieToList } from '../actions';
import { StoreContext,connect } from '../index';
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  handleAddToMovies = (movies) => {
    this.props.dispatch(addMovieToList(movies));
    // this.setState({
    //   searchText: "",
    // });
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    // const { showSearchResults } = this.state;
    // can give different name while destructuring.. result:movie
    const { result: movies, showSearchResults } = this.props.search;
    return (
      <div className='nav'>
        <div className='search-container'>
          <input onChange={this.handleChange} />
          <button id='search-btn' onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className='search-results'>
              <div className='search-result'>
                <img src={movies.Poster} alt='search-pic' />
                <div className='movie-info'>
                  <span>{movies.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movies)}>
                    Add to Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
// class NavbarWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <Navbar dispatch={store.dispatch} search={this.props.search} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps({search}) {

  return {
    search
  }


}



export default connect(mapStateToProps)(Navbar);
