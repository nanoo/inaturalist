import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const SaveButton = ( { saveUserSettings, profile } ) => (
  <div className="flex-no-wrap space-between-items">
    <div className={profile.saved_status === "saved" ? "text-muted underline" : "collapse"}>
      {I18n.t( "saved_at" )}
      {` ${moment( profile.updated_at ).format( "h:mm a" )}`}
    </div>
    <button
      className={`btn btn-xs ${profile.saved_status === null ? "btn-default" : "btn-primary"}`}
      type="button"
      onClick={saveUserSettings}
    >
      {I18n.t( "save_settings" ).toLocaleUpperCase()}
    </button>
  </div>
);

SaveButton.propTypes = {
  profile: PropTypes.object,
  saveUserSettings: PropTypes.func
};

export default SaveButton;
