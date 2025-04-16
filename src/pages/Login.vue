<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <h1>电影推荐系统</h1>
        <p class="description">发现你喜欢的电影，获取个性化推荐</p>
        <div class="features">
          <div class="feature-item">
            <el-icon><VideoPlay /></el-icon>
            <span>实时推荐</span>
          </div>
          <div class="feature-item">
            <el-icon><Star /></el-icon>
            <span>热门电影</span>
          </div>
          <div class="feature-item">
            <el-icon><User /></el-icon>
            <span>个性化推荐</span>
          </div>
        </div>
      </div>
      
      <el-card class="login-card">
        <template #header>
          <div class="card-header">
            <h2>欢迎登录</h2>
            <p class="subtitle">登录以获取个性化推荐</p>
          </div>
        </template>
        
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleLogin"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
            />
          </el-form-item>
          
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
              size="large"
            />
          </el-form-item>
          
          <div class="form-options">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <router-link to="/forgot-password" class="forgot-password">忘记密码？</router-link>
          </div>
          
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              class="login-button"
              :loading="loading"
              size="large"
            >
              登录
            </el-button>
          </el-form-item>
          
          <div class="register-link">
            还没有账号？
            <router-link to="/register">立即注册</router-link>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      rememberMe: false
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        // TODO: 实现登录逻辑
        console.log('登录表单数据:', this.loginForm)
      } catch (error) {
        console.error('表单验证失败:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
  opacity: 0.1;
  z-index: 0;
}

.login-content {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  max-height: 90vh;
  position: relative;
  z-index: 1;
  align-items: center;
}

.login-left {
  flex: 1;
  color: #2c3e50;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.login-left h1 {
  font-size: clamp(32px, 4vw, 48px);
  margin: 0 0 16px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: clamp(16px, 2vw, 20px);
  margin-bottom: 24px;
  color: #34495e;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(14px, 1.5vw, 18px);
  color: #2c3e50;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item .el-icon {
  font-size: 24px;
  color: #3498db;
}

.login-card {
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  border: none;
}

.card-header {
  text-align: center;
  padding: 0 20px;
}

.card-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}

.subtitle {
  margin: 12px 0 0;
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.5;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.forgot-password {
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #2980b9;
}

.login-button {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
}

.register-link {
  text-align: center;
  margin-top: 24px;
  color: #7f8c8d;
  font-size: 14px;
  line-height: 1.5;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #2980b9;
}

@media (max-width: 992px) {
  .login-content {
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 16px;
  }
  
  .login-left {
    text-align: center;
    padding: 10px;
    height: auto;
  }
  
  .login-left h1 {
    font-size: 32px;
  }
  
  .description {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .features {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-height: 700px) {
  .login-left h1 {
    font-size: 28px;
    margin-bottom: 12px;
  }
  
  .description {
    font-size: 14px;
    margin-bottom: 16px;
  }
  
  .feature-item {
    padding: 8px;
    font-size: 14px;
  }
  
  .card-header h2 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
    margin-top: 8px;
  }
}
</style> 