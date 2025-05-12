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
            @movie-click="handleMovieClick"
            @rating="handleMovieRating(movie)"
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
  name: 'RealtimeRecommend',
  components: {
    MovieCard
  },
  data() {
    return {
      recommendedMovies: [],
      lastInteractedMovie: null // 记录用户最后交互的电影
    }
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  created() {
    this.checkAndUpdateRecommendations()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.checkAndUpdateRecommendations()
    })
  },
  methods: {
    checkAndUpdateRecommendations() {
      // 从 localStorage 获取最后交互的电影
      const lastMovieStr = localStorage.getItem('last_interacted_movie')
      if (lastMovieStr) {
        try {
          const lastMovie = JSON.parse(lastMovieStr)
          this.lastInteractedMovie = movies.find(m => m.id === lastMovie.id)
        } catch (e) {
          console.error('解析最后交互电影失败:', e)
        }
      }
      this.updateRecommendations()
    },
    updateRecommendations() {
      this.recommendedMovies = this.getRealtimeRecommendations()
    },
    getRealtimeRecommendations() {
      if (!this.lastInteractedMovie) {
        // 如果没有交互记录，随机推荐
        return this.getRandomMovies(6)
      }

      // 计算每部电影与最后交互电影的匹配度
      const movieScores = movies
        .filter(movie => movie.id !== this.lastInteractedMovie.id) // 排除最后交互的电影
        .map(movie => {
          const movieGenres = Array.isArray(movie.genre) ? movie.genre : [movie.genre]
          const lastMovieGenres = Array.isArray(this.lastInteractedMovie.genre) 
            ? this.lastInteractedMovie.genre 
            : [this.lastInteractedMovie.genre]
          
          // 计算共同标签数量
          const commonGenres = movieGenres.filter(genre => lastMovieGenres.includes(genre))
          // 计算匹配度分数（共同标签数量 / 最后交互电影的总标签数量）
          const score = commonGenres.length / lastMovieGenres.length
          
          return {
            movie,
            score,
            commonGenres
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
      
      // 获取2部随机电影（排除已选择的电影和最后交互的电影）
      const remainingMovies = movies.filter(movie => 
        !topMatches.includes(movie) && movie.id !== this.lastInteractedMovie.id
      )
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
    },
    // 处理电影点击事件
    handleMovieClick(movie) {
      this.lastInteractedMovie = movie
      localStorage.setItem('last_interacted_movie', JSON.stringify(movie))
      this.updateRecommendations()
    },
    // 处理电影评分事件
    handleMovieRating(movie) {
      this.lastInteractedMovie = movie
      localStorage.setItem('last_interacted_movie', JSON.stringify(movie))
      this.updateRecommendations()
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
  cursor: pointer;
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