import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    list: null,
    listCurPage: 0,
    listSize: 10,
    listStatus: null,
    listSearch: null,
    totalPages: 0,
    totalElements: 0,
    statusItems: [
      "NEW",
      "DISMISSED",
      "IN_PROGRESS",
      "ESTIMATE_SCHEDULED",
      "PENDING_ACCEPTANCE",
      "SERVICE_SCHEDULED",
      "COMPLETED",
      "LOST",
    ],
  },
  mutations: {
    SET_AUTH(state, payload) {
      state.isAuthenticated = payload;
    },
    SET_LIST(state, payload) {
      state.list = Object.freeze(payload.data.items);
      state.totalPages = payload.data.totalPages;
      state.totalElements = payload.data.totalElements;
    },
    SET_LIST_FILTER(state, payload) {
      state[payload.name] = payload.value;
    },
  },
  actions: {
    async serverRequestPOST({}, payload) {
      let result = "";
      const requestData =
        payload.contentType === "application/x-www-form-urlencoded"
          ? qs.stringify(payload.value)
          : payload.value;
      await axios
        .post(
          `https://test-contractorfinder.bradfordwhite.com/${payload.target}`,
          requestData,
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "FROM-ANGULAR": true,
              "Content-Type": payload.contentType,
            },
          }
        )
        .then((res) => {
          result = res.data.result === "SUCCESS" ? res.data : false;
        })
        .catch((error) => {
          console.log(error);
          result = false;
        });
      return result;
    },

    async serverRequestGET({}, payload) {
      let result = "";
      await axios
        .get(
          `https://test-contractorfinder.bradfordwhite.com/${payload.target}`,
          {
            params: payload.value,
            withCredentials: true,
            headers: {
              "FROM-ANGULAR": true,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          result = res.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
      return result;
    },

    async login({ dispatch, commit }, payload) {
      const request = {
        target: "j_spring_security_check",
        contentType: "application/x-www-form-urlencoded",
        value: {
          j_username: payload.j_username,
          j_password: payload.j_password,
        },
      };
      const res = await dispatch("serverRequestPOST", request);
      if (res.result === "SUCCESS") {
        commit("SET_AUTH", true);
        return true;
      }
      return false;
    },

    async logOut({ dispatch, commit }) {
      const request = {
        target: "j_spring_security_logout",
        value: {},
      };
      const res = await dispatch("serverRequestGET", request);
      if (res.result === "SUCCESS") {
        commit("SET_AUTH", false);
        return true;
      }
      return false;
    },

    async getList({ state, dispatch, commit }) {
      const request = {
        target: "api/v2/contrlead/list",
        value: {
          page: state.listCurPage,
          size: state.listSize,
          status: state.listStatus,
          search: state.listSearch,
        },
      };
      const res = await dispatch("serverRequestGET", request);
      if (res.result === "SUCCESS") {
        commit("SET_LIST", res);
        return true;
      }
      return false;
    },

    async getDetailed({ dispatch }, payload) {
      const request = {
        target: `api/v2/contrlead/${payload}`,
        value: {},
      };
      const res = await dispatch("serverRequestGET", request);
      if (res.result === "SUCCESS") {
        return res.data;
      }
      return false;
    },

    async updateData({ dispatch, commit }, payload) {
      const request = {
        target: `api/v2/contrlead`,
        contentType: "application/json",
        value: payload,
      };
      const res = await dispatch("serverRequestPOST", request);
      if (res.result === "SUCCESS") {
        return res.data;
      }
      return false;
    },
  },
  modules: {},
});
