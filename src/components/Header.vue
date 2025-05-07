<template>
  <header class="header">
    <div class="header-content">
      <div class="logo" @click="$router.push('/')">
        <span>电影推荐系统</span>
      </div>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">热门推荐</router-link>
        <router-link to="/realtime" class="nav-link">实时推荐</router-link>
        <router-link to="/offline" class="nav-link">离线推荐</router-link>
      </div>
      
      <div class="user-section">
        <template v-if="isLoggedIn">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              {{ currentUser.username }}
              <el-icon><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <router-link to="/login" class="login-btn">登录/注册</router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ArrowDown } from '@element-plus/icons-vue'

export default {
  name: 'Header',
  components: {
    ArrowDown
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'currentUser'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    
    async handleCommand(command) {
      if (command === 'logout') {
        try {
          await this.logout()
          this.$message.success('已退出登录')
          this.$router.push('/login')
        } catch (error) {
          this.$message.error('退出失败')
        }
      } else if (command === 'profile') {
        this.$router.push('/profile')
      }
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
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.header-content {
  max-width: 1600px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo span {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #606266;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #409EFF;
  background-color: #ecf5ff;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}

.user-info .el-icon {
  margin-left: 4px;
}

.login-btn {
  text-decoration: none;
  color: #409EFF;
  font-size: 14px;
  padding: 8px 16px;
  border: 1px solid #409EFF;
  border-radius: 4px;
  transition: all 0.3s;
}

.login-btn:hover {
  color: #fff;
  background-color: #409EFF;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 10px;
  }
  
  .logo span {
    display: none;
  }
  
  .nav-links {
    gap: 10px;
  }
  
  .nav-link {
    font-size: 14px;
    padding: 6px 8px;
  }
}
</style> 