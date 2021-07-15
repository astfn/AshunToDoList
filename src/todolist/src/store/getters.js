import { getEventStore, setEventStore, operation } from "./utils.js";

export default {
  getAllEvent(state, getters) {
    return [...getters.getNotFinishEvent, ...getters.getFinishEvent];
  },
  getFinishEvent(state, getters) {
    // return state.EventStore.finish;

    return getEventStore(state).finish;
  },
  getNotFinishEvent(state, getters) {
    // return state.EventStore.notFinish;
    return getEventStore(state).notFinish;
  },
  getIsAdmin(state, getters) {
    return state.EventStore.preset.isAdmin;
  },
  getDeleteBufferArr(state, getters) {
    return state.EventStore.preset.deleteBufferArr;
  }
};
