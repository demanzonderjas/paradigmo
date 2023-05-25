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
			const notes = await getNotesPerTag(tag.uid);
			setTag(tag);
		})();
	}, [query.tag]);

	if (!tag) {
		return null;
	}

	return <Page title={tag.name}></Page>;
}
