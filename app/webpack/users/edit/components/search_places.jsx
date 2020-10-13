import React, { Component } from "react";
import PropTypes from "prop-types";
import inatjs from "inaturalistjs";

class SearchPlaces extends Component {
  constructor( ) {
    super( );

    this.state = {
      showDropdown: false,
      placesList: []
    };

    this.showPlaceList = this.showPlaceList.bind( this );
    this.fillInputWithSelection = this.fillInputWithSelection.bind( this );
  }

  showPlaceList( e ) {
    this.setState( { showDropdown: true } );

    inatjs.places.autocomplete( { q: e.target.value } ).then( ( { results } ) => {
      this.setState( { placesList: results } );
    } ).catch( err => console.log( "couldn't autocomplete places", err ) );
  }

  fillInputWithSelection( e ) {
    const { profile, setUserData } = this.props;
    const updatedProfile = profile;
    updatedProfile.user_search_place_id = e.target.name;
    setUserData( updatedProfile );
    this.setState( { showDropdown: false } );
  }

  createSearchPlaceList( ) {
    const { placesList } = this.state;

    return placesList.map( place => (
      <div key={`${place.id}-${place.name}`}>
        <button
          type="button"
          onClick={this.fillInputWithSelection}
          className="btn gray-button"
          name={place.name}
        >
          {place.name}
        </button>
      </div>
    ) );
  }

  render( ) {
    const { profile } = this.props;
    const { showDropdown } = this.state;

    return (
      <div className="profile-setting">
        <h5>{I18n.t( "default_search_place" )}</h5>
        <div className="account-subheader-text">{I18n.t( "default_search_place_description" )}</div>
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            value={profile.user_search_place_id}
            name="user_search_place_id"
            onSelect={this.showPlaceList}
          />
          {showDropdown && (
            <div className="show dropdown-menu">
              {this.createSearchPlaceList( )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

SearchPlaces.propTypes = {
  profile: PropTypes.object,
  setUserData: PropTypes.func
};

export default SearchPlaces;
