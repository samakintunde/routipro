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
    if (value) {
      handleSuggestion(name, {});
    }
    setFocused(!focused);
  };

  const handleSuggestionClick = suggestion => {
    setFocused(false);
    handleSuggestion(name, suggestion);
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
      />
      {focused && (
        <AutocompleteSuggestions
          suggestions={suggestions}
          handleClick={handleSuggestionClick}
        />
      )}
    </div>
  );
};

export default Input;
