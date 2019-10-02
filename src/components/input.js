import React, { useState } from "react";
import AutocompleteSuggestions from "./autocomplete-suggestions";

const Input = props => {
  const [focused, setFocused] = useState(false);
  const {
    id,
    name,
    suggestions,
    type,
    value,
    handleInput,
    handleSuggestion
  } = props;

  const handleFocus = e => {
    setFocused(!focused);

    // handleSuggestion(name, {});
  };

  /**
   * Passes the value of the suggestion to it's parent
   * @param {String} suggestion A suggestion description
   */
  const handleSuggestionClick = suggestion => {
    // setFocused(true);
    handleSuggestion(name, suggestion);
    setFocused(false);
  };

  return (
    <div className="input input--with-autocomplete">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleInput}
        onFocus={handleFocus}
        autoComplete="off"
        // onBlur={handleFocus}
      />
      {focused && (
        <AutocompleteSuggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default Input;
