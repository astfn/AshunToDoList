import { getEventStore, setEventStore, operation } from "./utils.js";
export default {
  //未完成事件
  addNotFinish(state, payload) {
    // state.EventStore.notFinish.push(payload);
    operation(state, EventStore => {
      EventStore.notFinish.push(payload);
    });
  },
  rmNotFinish(state, index) {
    // state.EventStore.notFinish.splice(index, 1);
    operation(state, EventStore => {
      EventStore.notFinish.splice(index, 1);
    });
  },
  //完成事件
  addFinish(state, payload) {
    // state.EventStore.finish.push(payload);
    operation(state, EventStore => {
      EventStore.finish.push(payload);
    });
  },
  rmFinish(state, index) {
    // state.EventStore.finish.splice(index, 1);
    operation(state, EventStore => {
      EventStore.finish.splice(index, 1);
    });
  },
  //改变模式
  changeMode(state, isAdmin) {
    operation(state, EventStore => {
      EventStore.preset.isAdmin = isAdmin;
      //再次Admin模式，清空删除选项的缓存区。
      isAdmin && (EventStore.preset.deleteBufferArr = []);
    });
  },
  //删除选项的缓冲区,添加选项
  deleteBufferAdd(state, payload) {
    operation(state, EventStore => {
      EventStore.preset.deleteBufferArr.push(payload);
    });
  },

  //删除选项的缓冲区,删除选项
  deleteBufferSub(state, payload) {
    operation(state, EventStore => {
      let isContain = EventStore.preset.deleteBufferArr.findIndex(
        v => v.id == payload.id
      );
      if (isContain >= 0) {
        EventStore.preset.deleteBufferArr.splice(isContain, 1);
      }
    });
  },

  //删除所选项
  deleteSelect(state) {
    operation(state, EventStore => {
      EventStore.preset.deleteBufferArr.forEach(Event => {
        if (Event.isFinish) {
          let index = EventStore.finish.findIndex(v => v.id === Event.id);
          // console.log("删除已经完成todo");
          EventStore.finish.splice(index, 1);
        } else {
          // console.log("删除还未完成的todo");
          let index = EventStore.notFinish.findIndex(v => v.id === Event.id);
          EventStore.notFinish.splice(index, 1);
        }
      });
    });
  },
  //将local storage数据更新到vuex
  updateStore(state, getters) {
    state.EventStore = getEventStore(state.EventStore);
  }
};
