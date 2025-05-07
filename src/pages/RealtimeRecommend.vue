<template>
  <div class="realtime-recommend">
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <h2>实时推荐</h2>
      </template>
    </el-page-header>
    
    <div class="movie-grid">
      <el-row :gutter="16">
        <el-col
          v-for="movie in recommendedMovies"
          :key="movie.id"
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="4"
        >
          <movie-card
            :movie="{
              id: movie.id,
              title: movie.title,
              posterUrl: movie.imageUrl,
              rating: movie.rating,
              year: movie.year,
              genre: Array.isArray(movie.genre) ? movie.genre.join(' / ') : '未知类型',
              description: movie.description
            }"
            class="movie-item"
          />
        </el-col>
      </el-row>
    </div>
    
    <div class="button-container">
      <el-button type="primary" @click="refreshMovies">换一批</el-button>
    </div>
    
    <el-empty v-if="recommendedMovies.length === 0" description="暂无推荐电影" />
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'
import { movies } from '../mock/movies'

export default {
  name: 'RealtimeRecommend',
  components: {
    MovieCard
  },
  data() {
    return {
      recommendedMovies: movies.slice(0, 6), // 初始显示前6部电影
      allMovies: movies,
      isFirstLoad: true
    }
  },
  activated() {
    // 只在第一次加载时设置电影列表
    if (this.isFirstLoad) {
      this.recommendedMovies = movies.slice(0, 6)
      this.isFirstLoad = false
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    refreshMovies() {
      // 随机打乱电影数组
      const shuffled = [...this.allMovies].sort(() => 0.5 - Math.random())
      // 取前6部电影
      this.recommendedMovies = shuffled.slice(0, 6)
    }
  }
}
</script>

<style scoped>
.realtime-recommend {
  padding: 20px;
}

.movie-grid {
  padding: 20px 0;
}

.movie-item {
  margin-bottom: 16px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

@media (max-width: 1600px) {
  .movie-item {
    margin-bottom: 14px;
  }
}

@media (max-width: 1200px) {
  .movie-item {
    margin-bottom: 12px;
  }
}
</style> 