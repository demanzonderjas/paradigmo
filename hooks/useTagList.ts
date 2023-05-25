import { useEffect, useState } from "react";
import { useNotes } from "./useNotes";
import { TTag } from "@/typings/notes";

export function useTagList() {
    const { getTagList } = useNotes();
    const [tagList, setTagList] = useState<TTag[]>([]);
 

	useEffect(() => {
		(async () => {
			const tagList = await getTagList();
			setTagList(tagList);
		})();
	}, []);

    return {
        tagList
    }
}