import vuex from "vuex";
import Vue from "vue";

import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

Vue.use(vuex);

const state = {
  EventStore: {
    preset: {
      isAdmin: false, //Admin,User
      direction: {
        Finish: "firstNotFinish", //firstFinish
        Date: `Increasing` //decreasing
      },
      deleteBufferArr: [],
      AdminData: {}
    },
    finish: [],
    /*
      [{id,isFinish,content}]
    */
    notFinish: []
  }
};

export default new vuex.Store({
  state,
  actions,
  mutations,
  getters
});
