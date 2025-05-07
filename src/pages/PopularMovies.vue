<template>
  <div class="popular-movies">
    <h2 class="page-title">热门电影</h2>
    <movie-list />
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'

export default {
  name: 'PopularMovies',
  components: {
    MovieList
  }
}
</script>

<style scoped>
.popular-movies {
  padding: 20px;
}

.page-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
</style> 