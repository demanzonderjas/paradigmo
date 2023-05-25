import { Login } from "../components/user/Login";
import { NoteForm } from "../components/notes/NoteForm";

export default function Home() {
	return (
		<>
			<h1>Notes</h1>
			<div className="content flex flex-auto w-screen justify-center">
				<NoteForm />
			</div>
			<Login />
		</>
	);
}
