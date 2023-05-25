import { TTag } from "@/typings/notes";
import { useRouter } from "next/router";

export const TagList: React.FC<{ tags: TTag[]; hasLinks?: boolean }> = ({ tags, hasLinks }) => {
	const { push } = useRouter();
	return (
		<div className="tags flex gap-5 flex-wrap w-full">
			{tags.map((tag, index) => (
				<div
					className={`tag py-2 px-4 bg-white text-black flex items-center justify-center ${
						hasLinks ? "cursor-pointer hover:bg-black hover:text-white" : ""
					}`}
					key={index}
					onClick={hasLinks ? () => push(`/tags/${tag.uid}`) : undefined}
				>
					<span>{tag.name}</span>
				</div>
			))}
		</div>
	);
};
