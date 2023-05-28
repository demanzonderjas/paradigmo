import { Page } from "@/components/layout/Page";
import { Note } from "@/components/notes/Note";
import { TagList } from "@/components/tags/TagList";
import { useNote } from "@/hooks/useNote";

export default function ViewNote() {
	const { note } = useNote();

	return (
		<Page title="View note">
			{!!note && (
				<>
					<Note {...note} />
					<div className="flex justify-center my-10">
						<TagList tags={note.tags || []} hasLinks={true} />
					</div>
				</>
			)}
		</Page>
	);
}
