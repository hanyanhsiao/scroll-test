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

const microsoftRepos = [
  { name: 'vscode', description: 'Visual Studio Code', language: 'TypeScript', stars: 162000, forks: 28500 },
  { name: 'TypeScript', description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.', language: 'TypeScript', stars: 99200, forks: 13000 },
  { name: 'PowerToys', description: 'Windows system utilities to maximize productivity', language: 'C#', stars: 108000, forks: 6400 },
  { name: 'terminal', description: 'The new Windows Terminal and the original Windows console host', language: 'C++', stars: 94800, forks: 8300 },
  { name: 'playwright', description: 'Playwright is a framework for Web Testing and Automation', language: 'TypeScript', stars: 65700, forks: 3600 },
  { name: 'DeepSpeed', description: 'DeepSpeed is a deep learning optimization library', language: 'Python', stars: 34400, forks: 4000 },
  { name: 'dotnet', description: '.NET is a cross-platform runtime for cloud, mobile, desktop, and IoT apps.', language: 'C#', stars: 14800, forks: 3700 },
  { name: 'fluentui', description: 'Fluent UI web represents a collection of utilities, React components, and web components', language: 'TypeScript', stars: 18200, forks: 2700 },
  { name: 'WSL', description: 'Issues found on WSL', language: null, stars: 17200, forks: 810 },
  { name: 'calculator', description: 'Windows Calculator: A simple yet powerful calculator', language: 'C++', stars: 29400, forks: 5300 },
  { name: 'winget-cli', description: 'WinGet is the Windows Package Manager', language: 'C++', stars: 22800, forks: 1400 },
  { name: 'cascadia-code', description: 'This is a fun, new monospaced font that includes programming ligatures', language: null, stars: 25700, forks: 800 },
  { name: 'react-native-windows', description: 'A framework for building native Windows apps with React.', language: 'C++', stars: 16300, forks: 1100 },
  { name: 'LightGBM', description: 'A fast, distributed, high performance gradient boosting framework', language: 'C++', stars: 16600, forks: 3800 },
  { name: 'winget-pkgs', description: 'The Microsoft community Windows Package Manager manifest repository', language: 'PowerShell', stars: 8600, forks: 4400 },
  { name: 'cognitive-services-speech-sdk-js', description: 'Microsoft Cognitive Services Speech SDK for JavaScript', language: 'JavaScript', stars: 580, forks: 300 },
  { name: 'fast', description: 'The adaptive interface system for modern web experiences', language: 'TypeScript', stars: 9200, forks: 560 },
  { name: 'semantic-kernel', description: 'Integrate cutting-edge LLM technology quickly and easily', language: 'C#', stars: 21400, forks: 3200 },
  { name: 'playwright-python', description: 'Python version of the Playwright testing and automation library', language: 'Python', stars: 11800, forks: 870 },
  { name: 'pylance-release', description: 'Documentation and issues for Pylance', language: null, stars: 1700, forks: 100 },
  { name: 'monaco-editor', description: 'A browser based code editor', language: 'TypeScript', stars: 39800, forks: 3600 },
  { name: 'DialoGPT', description: 'Large-scale pretraining for dialogue', language: 'Python', stars: 11700, forks: 2100 },
  { name: 'vcpkg', description: 'C++ Library Manager for Windows, Linux, and MacOS', language: 'CMake', stars: 22800, forks: 6200 },
  { name: 'guidance', description: 'A guidance language for controlling large language models', language: 'Jupyter Notebook', stars: 18300, forks: 1000 },
  { name: 'kernel-memory', description: 'RAG architecture: index and query any data using LLM and natural language', language: 'C#', stars: 1500, forks: 290 },
  { name: 'BotFramework-WebChat', description: 'A highly-customizable web-based client for Azure Bot Services.', language: 'TypeScript', stars: 1600, forks: 1500 },
  { name: 'frontend-bootcamp', description: 'Frontend Workshop from HTML/CSS/JS to TypeScript/React/Redux', language: 'TypeScript', stars: 12600, forks: 1800 },
  { name: 'azure-docs', description: 'Open source documentation of Microsoft Azure', language: 'PowerShell', stars: 10200, forks: 21400 },
  { name: 'ML-For-Beginners', description: '12 weeks, 26 lessons, 52 quizzes, classic Machine Learning for all', language: 'Jupyter Notebook', stars: 68900, forks: 14100 },
  { name: 'Web-Dev-For-Beginners', description: '24 Lessons, 12 Weeks, Get Started as a Web Developer', language: 'JavaScript', stars: 83000, forks: 12300 },
]

const generateMockRepo = (repoData: any, baseId: number): Repository => ({
  id: baseId,
  name: repoData.name,
  full_name: `microsoft/${repoData.name}`,
  description: repoData.description,
  html_url: `https://github.com/microsoft/${repoData.name}`,
  language: repoData.language,
  stargazers_count: repoData.stars,
  forks_count: repoData.forks,
  created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  owner: {
    login: 'microsoft',
    avatar_url: 'https://avatars.githubusercontent.com/u/6154722?v=4',
    html_url: 'https://github.com/microsoft',
  },
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number.parseInt(query.page as string) || 1
  const limit = Number.parseInt(query.limit as string) || 10

  // 模擬網路延遲
  await new Promise(resolve => setTimeout(resolve, 300))

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const pageRepos = microsoftRepos.slice(startIndex, endIndex)
  const repositories = pageRepos.map((repo, index) => generateMockRepo(repo, startIndex + index + 1))

  return {
    data: repositories,
    page,
    limit,
    hasMore: endIndex < microsoftRepos.length,
  }
})
