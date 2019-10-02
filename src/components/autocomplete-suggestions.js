import React from "react";

const AutocompleteSuggestions = props => {
  const { suggestions, handleSuggestionClick } = props;

  return (
    <div className="input__autocomplete-suggestions">
      {suggestions.map((suggestion, i) => (
        <h6
          className="h6 input__autocomplete-suggestion"
          key={i}
          onClick={() => handleSuggestionClick(suggestion.description)}
        >
          {suggestion.description}
        </h6>
      ))}
    </div>
  );
};

export default AutocompleteSuggestions;
