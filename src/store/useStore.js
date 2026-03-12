import { create } from 'zustand'

const useStore = create((set) => ({
  hoveredSection: null,
  selectedSection: null,
  scrollProgress: 0,
  isLoaded: false,
  view: 'main', // 'main' | 'videos'
  scrollToSection: null, // null | 'land'

  setHoveredSection: (section) => set({ hoveredSection: section }),
  setSelectedSection: (section) => set({ selectedSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setView: (view) => set({ view }),
  setScrollToSection: (section) => set({ scrollToSection: section }),
}))

export default useStore
