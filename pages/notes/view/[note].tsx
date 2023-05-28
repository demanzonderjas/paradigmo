import { Page } from "@/components/layout/Page";
import { Note } from "@/components/notes/Note";
import { useNote } from "@/hooks/useNote";

export default function ViewNote() {
	const { note } = useNote();

	return <Page title="View note">{!!note && <Note {...note} />}</Page>;
}
