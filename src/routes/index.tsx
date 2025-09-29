import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import Home from '@/screens/Home/Home'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Home />
  )
}
