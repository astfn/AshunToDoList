export default {
  changeState(context, payload) {
    let id = payload.id;
    payload.isFinish = !payload.isFinish;
    if (payload.isFinish) {
      let index = context.state.EventStore.notFinish.findIndex(v => v.id == id);
      context.commit("rmNotFinish", index);
      context.commit("addFinish", payload);
    } else {
      let index = context.state.EventStore.finish.findIndex(v => v.id == id);
      context.commit("rmFinish", index);
      context.commit("addNotFinish", payload);
    }
  }
};
