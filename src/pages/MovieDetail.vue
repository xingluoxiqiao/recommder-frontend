<template>
  <div class="movie-detail">
    <!-- 电影详细信息部分 -->
    <div class="movie-info">
      <div class="movie-poster">
        <el-image 
          :src="movie.poster" 
          fit="cover"
          :preview-src-list="[movie.poster]"
        >
          <template #error>
            <div class="image-placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
      
      <div class="movie-content">
        <h1 class="movie-title">{{ movie.title }}</h1>
        
        <div class="movie-meta">
          <div class="rating">
            <el-rate
              v-model="movie.rating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
            <span class="rating-count">{{ movie.ratingCount }} 人评分</span>
          </div>
          
          <div class="tags">
            <el-tag v-for="tag in movie.tags" :key="tag" class="tag">{{ tag }}</el-tag>
          </div>
          
          <div class="info-list">
            <div class="info-item">
              <span class="label">导演：</span>
              <span class="value">{{ movie.director }}</span>
            </div>
            <div class="info-item">
              <span class="label">主演：</span>
              <span class="value">{{ movie.actors.join(' / ') }}</span>
            </div>
            <div class="info-item">
              <span class="label">类型：</span>
              <span class="value">{{ movie.genres.join(' / ') }}</span>
            </div>
            <div class="info-item">
              <span class="label">地区：</span>
              <span class="value">{{ movie.region }}</span>
            </div>
            <div class="info-item">
              <span class="label">上映时间：</span>
              <span class="value">{{ movie.releaseDate }}</span>
            </div>
            <div class="info-item">
              <span class="label">片长：</span>
              <span class="value">{{ movie.duration }}分钟</span>
            </div>
          </div>
        </div>
        
        <div class="movie-description">
          <h3>剧情简介</h3>
          <p>{{ movie.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 相似电影推荐部分 -->
    <div class="similar-movies">
      <h2>相似电影推荐</h2>
      <div class="movie-grid">
        <MovieCard
          v-for="movie in similarMovies"
          :key="movie.id"
          :movie="movie"
          @click="handleMovieClick(movie.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from '../components/MovieCard.vue'
import { Picture } from '@element-plus/icons-vue'

export default {
  name: 'MovieDetail',
  components: {
    MovieCard,
    Picture
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const movieId = route.params.id
    
    const movie = ref({
      id: 1,
      title: '电影标题',
      poster: 'https://example.com/poster.jpg',
      rating: 4.5,
      ratingCount: 1000,
      tags: ['热门', '高分'],
      director: '导演姓名',
      actors: ['演员1', '演员2', '演员3'],
      genres: ['剧情', '动作', '科幻'],
      region: '中国大陆',
      releaseDate: '2023-01-01',
      duration: 120,
      description: '这是一段电影简介...'
    })
    
    const similarMovies = ref([
      {
        id: 2,
        title: '相似电影1',
        poster: 'https://example.com/poster1.jpg',
        rating: 4.3,
        ratingCount: 800
      },
      {
        id: 3,
        title: '相似电影2',
        poster: 'https://example.com/poster2.jpg',
        rating: 4.2,
        ratingCount: 700
      },
      {
        id: 4,
        title: '相似电影3',
        poster: 'https://example.com/poster3.jpg',
        rating: 4.1,
        ratingCount: 600
      }
    ])
    
    const handleMovieClick = (id) => {
      router.push(`/movie/${id}`)
    }
    
    onMounted(() => {
      // TODO: 根据movieId获取电影详情和相似电影
      console.log('获取电影详情:', movieId)
    })
    
    return {
      movie,
      similarMovies,
      handleMovieClick
    }
  }
}
</script>

<style scoped>
.movie-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.movie-info {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
}

.movie-poster {
  width: 300px;
  flex-shrink: 0;
}

.movie-poster .el-image {
  width: 100%;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.movie-content {
  flex: 1;
}

.movie-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #2c3e50;
}

.movie-meta {
  margin-bottom: 24px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.rating-count {
  color: #909399;
  font-size: 14px;
}

.tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  font-size: 14px;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  gap: 8px;
}

.info-item .label {
  color: #909399;
  min-width: 80px;
}

.info-item .value {
  color: #2c3e50;
}

.movie-description {
  margin-top: 24px;
}

.movie-description h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #2c3e50;
}

.movie-description p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

.similar-movies {
  margin-top: 32px;
}

.similar-movies h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px;
  color: #2c3e50;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
}

@media (max-width: 992px) {
  .movie-info {
    flex-direction: column;
    gap: 24px;
  }
  
  .movie-poster {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .info-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .movie-detail {
    padding: 16px;
  }
  
  .movie-title {
    font-size: 24px;
  }
  
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
}
</style> 