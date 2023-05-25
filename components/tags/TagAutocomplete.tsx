import { useNotes } from "@/hooks/useNotes";
import { TTag } from "@/typings/notes";
import { useEffect, useState } from "react";
import { Button } from "@/components/form/Button";

export const TagAutocomplete: React.FC<{ addTag: Function }> = ({ addTag }) => {
	const [tag, setTag] = useState<TTag>({ name: "", uid: null });
	const [tagList, setTagList] = useState<TTag[]>([]);
	const { getTagList } = useNotes();

	const addAndClear = (tag: TTag) => {
		addTag(tag);
		setTag({ name: "", uid: null });
	};

	useEffect(() => {
		(async () => {
			const tagList = await getTagList();
			setTagList(tagList);
		})();
	}, []);

	return (
		<div className="tag flex items-center justify-between gap-10 w-full">
			<div className="tag-autocomplete relative w-full flex-auto">
				<input
					className="p-2 text-md text-black flex-auto w-full"
					type="text"
					value={tag.name}
					onChange={(e) => setTag({ name: e.target.value, uid: tag.uid })}
					style={{ height: "50px" }}
				/>
				<div className="autocomplete absolute left-0 w-full bg-white shadow-sm">
					{tagList
						.filter(() => !!tag.name)
						.filter((listItem) =>
							listItem.name.toString().toLowerCase().match(tag.name.toLowerCase())
						)
						.map((listItem) => (
							<div
								className="p-2 tag border-b-black border-2 text-black hover:text-white hover:bg-black cursor-pointer"
								key={listItem.uid}
								onClick={() => addAndClear(listItem)}
							>
								{listItem.name}
							</div>
						))}
				</div>
			</div>
			<Button text="Add tag" onClick={() => addAndClear(tag)} />
		</div>
	);
};
