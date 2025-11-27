import { HashRouter, Route, Routes } from "react-router"
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
import QuizPage from "./pages/QuizPage"
import ResultsPage from "./pages/ResultsPage"
import ImportExportData from "./pages/ImportExportData"

function App() {
  useEffect(() => {
    if (!window) return;
    const categories = localStorage.getItem("categories") ?? ""
    if (categories === "") {
    const customCategories = getCustomCategories()
    let serialized = ([customCategories.concat(CATEGORIES)]).map((c: Category[]) => c.map((cc: Category) => cc.serializeToString())).join("").substring(0)
      localStorage.setItem("categories", serialized)
    }
  }, [])

  return (
    <>
      <HashRouter>
      <Navigation />
        <Routes>
          <Route path="/" element={<Home/>}/>            
          <Route path="flashcards" element={<FlashcardsPage/>}/>            
          <Route path="new">
            <Route path="card" element={<NewFlashcardForm/>}/>            

          </Route>
          <Route path="categories" element={<EditCategories/>}/>            
          <Route path="quiz" element={<QuizPage/>}/>            
          <Route path="results" element={<ResultsPage/>}/>            
          <Route path="import" element={<ImportExportData/>}/>            
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </HashRouter>
      <Footer />
    </>
  )
}

export default App
