import React from "react";

const AutocompleteSuggestions = props => {
  const { suggestions, handleClick } = props;

  return (
    <div className="input__autocomplete-suggestions">
      {suggestions.map((suggestion, i) => (
        <h6
          className="h6 input__autocomplete-suggestion"
          key={i}
          onClick={e => handleClick(suggestion)}
        >
          {suggestion.description}
        </h6>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
