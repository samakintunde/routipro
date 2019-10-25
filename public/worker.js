const searchOptions = {
  key: "name",
  threshhold: -500
};

self.onmessage = e => {
  const fuzzysort = e.data.fn;
  const stops = e.data.stops;
  const query = e.data.value;

  console.log("data", e.data);

  const searchResults = fuzzysort(query, stops, searchOptions);

  self.postMessage(searchResults);
};
