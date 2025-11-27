import { FaClipboard } from "react-icons/fa6";
import { importPrompt, rawPromptJson } from "../lib/constants";
import { useState } from "react";
import { exportToJson, getAttempts, getCustomCategories, getQuestions, parseJsonToClasses, saveAttempt, saveCategory, saveQuestion } from "../lib/functions";

export default function ImportExportData() {
  const [message, setMessage] = useState<string>("")
  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState<string>("")
  async function readJsonFile(e: any) {
    const file = e.target.files?.[0];
    if (!file) return

    const text = await file.text()
    try {
      setJsonData(JSON.parse(text))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="mt-12 p-3 lg:mt-0 min-h-[80vh] relative">
      <title>
      Adatok kezelése
      </title>
      <section className="flex justify-between mx-4 flex-col xl:flex-row">
        <article className="flex flex-col gap-4 xl:w-5/12">
          <h2>Jegyzetek konvertálása</h2>
          <hr />
          <p className="text-lg">Alább megtalálható a JSON formátum, manuálisan, vagy AI segítségével lehet importálni kérdéseket, eredményeket és kategóriákat.</p>
          <h3>Másolható prompt:</h3>
          {
            message.length > 0 && <p>{message}</p>
          }
          <sub>A másolás gombbal a prompt szöveges utasításait is másolhatja.</sub>
          <pre className="my-2 text-xs h-1/2 overflow-scroll bg-black/20 rounded-xl relative p-4">
            <button className="rounded-xl p-2 bg-green-700 right-2 absolute top-2">
              <FaClipboard onClick={() => {
                //forrás: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
                navigator.clipboard.writeText(importPrompt)
                setMessage("Prompt másolva a vágólapra.")
              }} size={24} />
            </button>
            <code className="whitespace-pre-wrap text-sm">
              {JSON.stringify(rawPromptJson, null, 2)}
            </code>
          </pre>
          <button onClick={() => {
            const categories = getCustomCategories()
            const questions = getQuestions()
            const attempts = getAttempts()

            const url = exportToJson(questions, attempts, categories)
            //forrás: https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `${new Date().toISOString().split("T")[0]}-${new Date().toISOString().split("T")[1].substring(0, 5)}-exported.json`,
            );

            document.body.appendChild(link);

            link.click();

            link.parentNode?.removeChild(link); 
          }} className="p-2 bg-black/20 rounded-xl">
            <h4>Adatok exportálása</h4>
            <p className="text-xs">Exportáld JSON formátumba a jelenleg elmentett eredményeket, kategóriákat és kérdéseket.</p>
          </button>
        </article>
        <article className="flex flex-col gap-4 xl:w-5/12">
          {/* részlegre forrás: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file */}
          <h3>JSON importálása</h3>
          <hr />
          <label>Fájlként</label>
          <input type="file" accept="application/JSON" onChange={(e) => {
            readJsonFile(e)
          }} />
          <hr />
          <h6>Szövegként</h6>
          {
            error.length > 0 && <p className="text-red-400">{error}</p>
          }
          <span className="flex flex-col h-1/2">
            <label htmlFor="jsonText">JSON kód</label>
            <textarea name="jsonText" id="jsonText" className="font-mono min-h-full text-xs" onChange={(e) => {
              try {
                const parsed = JSON.parse(e.currentTarget.value)
                if (parsed) {
                  setJsonData(parsed)
                  setError("")
                }
              } catch (err) {
                setError("Hibás JSON!")
                console.log(err)
              }
            }} />

          </span>
          <button className="bg-black/20 rounded-xl text-xl p-4 mt-8" onClick={() => {
            const parsed = parseJsonToClasses(jsonData)
            if (parsed.categories.length > 0) {
              parsed.categories.forEach(c => saveCategory(c))
            }
            if (parsed.questions.length > 0) {
              parsed.questions.forEach(q => saveQuestion(q))
            }
            if (parsed.attempts.length > 0) {
              parsed.attempts.forEach((a) => saveAttempt(a))
            }

            setJsonData(null)
            setError("")
            setMessage("")

          }}>Importálás</button>
        </article>
      </section>

    </main>
  )
}