import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import  { resetRouter } from '@/router/router'

const state = {
  token: getToken()
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === '111111') {
        commit('SET_TOKEN', 'token-13299876');
        setToken('token-13299876');
        resolve();
      }else {
        reject()
      }
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response;
      //   commit('SET_TOKEN', data.token);
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        removeToken();
        resetRouter();
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
