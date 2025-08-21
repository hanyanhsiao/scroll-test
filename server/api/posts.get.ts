interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

const generateMockPosts = (page: number, limit: number): Post[] => {
  const posts: Post[] = []
  const startId = (page - 1) * limit + 1

  for (let i = 0; i < limit; i++) {
    const id = startId + i
    posts.push({
      id,
      title: `文章標題 ${id}`,
      content: `這是第 ${id} 篇文章的內容。Lorem ipsum dolor sit amet, consectetur adipiscing elit. 這篇文章包含了一些範例內容來展示無限滾動功能。`,
      author: `作者${(id % 5) + 1}`,
      createdAt: new Date(Date.now() - id * 86400000).toISOString(),
    })
  }

  return posts
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string) || 1
  const limit = Number.parseInt(query.limit as string) || 10

  await new Promise(resolve => setTimeout(resolve, 500))

  if (page > 10) {
    return {
      data: [],
      page,
      limit,
      hasMore: false,
    }
  }

  const posts = generateMockPosts(page, limit)

  return {
    data: posts,
    page,
    limit,
    hasMore: page < 10,
  }
})
