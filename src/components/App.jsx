import FileManagement from "../pages/file-management/FileManagement"
import setTheme from "../utils/setTheme"

function App() {
  setTheme()
  return (
    <>
      <nav className="z-50 w-full h-12 bg-background sticky top-0 flex items-center px-3 gap-3 group shadow-md dark:shadow-black" onClick={()=>{document.documentElement.classList.contains("dark") ? setTheme("light") : setTheme("dark")}}>
        <div className="w-7 h-7 bg-muted-foreground"></div>
        <div className="font-bold text-2xl">Harmony</div>
        <div className="fixed w-40 bg-muted-foreground top-0 left-0 h-full group-has-[:hover]:block hidden shadow-sm shadow-primary">
          test
        </div>
      </nav>
      <main>
        <FileManagement />
      </main>
    </>
  )
}
export default App
