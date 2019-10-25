const searchOptions = {
  key: "name",
  threshhold: -500
};

self.onmessage = e => {
  console.log("from worker", e);
  self.postMessage("done");
  // fuzzysort.go()
};
