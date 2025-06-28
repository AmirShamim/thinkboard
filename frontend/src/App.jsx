import {Routes, Route} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import toast from "react-hot-toast"

const App = () => {
    return (
        <div className={"relative h-full w-full"}>
            <div
                className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24"
                style={{background: "radial-gradient(125% 125% at 50% 10%, #000 60%, #00ff9d40 100%)"}}
            ></div>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/create"} element={<CreatePage/>}/>
                <Route path={"/note/:id"} element={<NoteDetailPage/>}/>
            </Routes>
        </div>
    )
}

export default App