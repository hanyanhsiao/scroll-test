import { ref, onMounted, onUnmounted, readonly } from 'vue'

export interface InfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll<T>(
  fetchFunction: (page: number) => Promise<T[]>,
  options: InfiniteScrollOptions = {},
) {
  const { rootMargin = '0px' } = options

  const items = ref<T[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasMore = ref(true)
  const currentPage = ref(1)
  const sentinel = ref<HTMLElement>()

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return

    try {
      loading.value = true
      error.value = null

      const newItems = await fetchFunction(currentPage.value)

      if (newItems.length === 0) {
        hasMore.value = false
      }
      else {
        items.value.push(...newItems)
        currentPage.value++
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    }
    finally {
      loading.value = false
    }
  }

  const reset = () => {
    items.value = []
    currentPage.value = 1
    hasMore.value = true
    error.value = null
    loading.value = false
  }

  onMounted(() => {
    if (sentinel.value) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting && hasMore.value && !loading.value) {
            loadMore()
          }
        },
        {
          rootMargin,
          threshold: 0.1,
        },
      )

      observer.observe(sentinel.value)

      onUnmounted(() => {
        observer.disconnect()
      })
    }

    loadMore()
  })

  return {
    items: readonly(items),
    loading: readonly(loading),
    error: readonly(error),
    hasMore: readonly(hasMore),
    sentinel,
    loadMore,
    reset,
  }
}
