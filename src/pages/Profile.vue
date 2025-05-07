<template>
  <div class="profile-container">
    <el-page-header @back="goBack" title="返回" content="个人中心" />
    
    <div class="profile-content">
      <!-- 用户信息卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <h2>用户信息</h2>
          </div>
        </template>
        <div class="user-info">
          <p><strong>用户名：</strong>{{ currentUser?.username }}</p>
          <p><strong>注册时间：</strong>{{ formatDate(currentUser?.createdAt) }}</p>
        </div>
      </el-card>

      <!-- 收藏类型卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <h2>收藏类型</h2>
            <el-button type="primary" size="small" @click="showAddGenreDialog = true">
              添加类型
            </el-button>
          </div>
        </template>
        <div class="genres-list">
          <el-tag
            v-for="genre in favoriteGenres"
            :key="genre"
            closable
            @close="removeGenre(genre)"
            class="genre-tag"
          >
            {{ genre }}
          </el-tag>
          <el-empty v-if="!favoriteGenres.length" description="暂无收藏类型" />
        </div>
      </el-card>

      <!-- 已收藏电影卡片 -->
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <h2>已收藏电影</h2>
          </div>
        </template>
        <div class="favorite-movies">
          <el-row :gutter="16">
            <el-col v-for="movieId in favoriteMovies" :key="movieId" :xs="12" :sm="8" :md="6" :lg="4">
              <movie-card :movie="getMovieById(movieId)" />
            </el-col>
          </el-row>
          <el-empty v-if="!favoriteMovies.length" description="暂无收藏电影" />
        </div>
      </el-card>
    </div>

    <!-- 添加类型对话框 -->
    <el-dialog
      v-model="showAddGenreDialog"
      title="添加收藏类型"
      width="30%"
    >
      <el-form>
        <el-form-item label="选择类型">
          <el-select v-model="newGenre" placeholder="请选择类型">
            <el-option
              v-for="genre in availableGenres"
              :key="genre"
              :label="genre"
              :value="genre"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddGenreDialog = false">取消</el-button>
          <el-button type="primary" @click="addGenre">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { useRouter } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import { movies } from '@/mock/movies'

export default {
  name: 'Profile',
  components: {
    MovieCard
  },
  data() {
    return {
      showAddGenreDialog: false,
      newGenre: '',
      availableGenres: [
        '动作', '喜剧', '爱情', '科幻', '动画', '悬疑',
        '恐怖', '纪录片', '冒险', '奇幻', '剧情', '犯罪'
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser', 'favoriteGenres', 'favoriteMovies'])
  },
  methods: {
    ...mapActions('user', ['toggleFavoriteGenre', 'toggleFavoriteMovie']),
    
    goBack() {
      this.$router.back()
    },
    
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString()
    },
    
    getMovieById(movieId) {
      const movie = movies.find(movie => movie.id === movieId)
      if (!movie) {
        return {
          id: movieId,
          title: '未知电影',
          posterUrl: '',
          rating: 0,
          year: '',
          genre: '',
          description: '电影信息不存在'
        }
      }
      return {
        ...movie,
        posterUrl: movie.imageUrl || ''
      }
    },
    
    async addGenre() {
      if (this.newGenre) {
        // 检查是否已经收藏了该类型
        if (this.favoriteGenres.includes(this.newGenre)) {
          this.$message.warning('该类型已经收藏')
          return
        }
        try {
          await this.toggleFavoriteGenre(this.newGenre)
          this.$message.success('添加收藏类型成功')
          this.newGenre = ''
          this.showAddGenreDialog = false
        } catch (error) {
          this.$message.error('添加失败')
        }
      }
    },
    
    async removeGenre(genre) {
      try {
        await this.toggleFavoriteGenre(genre)
        this.$message.success('移除收藏类型成功')
      } catch (error) {
        this.$message.error('移除失败')
      }
    },
    
    async removeFavorite(movieId) {
      try {
        await this.toggleFavoriteMovie(movieId)
        this.$message.success('取消收藏成功')
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-content {
  margin-top: 16px;
  display: grid;
  gap: 16px;
}

.profile-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.user-info {
  line-height: 1.6;
  font-size: 14px;
}

.genres-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.genre-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.favorite-movies {
  margin-top: 16px;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 12px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style> 