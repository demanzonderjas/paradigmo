import { TTag } from "@/typings/notes";

export const TagList: React.FC<{ tags: TTag[] }> = ({ tags }) => {
	return (
		<div className="tags flex gap-5 flex-wrap w-full">
			{tags.map((tag, index) => (
				<div
					className="tag py-2 px-4 bg-white text-black flex items-center justify-center"
					key={index}
				>
					<span>{tag.name}</span>
				</div>
			))}
		</div>
	);
};
