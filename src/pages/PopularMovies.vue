<template>
  <div class="popular-movies">
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <h2>最近热门</h2>
      </template>
    </el-page-header>
    
    <div class="movie-grid">
      <MovieCard
        v-for="movie in popularMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    
    <el-empty v-if="popularMovies.length === 0" description="暂无热门电影" />
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'PopularMovies',
  components: {
    MovieCard
  },
  data() {
    return {
      popularMovies: [
        {
          id: 1,
          title: '热门电影1',
          posterUrl: 'https://example.com/poster1.jpg',
          rating: 4.8,
          year: '2024',
          genre: '动作/冒险',
          description: '这是一部非常受欢迎的电影，讲述了...'
        },
        {
          id: 2,
          title: '热门电影2',
          posterUrl: 'https://example.com/poster2.jpg',
          rating: 4.6,
          year: '2023',
          genre: '科幻/惊悚',
          description: '这是一部备受关注的电影，讲述了...'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    fetchPopularMovies() {
      // TODO: 实现获取热门电影的逻辑
    }
  },
  mounted() {
    this.fetchPopularMovies()
  }
}
</script>

<style scoped>
.popular-movies {
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