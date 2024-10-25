import { login, logout, getInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'// getToken,
import router, { resetRouter } from '@/router'

const state = {
  // token: getToken(),
  code: '',
  userInfo: null, // 用来存储用户信息
  userId: null,
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  SET_CODE: (state, code) => {
    state.code = code
  },
  SET_USER_INFO: (state, user) => {
    // state.userInfo = user
    state.userId = user.userId
    state.name = user.userName
    state.roles = user.userType
    console.log('in user_info_setting', state.roles)
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      // login({ account: account.trim(), password: password }).then(response => {
      login(userInfo).then(response => {
        const { code, data } = response.data
        // commit('SET_TOKEN', data.token)
        commit('SET_CODE', code)
        // commit('SET_USER_INFO', {
        //   userId: data.userId,
        //   userName: data.userName,
        //   userType: data.userType
        // })
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        console.log('gettingInfo: + ', data)
        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        console.log('set_roles', roles)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { roles, name, avatar, introduction } = data

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }
  //       console.log('set_roles', roles)
  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_INTRODUCTION', introduction)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout().then(() => {
      // commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      // removeToken()
      // resetRouter()
      //   // reset visited views and cached views
      //   // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })
      // // 重定向到登录页面
      // router.push('/login')
      // resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      // 清除本地的用户状态
      // commit('SET_ROLES', [])     // 清空 roles
      // commit('SET_USER_INFO', {}) // 设置为空对象而非 null
      // removeToken()               // 清除 localStorage 中的 token

      // 重置路由，防止动态添加的权限路由仍然存在
      resetRouter()

      // 清空标签视图（如果你有使用 tagsView）
      dispatch('tagsView/delAllViews', null, { root: true })
      // 重定向到登录页面
      // router.push({ path: '/login' }).then(() => {
      //   location.reload()  // 手动刷新页面
      // })
      router.push({ path: '/login' })
      location.reload()  // 手动刷新页面
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
