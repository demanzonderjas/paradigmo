import { Page } from "@/components/layout/Page";
import { useNotes } from "@/hooks/useNotes";
import { TNote, TTag } from "@/typings/notes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Tag() {
	const { query } = useRouter();
	const [tag, setTag] = useState<TTag>(null);
	const [notes, setNotes] = useState<TNote[]>([]);
	const { getTag, getNotesPerTag } = useNotes();

	useEffect(() => {
		(async () => {
			const tag = await getTag(query.tag as string);
			const notes = await getNotesPerTag(query.tag as string);
			setTag(tag);
			setNotes(notes);
		})();
	}, [query.tag]);

	if (!tag) {
		return null;
	}

	return (
		<Page title={tag.name}>
			<div className="notes flex flex-wrap justify-center gap-10">
				{notes.map((note) => (
					<div
						className="flex flex-col items-stretch text-black p-4"
						key={note.uid}
						style={{ maxWidth: "600px" }}
					>
						<div
							className="text bg-white p-4"
							dangerouslySetInnerHTML={{ __html: note.text }}
						/>
						{note.source && (
							<div className="source bg-orange text-white text-xs px-4 py-2">
								{note.source}
							</div>
						)}
					</div>
				))}
			</div>
		</Page>
	);
}
