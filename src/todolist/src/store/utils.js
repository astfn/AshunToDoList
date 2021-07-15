export { getEventStore, setEventStore, operation };
function getEventStore(state) {
  if (
    localStorage.getItem("EventStore") !== "undefined" &&
    localStorage.getItem("EventStore") != null
  ) {
    let localEventStore = JSON.parse(localStorage.getItem("EventStore"));
    if (JSON.stringify(state.EventStore) !== JSON.stringify(localEventStore)) {
      state.EventStore = localEventStore;
    }
    // console.log(JSON.parse(localStorage.getItem("EventStore")));
    // console.log(state.EventStore);
    return localEventStore;
  } else {
    setEventStore(state, state.EventStore);
    return state.EventStore;
  }
}
function setEventStore(state, EventStore) {
  return new Promise((resolve, reject) => {
    localStorage.setItem("EventStore", JSON.stringify(EventStore));
    resolve(getEventStore(state));
  });
}
function operation(state, callback) {
  let EventStore = getEventStore(state);
  callback(EventStore);
  setEventStore(state, EventStore).then(EventStore => {
    //让state中的数据保持同步，保证各个组件中能够访问
    state.EventStore = EventStore;
    // console.log(JSON.stringify(state.EventStore) == JSON.stringify(EventStore));
  });
}
