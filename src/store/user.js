// 用户管理store
const STORAGE_KEY = 'movie_recommender_users'
const CURRENT_USER_KEY = 'movie_recommender_current_user'

// 预设用户数据
const DEFAULT_USERS = [
  {
    username: 'admin',
    password: '123456',
    watchHistory: [],
    favoriteGenres: ['动作', '科幻'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    username: 'test',
    password: '123456',
    watchHistory: [],
    favoriteGenres: ['喜剧', '爱情'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    username: 'user',
    password: '123456',
    watchHistory: [],
    favoriteGenres: ['动画', '冒险'],
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]

const state = {
  users: JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_USERS)),
  currentUser: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null')
}

const mutations = {
  setUsers(state, users) {
    state.users = users
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  },
  setCurrentUser(state, user) {
    state.currentUser = user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  },
  addUser(state, user) {
    state.users.push(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.users))
  },
  updateUser(state, updatedUser) {
    const index = state.users.findIndex(u => u.username === updatedUser.username)
    if (index !== -1) {
      state.users[index] = updatedUser
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.users))
    }
  }
}

const actions = {
  register({ commit }, userData) {
    return new Promise((resolve, reject) => {
      // 检查用户名是否已存在
      const existingUser = state.users.find(u => u.username === userData.username)
      if (existingUser) {
        reject(new Error('用户名已存在'))
        return
      }

      // 创建新用户
      const newUser = {
        username: userData.username,
        password: userData.password,
        watchHistory: [],
        favoriteGenres: [],
        createdAt: new Date().toISOString()
      }

      commit('addUser', newUser)
      resolve(newUser)
    })
  },

  login({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      const user = state.users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      )

      if (user) {
        // 创建一个不包含密码的用户对象
        const userWithoutPassword = {
          ...user,
          password: undefined
        }
        // 保存到 localStorage 和 Vuex store
        commit('setCurrentUser', userWithoutPassword)
        resolve(userWithoutPassword)
      } else {
        reject(new Error('用户名或密码错误'))
      }
    })
  },

  logout({ commit }) {
    commit('setCurrentUser', null)
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  updateUserProfile({ commit }, userData) {
    return new Promise((resolve) => {
      commit('updateUser', userData)
      if (state.currentUser?.username === userData.username) {
        commit('setCurrentUser', userData)
      }
      resolve(userData)
    })
  },

  addToWatchHistory({ commit }, movieId) {
    if (!state.currentUser) return

    const user = { ...state.currentUser }
    if (!user.watchHistory.includes(movieId)) {
      user.watchHistory.push(movieId)
      commit('updateUser', user)
      commit('setCurrentUser', user)
    }
  },

  toggleFavoriteGenre({ commit, state }, genre) {
    if (!state.currentUser) return

    // 创建一个新的用户对象，确保响应式更新
    const user = {
      ...state.currentUser,
      favoriteGenres: [...(state.currentUser.favoriteGenres || [])]
    }
    
    const index = user.favoriteGenres.indexOf(genre)
    if (index === -1) {
      user.favoriteGenres.push(genre)
    } else {
      user.favoriteGenres.splice(index, 1)
    }

    // 先更新用户列表中的用户数据
    const users = state.users.map(u => 
      u.username === user.username ? { ...u, favoriteGenres: user.favoriteGenres } : u
    )
    commit('setUsers', users)
    
    // 然后更新当前用户
    commit('setCurrentUser', user)
  },

  toggleFavoriteMovie({ commit, state }, movie) {
    if (!state.currentUser) return

    // 创建一个新的用户对象，确保响应式更新
    const user = {
      ...state.currentUser,
      favoriteMovies: [...(state.currentUser.favoriteMovies || [])]
    }
    
    const index = user.favoriteMovies.indexOf(movie.id)
    if (index === -1) {
      user.favoriteMovies.push(movie.id)
    } else {
      user.favoriteMovies.splice(index, 1)
    }

    // 先更新用户列表中的用户数据
    const users = state.users.map(u => 
      u.username === user.username ? { ...u, favoriteMovies: user.favoriteMovies } : u
    )
    commit('setUsers', users)
    
    // 然后更新当前用户
    commit('setCurrentUser', user)
  },

  isMovieFavorited({ state }, movieId) {
    return state.currentUser?.favoriteMovies?.includes(movieId) || false
  }
}

const getters = {
  isLoggedIn: state => !!state.currentUser,
  currentUser: state => state.currentUser,
  watchHistory: state => state.currentUser?.watchHistory || [],
  favoriteMovies: state => state.currentUser?.favoriteMovies || [],
  favoriteGenres: state => state.currentUser?.favoriteGenres || []
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 