<template>
  <div class="guide-container">
    <div class="guide-content">
      <h1>欢迎使用电影推荐系统</h1>
      <p class="subtitle">请选择您感兴趣的电影类型，我们将为您提供个性化推荐</p>
      
      <div class="genres-grid">
        <el-checkbox-group v-model="selectedGenres">
          <el-checkbox 
            v-for="genre in availableGenres" 
            :key="genre"
            :label="genre"
            class="genre-checkbox"
          >
            {{ genre }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="actions">
        <el-button 
          type="primary" 
          size="large"
          :disabled="selectedGenres.length === 0"
          @click="handleSubmit"
        >
          开始探索
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserGuide',
  data() {
    return {
      selectedGenres: [],
      availableGenres: [
        '动作', '喜剧', '爱情', '科幻', '动画', '悬疑',
        '恐怖', '纪录片', '冒险', '奇幻', '剧情', '犯罪'
      ]
    }
  },
  methods: {
    ...mapActions('user', ['toggleFavoriteGenre']),
    
    async handleSubmit() {
      try {
        // 为每个选中的类型调用 toggleFavoriteGenre
        for (const genre of this.selectedGenres) {
          await this.toggleFavoriteGenre(genre)
        }
        
        this.$message.success('设置成功')
        this.$router.push('/')
      } catch (error) {
        this.$message.error('设置失败，请重试')
      }
    }
  }
}
</script>

<style scoped>
.guide-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
}

.guide-content {
  max-width: 800px;
  width: 100%;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 28px;
  color: #303133;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 16px;
  color: #606266;
  margin-bottom: 40px;
}

.genres-grid {
  margin: 40px 0;
}

.genre-checkbox {
  margin: 12px;
  padding: 12px 24px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: all 0.3s;
}

.genre-checkbox:hover {
  border-color: #409EFF;
  color: #409EFF;
}

.genre-checkbox.is-checked {
  background-color: #ecf5ff;
  border-color: #409EFF;
  color: #409EFF;
}

.actions {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .guide-content {
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .genre-checkbox {
    margin: 8px;
    padding: 8px 16px;
  }
}
</style> 