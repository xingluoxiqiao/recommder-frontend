<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <el-icon class="logo-icon"><Film /></el-icon>
          <span>电影推荐系统</span>
        </router-link>
      </div>
      
      <div class="nav-links">
        <router-link to="/realtime">
          <el-button type="text">
            <el-icon><VideoPlay /></el-icon>
            实时推荐
          </el-button>
        </router-link>
        <router-link to="/offline">
          <el-button type="text">
            <el-icon><Clock /></el-icon>
            离线推荐
          </el-button>
        </router-link>
        <router-link to="/popular">
          <el-button type="text">
            <el-icon><Star /></el-icon>
            热门电影
          </el-button>
        </router-link>
      </div>
      
      <div class="user-actions">
        <template v-if="isLoggedIn">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" :src="userAvatar" />
              <span class="username">{{ username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon><User /></el-icon>
                  个人中心
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login">
            <el-button type="text">
              <el-icon><User /></el-icon>
              登录
            </el-button>
          </router-link>
          <router-link to="/register">
            <el-button type="primary" plain>
              <el-icon><Edit /></el-icon>
              注册
            </el-button>
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      username: '用户名',
      userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    handleLogout() {
      // TODO: 实现退出登录逻辑
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #303133;
}

.logo-icon {
  font-size: 24px;
  margin-right: 8px;
  color: #409eff;
}

.logo span {
  font-size: 18px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
}

.nav-links .el-button {
  padding: 0 12px;
}

.nav-links .el-icon {
  margin-right: 4px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.username {
  margin-left: 8px;
  color: #606266;
}

.el-dropdown-menu .el-icon {
  margin-right: 8px;
}
</style> 