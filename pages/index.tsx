import { NoteForm } from "../components/notes/NoteForm";
import { Page } from "@/components/layout/Page";

export default function Home() {
	return (
		<Page title="New note">
			<div className="content flex flex-auto w-screen justify-center">
				<NoteForm />
			</div>
		</Page>
	);
}
