const objectMatches = (object, other) => {
  return Object.keys(object).every(
    key => other.hasOwnProperty(key) && object[key] === other[key]
  );
};

export { objectMatches };
