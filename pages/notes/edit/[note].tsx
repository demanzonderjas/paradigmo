import { Page } from "@/components/layout/Page";
import { NoteForm } from "@/components/notes/NoteForm";
import { useNote } from "@/hooks/useNote";

export default function EditNote() {
	const { note } = useNote();

	return (
		<Page title="Edit note">
			<div className="content flex flex-auto w-screen justify-center">
				<NoteForm seed={note} />
			</div>
		</Page>
	);
}
