<template>
  <div class="home">
    <div class="search-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索电影..."
        class="search-input"
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 添加推荐电影部分 -->
    <div class="recommendations-section" v-if="isLoggedIn">
      <h2 class="section-title">为你推荐</h2>
      <el-row :gutter="16">
        <el-col v-for="movie in recommendedMovies" :key="movie.id" :xs="12" :sm="8" :md="6" :lg="4">
          <movie-card :movie="movie" />
        </el-col>
      </el-row>
    </div>

    <div class="movies-section">
      <h2 class="section-title">{{ isSearching ? '搜索结果' : '热门电影' }}</h2>
      <el-row :gutter="16">
        <el-col v-for="movie in displayedMovies" :key="movie.id" :xs="12" :sm="8" :md="6" :lg="4">
          <movie-card :movie="movie" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
import { movies } from '@/mock/movies'

export default {
  name: 'Home',
  components: {
    MovieCard
  },
  data() {
    return {
      searchQuery: '',
      isSearching: false,
      displayedMovies: [],
      recommendedMovies: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'favoriteGenres'])
  },
  created() {
    // 初始化显示所有电影
    this.displayedMovies = movies
    // 获取推荐电影
    this.updateRecommendations()
  },
  methods: {
    handleSearch() {
      if (!this.searchQuery.trim()) {
        this.isSearching = false
        this.displayedMovies = movies
        return
      }

      this.isSearching = true
      const query = this.searchQuery.toLowerCase()
      this.displayedMovies = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genre.some(g => g.toLowerCase().includes(query))
      )
    },
    updateRecommendations() {
      this.recommendedMovies = this.getOfflineRecommendations()
    },
    getOfflineRecommendations() {
      if (!this.isLoggedIn) {
        // 未登录时随机推荐
        return this.getRandomMovies(10)
      }

      // 获取用户收藏的类型
      const favoriteGenres = this.favoriteGenres
      if (!favoriteGenres || favoriteGenres.length === 0) {
        // 如果没有收藏类型，随机推荐
        return this.getRandomMovies(10)
      }

      // 计算每部电影与用户收藏类型的匹配度
      const movieScores = movies.map(movie => {
        const movieGenres = Array.isArray(movie.genre) ? movie.genre : [movie.genre]
        // 计算匹配的类型数量
        const matchCount = movieGenres.filter(genre => favoriteGenres.includes(genre)).length
        // 计算匹配度分数（匹配类型数量 / 电影总类型数量）
        const score = matchCount / movieGenres.length
        return {
          movie,
          score
        }
      })

      // 按匹配度分数排序，分数相同时随机排序
      const sortedMovies = movieScores
        .sort((a, b) => {
          if (b.score === a.score) {
            return Math.random() - 0.5
          }
          return b.score - a.score
        })
        .map(item => item.movie)

      // 返回前10部电影
      return sortedMovies.slice(0, 10)
    },
    getRandomMovies(count) {
      const shuffled = [...movies].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, count)
    }
  },
  watch: {
    // 监听登录状态和收藏类型变化，更新推荐
    isLoggedIn() {
      this.updateRecommendations()
    },
    favoriteGenres: {
      handler() {
        this.updateRecommendations()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 24px;
}

.search-input {
  max-width: 500px;
  margin: 0 auto;
  display: block;
}

.section-title {
  margin: 24px 0 16px;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.recommendations-section {
  margin-bottom: 32px;
}

.movies-section {
  margin-top: 32px;
}

@media (max-width: 768px) {
  .home {
    padding: 16px;
  }
  
  .section-title {
    margin: 16px 0 12px;
    font-size: 18px;
  }
}
</style> 