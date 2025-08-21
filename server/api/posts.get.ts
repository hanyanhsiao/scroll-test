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

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string) || 1
  const limit = Number.parseInt(query.limit as string) || 10

  try {
    const url = `https://api.github.com/orgs/microsoft/repos?page=${page}&per_page=${limit}&sort=stars&direction=desc`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'scroll-test-app',
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const repositories: Repository[] = await response.json()

    return {
      data: repositories,
      page,
      limit,
      hasMore: repositories.length === limit,
    }
  }
  catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch repositories',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    })
  }
})
