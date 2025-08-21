<template>
  <div class="container">
    <header class="header">
      <h1>GitHub 倉庫無限滾動</h1>
      <p>展示來自 GitHub 組織 <strong>Microsoft</strong> 的倉庫列表</p>
      <small>使用 GitHub REST API 實現無限滾動功能</small>
    </header>

    <main class="main">
      <div class="repos-container">
        <article v-for="repo in items" :key="repo.id" class="repo-card">
          <div class="repo-header">
            <h2 class="repo-name">
              <a :href="repo.html_url" target="_blank" rel="noopener">
                {{ repo.name }}
              </a>
            </h2>
            <div class="repo-stats">
              <span v-if="repo.language" class="language">{{
                repo.language
              }}</span>
              <span class="stars">⭐ {{ repo.stargazers_count }}</span>
              <span class="forks">🍴 {{ repo.forks_count }}</span>
            </div>
          </div>

          <p v-if="repo.description" class="repo-description">
            {{ repo.description }}
          </p>
          <p v-else class="repo-description no-description">
            沒有描述
          </p>
          <div class="repo-meta">
            <span class="owner">
              <img
                :src="repo.owner.avatar_url"
                :alt="repo.owner.login"
                class="avatar"
              />
              {{ repo.owner.login }}
            </span>
          </div>
        </article>
      </div>

      <div class="loading-section">
        <div v-if="loading" class="loading">
          <div class="spinner" />
          <p>載入更多倉庫...</p>
        </div>

        <div v-if="error" class="error">
          <p>載入失敗: {{ error }}</p>
          <button class="retry-btn" @click="loadMore">
            重試
          </button>
        </div>

        <div v-if="!hasMore && !loading" class="end-message">
          <p>已載入所有倉庫</p>
        </div>

        <div ref="sentinel" class="sentinel" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}

const fetchRepos = async (page: number): Promise<Repository[]> => {
  const response = await fetch(`/api/posts?page=${page}&limit=10`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const result = await response.json()
  return result.data
}

const { items, loading, error, hasMore, sentinel, loadMore }
  = useInfiniteScroll(fetchRepos)
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

.repos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.repo-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 14px;
}

.repo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
}

.repo-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
  flex: 1;
}

.repo-name a {
  color: #0366d6;
  text-decoration: none;
}

.repo-name a:hover {
  text-decoration: underline;
}

.repo-stats {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: #666;
  flex-shrink: 0;
}

.language {
  background: #f1f8ff;
  color: #0366d6;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.stars,
.forks {
  color: #586069;
}

.repo-description {
  margin: 0 0 16px 0;
  line-height: 1.6;
  color: #555;
  font-size: 1rem;
}

.no-description {
  color: #999;
  font-style: italic;
}

.repo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  gap: 16px;
}

.owner {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.updated {
  color: #888;
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

  .repo-card {
    padding: 16px;
  }

  .repo-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .repo-name {
    font-size: 1.2rem;
  }

  .repo-stats {
    flex-wrap: wrap;
  }

  .repo-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
