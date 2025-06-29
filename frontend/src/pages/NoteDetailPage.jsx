import {Link, useNavigate, useParams} from "react-router"
import {useState, useEffect} from "react"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"
import {ArrowLeftIcon, LoaderIcon, Trash2Icon} from "lucide-react"

const NoteDetailPage = () => {

    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axiosInstance.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.log("Error fetching data", error)
                toast.error("Failed to fetch data")
            } finally {
                setIsLoading(false)
            }
        }
        fetchNote()
    }, [id])

    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try{
            await axiosInstance.delete(`/notes/${id}`)
            toast.success("Note Deleted Successfully!")
            navigate('/')
        } catch (error) {
            console.log('Error deleting Note', error)
            toast.error("Failed to delete note")
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!note.title?.trim() || !note.content?.trim()) {
            toast.error("All fields are required")
            return
        }
        setIsSaving(true);
        try {
            await axiosInstance.put(`/notes/${id}`, note)
            navigate('/')
            toast.success('Note Updated Successfully!')
        } catch (error) {
            console.log("Error creating note", error)
            if (error.response?.status === 429) {
                toast.error("Too many requests update note after few seconds", {
                    duration: 3000,
                })
            } else {
                toast.error("Failed to update note")
            }
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (<div className="min-h-screen bg-base-200 flex items-center justify-center">
            <LoaderIcon className="animate-spin size-10"/>
        </div>);
    }


    return (

        <div className={"min-h-screen bg-base-200"}>
            <div className={"container mx-auto px-4 py-8"}>
                <div className={"max-w-2xl mx-auto"}>
                    <div className={"flex items-center justify-between mb-6"}>
                        <Link to={"/"} className={"btn btn-ghost mb-6"}><ArrowLeftIcon className={"size-5"}/>Back to
                            Home</Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5"/>
                            Delete Note
                        </button>
                    </div>
                    <div className={"card bg-base-100"}>
                        <div className={"card-body"}>
                            <h2 className={"card-title text-2xl mb-4"}>Update Note</h2>
                            {note && (<form onSubmit={handleSave}>
                                <div className={"form-control mb-4"}>
                                    <label className={"label"}>
                                        <span className={"label-text"}>Title</span>
                                    </label>
                                    <input type={"text"} placeholder={"Note Title"} className={"input input-bordered"}
                                           value={note.title}
                                           onChange={(e) => setNote({...note, title: e.target.value})}/>
                                </div>

                                <div className={"form-control mb-4"}>
                                    <label className={"label"}>
                                        <span className={"label-text"}>Content</span>
                                    </label>
                                    <textarea type={"text"} placeholder={"Write your note here..."}
                                              className={"textarea textarea-bordered h-32"} value={note.content}
                                              onChange={(e) => setNote({...note, content: e.target.value})}/>
                                </div>

                                <div className={"card-actions justify-end"}>
                                    <button type={"submit"} className={"btn btn-primary"} disabled={isSaving}>
                                        {isSaving ? "Saving..." : "Save Note"}
                                    </button>
                                </div>
                            </form>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default NoteDetailPage