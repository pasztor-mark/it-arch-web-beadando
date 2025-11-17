import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./components/Footer"
import Navigation from "./components/nav/Navigation"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import FlashcardsPage from "./pages/Flashcards"

function App() {

  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>            
          <Route path="/flashcards" element={<FlashcardsPage/>}/>            
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
