<template>
  <div class="offline-recommend">
    <el-page-header @back="goBack" title="返回">
      <template #content>
        <h2>离线推荐</h2>
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
import { mapGetters } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
import { movies } from '@/mock/movies'

export default {
  name: 'OfflineRecommend',
  components: {
    MovieCard
  },
  data() {
    return {
      recommendedMovies: []
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'favoriteGenres'])
  },
  created() {
    this.updateRecommendations()
  },
  methods: {
    updateRecommendations() {
      this.recommendedMovies = this.getOfflineRecommendations()
    },
    getOfflineRecommendations() {
      if (!this.isLoggedIn) {
        // 未登录时随机推荐
        return this.getRandomMovies(6)
      }

      // 获取用户收藏的类型
      const favoriteGenres = this.favoriteGenres
      if (!favoriteGenres || favoriteGenres.length === 0) {
        // 如果没有收藏类型，随机推荐
        return this.getRandomMovies(6)
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

      // 获取前4部匹配度最高的电影
      const topMatches = sortedMovies.slice(0, 4)
      
      // 获取2部随机电影（排除已选择的电影）
      const remainingMovies = movies.filter(movie => !topMatches.includes(movie))
      const randomMovies = this.getRandomMoviesFromList(remainingMovies, 2)
      
      // 合并推荐结果
      return [...topMatches, ...randomMovies]
    },
    getRandomMoviesFromList(movieList, count) {
      const shuffled = [...movieList].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, count)
    },
    getRandomMovies(count) {
      return this.getRandomMoviesFromList(movies, count)
    },
    goBack() {
      this.$router.push('/')
    },
    refreshMovies() {
      this.updateRecommendations()
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
.offline-recommend {
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