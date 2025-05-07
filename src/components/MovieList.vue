<template>
  <div class="movie-list">
    <div class="filters">
      <el-select v-model="selectedGenre" placeholder="选择类型" clearable>
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :value="category.name"
        />
      </el-select>
      
      <el-select v-model="sortBy" placeholder="排序方式">
        <el-option label="评分最高" value="rating" />
        <el-option label="最新上映" value="year" />
      </el-select>
    </div>

    <el-row :gutter="16">
      <el-col
        v-for="movie in filteredMovies"
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
</template>

<script>
import { movies, categories } from '../mock/movies'
import MovieCard from './MovieCard.vue'

export default {
  name: 'MovieList',
  components: {
    MovieCard
  },
  data() {
    return {
      movies,
      categories,
      selectedGenre: '',
      sortBy: 'rating'
    }
  },
  computed: {
    filteredMovies() {
      let result = [...this.movies]
      
      // 按类型筛选
      if (this.selectedGenre) {
        result = result.filter(movie => 
          movie.genre.some(g => g === this.selectedGenre)
        )
      }
      
      // 排序
      result.sort((a, b) => {
        if (this.sortBy === 'rating') {
          return b.rating - a.rating
        } else if (this.sortBy === 'year') {
          return b.year - a.year
        }
        return 0
      })
      
      return result
    }
  }
}
</script>

<style scoped>
.movie-list {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 16px;
}

.movie-item {
  margin-bottom: 16px;
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