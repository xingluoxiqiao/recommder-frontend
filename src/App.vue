<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="['RealtimeRecommend', 'OfflineRecommend']">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding-top: 80px; /* 为固定Header留出空间 */
}

/* 响应式布局 */
@media (max-width: 1600px) {
  .main-content {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (max-width: 1200px) {
  .main-content {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
