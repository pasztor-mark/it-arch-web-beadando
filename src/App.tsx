import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Navigation from "./components/nav/Navigation"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import FlashcardsPage from "./pages/Flashcards"
import NewFlashcardForm from "./pages/NewFlashcardForm"
import EditCategories from "./pages/EditCategories"
import { useEffect } from "react"
import { getCustomCategories } from "./lib/functions"
import { CATEGORIES } from "./lib/constants"
import { Category } from "./types/Category"

function App() {
  useEffect(() => {
    if (!window) return;
    const categories = localStorage.getItem("categories") ?? ""
    if (categories === "") {
      const customCategories = getCustomCategories()
      localStorage.setItem("categories", ([customCategories,CATEGORIES]).map((c: Category[]) => c.map((cc: Category) => cc.serializeToString())).join(""))
    }
  }, [])

  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>            
          <Route path="flashcards" element={<FlashcardsPage/>}/>            
          <Route path="new">
            <Route path="card" element={<NewFlashcardForm/>}/>            

          </Route>
          <Route path="categories" element={<EditCategories/>}/>            
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
