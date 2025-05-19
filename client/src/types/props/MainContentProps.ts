export interface MainContentProps {
  view: string
  setIsLoading: (isLoading: boolean) => void
  setError: (e: string | null) => void
  setView: (view: string) => void
}