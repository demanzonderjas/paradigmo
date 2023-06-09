import { Page } from "@/components/layout/Page";
import { TagList } from "@/components/tags/TagList";
import { useTagList } from "@/hooks/useTagList";

export default function Tags() {
	const { tagList } = useTagList();

	return (
		<Page title="Tags">
			<div className="flex justify-center">
				<TagList tags={tagList} hasLinks={true} />
			</div>
		</Page>
	);
}
