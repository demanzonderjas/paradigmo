import { TagList } from "@/components/tags/TagList";
import { useTagList } from "@/hooks/useTagList";

export default function Tags() {
	const { tagList } = useTagList();

	return (
		<>
			<h1>Tags</h1>
			<TagList tags={tagList} />
		</>
	);
}
