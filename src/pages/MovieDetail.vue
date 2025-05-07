<template>
  <div class="movie-detail" v-if="movie">
    <el-page-header @back="goBack" :title="movie.title">
      <template #content>
        <span class="movie-title">{{ movie.title }}</span>
      </template>
    </el-page-header>

    <div class="movie-content">
      <div class="movie-poster">
        <el-image
          :src="movie.imageUrl"
          :alt="movie.title"
          fit="cover"
        >
          <template #error>
            <div class="image-placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>

      <div class="movie-info">
        <div class="info-section">
          <h2 class="section-title">基本信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">导演：</span>
              <span class="value">{{ movie.director }}</span>
            </div>
            <div class="info-item">
              <span class="label">年份：</span>
              <span class="value">{{ movie.year }}</span>
            </div>
            <div class="info-item">
              <span class="label">时长：</span>
              <span class="value">{{ movie.duration }}</span>
            </div>
            <div class="info-item">
              <span class="label">语言：</span>
              <span class="value">{{ movie.language }}</span>
            </div>
            <div class="info-item">
              <span class="label">类型：</span>
              <span class="value">{{ movie.genre.join(' / ') }}</span>
            </div>
            <div class="info-item">
              <span class="label">评分：</span>
              <span class="value">
                <el-rate
                  v-model="movie.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </span>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h2 class="section-title">剧情简介</h2>
          <p class="description">{{ movie.description }}</p>
        </div>

        <div class="info-section">
          <h2 class="section-title">演职人员</h2>
          <div class="actors-list">
            <el-tag
              v-for="actor in movie.actors"
              :key="actor"
              class="actor-tag"
            >
              {{ actor }}
            </el-tag>
          </div>
        </div>

        <div class="action-buttons">
          <el-button
            type="primary"
            :icon="isFavorite ? 'Star' : 'StarFilled'"
            :class="{ 'is-liked': isFavorite }"
            @click="handleFavorite"
          >
            {{ isFavorite ? '取消收藏' : '收藏' }}
          </el-button>
          <el-button type="success" icon="VideoPlay">
            观看预告片
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <el-empty v-else description="未找到电影信息" />
</template>

<script>
import { movies } from '../mock/movies'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: null
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'favoriteMovies']),
    isFavorite() {
      return this.favoriteMovies.includes(this.movie?.id)
    }
  },
  created() {
    const movieId = parseInt(this.$route.params.id)
    this.movie = movies.find(m => m.id === movieId)
  },
  methods: {
    ...mapActions('user', ['toggleFavoriteMovie']),
    goBack() {
      this.$router.back()
    },
    async handleFavorite() {
      if (!this.isLoggedIn) {
        this.$message.warning('请先登录')
        return
      }
      
      try {
        await this.toggleFavoriteMovie(this.movie)
        this.$message.success(!this.isFavorite ? '已收藏' : '已取消收藏')
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.movie-title {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.movie-content {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
}

.movie-poster {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.movie-poster .el-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.movie-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-section {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  color: #909399;
  font-size: 14px;
}

.value {
  color: #303133;
  font-size: 14px;
}

.description {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.6;
}

.actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.actor-tag {
  font-size: 13px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.action-buttons .el-button.is-liked {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

.action-buttons .el-button.is-liked:hover {
  background-color: #ff7875;
  border-color: #ff7875;
}

@media (max-width: 768px) {
  .movie-content {
    grid-template-columns: 1fr;
  }

  .movie-poster .el-image {
    height: 300px;
  }

  .image-placeholder {
    height: 300px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style> 