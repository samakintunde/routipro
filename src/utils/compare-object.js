const objectMatches = (object, other) => {
  return Object.keys(object).every(
    key => other.hasOwnProperty(key) && object[key] === other[key]
  );
};

const makeObjectsOfArrayUnique = (arr, property) => {
  const result = [];
  const map = new Map();

  for (const element of arr) {
    if (!map.has(element[property])) {
      map.set(element[property], true);
      result.push(element);
    }
  }

  return result;
};

export { objectMatches, makeObjectsOfArrayUnique };
