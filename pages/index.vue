<template>
  <div class="container">
    <header class="header">
      <h1>無限滾動範例</h1>
      <p>滾動到頁面底部來載入更多內容</p>
    </header>

    <main class="main">
      <div class="posts-container">
        <article
          v-for="post in items"
          :key="post.id"
          class="post-card"
        >
          <h2 class="post-title">
            {{ post.title }}
          </h2>
          <div class="post-meta">
            <span class="author">作者: {{ post.author }}</span>
            <span class="date">{{ formatDate(post.createdAt) }}</span>
          </div>
          <p class="post-content">
            {{ post.content }}
          </p>
        </article>
      </div>

      <div class="loading-section">
        <div v-if="loading" class="loading">
          <div class="spinner" />
          <p>載入中...</p>
        </div>

        <div v-if="error" class="error">
          <p>載入失敗: {{ error }}</p>
          <button class="retry-btn" @click="loadMore">
            重試
          </button>
        </div>

        <div v-if="!hasMore && !loading" class="end-message">
          <p>已載入所有內容</p>
        </div>

        <div ref="sentinel" class="sentinel" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

const fetchPosts = async (page: number): Promise<Post[]> => {
  const { data } = await $fetch<{ data: Post[] }>(`/api/posts?page=${page}&limit=10`)
  return data
}

const { items, loading, error, hasMore, sentinel, loadMore } = useInfiniteScroll(fetchPosts)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 600;
}

.header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.post-title {
  margin: 0 0 12px 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #666;
}

.author {
  font-weight: 500;
}

.date {
  color: #888;
}

.post-content {
  margin: 0;
  line-height: 1.6;
  color: #555;
  font-size: 1rem;
}

.loading-section {
  margin-top: 40px;
  text-align: center;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  padding: 20px;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
}

.retry-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;
}

.retry-btn:hover {
  background: #5a6fd8;
}

.end-message {
  padding: 20px;
  color: #666;
  font-style: italic;
}

.sentinel {
  height: 1px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .header {
    margin-bottom: 20px;
    padding: 15px;
  }

  .header h1 {
    font-size: 1.6rem;
  }

  .post-card {
    padding: 16px;
  }

  .post-title {
    font-size: 1.2rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
