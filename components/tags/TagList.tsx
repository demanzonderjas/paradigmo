import { TTag } from "@/typings/notes";
import { useRouter } from "next/router";

export const TagList: React.FC<{ tags: TTag[]; hasLinks?: boolean; removeTag?: Function }> = ({
	tags,
	hasLinks,
	removeTag,
}) => {
	const { push } = useRouter();
	return (
		<div className="tags flex gap-5 flex-wrap w-full">
			{tags.map((tag, index) => (
				<div
					className={`tag flex items-stretch justify-center ${
						hasLinks
							? "cursor-pointer hover:bg-black hover:text-white transition-transform hover:scale-110"
							: ""
					}`}
					key={index}
					onClick={hasLinks ? () => push(`/tags/${tag.uid}`) : undefined}
				>
					<span className="flex items-center justify-center py-2 px-4 bg-white text-black">
						{tag.name}
					</span>
					{!!removeTag && (
						<span
							className="bg-orange flex items-center text-white px-2"
							onClick={() => removeTag(tag.uid)}
						>
							x
						</span>
					)}
				</div>
			))}
		</div>
	);
};
