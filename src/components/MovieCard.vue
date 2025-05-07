<template>
  <el-card 
    class="movie-card" 
    :body-style="{ padding: '0px' }"
    @click="handleCardClick"
  >
    <div class="movie-poster">
      <el-image
        :src="movie.posterUrl"
        :alt="movie.title"
        fit="cover"
        loading="lazy"
      >
        <template #error>
          <div class="image-placeholder">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="movie-rating">
        <el-rate
          :model-value="Number(movie.rating)"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
      </div>
    </div>
    
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <div class="movie-meta">
        <span class="movie-year">
          <el-icon><Calendar /></el-icon>
          {{ movie.year }}
        </span>
        <span class="movie-genre">
          <el-icon><Collection /></el-icon>
          {{ movie.genre }}
        </span>
      </div>
      <p class="movie-description">{{ movie.description }}</p>
      
      <div class="movie-actions" @click.stop>
        <el-button
          type="primary"
          :icon="isLiked ? 'Star' : 'StarFilled'"
          :class="{ 'is-liked': isLiked }"
          @click="handleLike"
        >
          {{ isLiked ? '已收藏' : '收藏' }}
        </el-button>
        <el-button
          type="info"
          icon="View"
          @click="handleDetails"
        >
          详情
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        title: '',
        posterUrl: '',
        rating: 0,
        year: '',
        genre: '',
        description: ''
      })
    }
  },
  data() {
    return {
      isLiked: false
    }
  },
  methods: {
    handleLike() {
      this.isLiked = !this.isLiked
      // TODO: 实现收藏逻辑
    },
    handleDetails() {
      this.$router.push(`/movie/${this.movie.id}`)
    },
    handleCardClick() {
      this.handleDetails()
    }
  }
}
</script>

<style scoped>
.movie-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.movie-poster {
  position: relative;
  padding-top: 140%;
}

.movie-poster .el-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.movie-rating {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.movie-rating :deep(.el-rate) {
  display: flex;
  align-items: center;
}

.movie-rating :deep(.el-rate__text) {
  color: #fff;
  margin-left: 4px;
  font-size: 12px;
}

.movie-info {
  padding: 12px;
}

.movie-title {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-meta {
  display: flex;
  gap: 8px;
  margin: 4px 0;
  color: #909399;
  font-size: 12px;
}

.movie-meta span {
  display: flex;
  align-items: center;
}

.movie-meta .el-icon {
  margin-right: 2px;
  font-size: 12px;
}

.movie-description {
  margin: 4px 0;
  color: #606266;
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  height: 34px;
}

.movie-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.movie-actions .el-button {
  padding: 4px 8px;
  font-size: 12px;
}

.movie-actions .el-icon {
  font-size: 12px;
}

.movie-actions .el-button.is-liked {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

.movie-actions .el-button.is-liked:hover {
  background-color: #ff7875;
  border-color: #ff7875;
}
</style> 