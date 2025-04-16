<template>
  <div class="offline-recommend">
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <h2>离线推荐</h2>
      </template>
    </el-page-header>
    
    <div class="movie-grid">
      <MovieCard
        v-for="movie in recommendedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    
    <el-empty v-if="recommendedMovies.length === 0" description="暂无推荐电影" />
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'OfflineRecommend',
  components: {
    MovieCard
  },
  data() {
    return {
      recommendedMovies: [
        {
          id: 1,
          title: '离线推荐电影1',
          posterUrl: 'https://example.com/poster1.jpg',
          rating: 4.5,
          year: '2024',
          genre: '动作/冒险',
          description: '这是一部精彩的电影，讲述了...'
        },
        {
          id: 2,
          title: '离线推荐电影2',
          posterUrl: 'https://example.com/poster2.jpg',
          rating: 4.2,
          year: '2023',
          genre: '科幻/惊悚',
          description: '这是一部引人入胜的电影，讲述了...'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    fetchRecommendations() {
      // TODO: 实现获取离线推荐的逻辑
    }
  },
  mounted() {
    this.fetchRecommendations()
  }
}
</script>

<style scoped>
.offline-recommend {
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 20px 0;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

@media (max-width: 1600px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 