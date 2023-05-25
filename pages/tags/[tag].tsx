import { Page } from "@/components/layout/Page";
import { useNotes } from "@/hooks/useNotes";
import { TTag } from "@/typings/notes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Tag() {
	const { query } = useRouter();
	const [tag, setTag] = useState<TTag>(null);
	const { getTag } = useNotes();

	useEffect(() => {
		(async () => {
			const tag = await getTag(query.tag as string);
			setTag(tag);
		})();
	}, [query.tag]);

	if (!tag) {
		return null;
	}

	return <Page title={tag.name}></Page>;
}
