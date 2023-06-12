import { useState } from "react";
import { useNotes } from "../../hooks/useNotes";
import { TListItem } from "../../typings/notes";
import { Button } from "../form/Button";

export const Checklist: React.FC<{
	list: TListItem[];
	handleChange?: Function;
	handleDelete?: Function;
	checked?: string[];
	noteUid?: string;
	isCheckable?: boolean;
}> = ({ list, checked, noteUid, handleChange, handleDelete, isCheckable }) => {
	const [localList, setLocalList] = useState<Set<string>>(new Set<string>(checked || []));
	const { setChecked } = useNotes();

	const isChecked = (uid: string) => localList.has(uid);
	const updateChecklist = (itemUid: string) => {
		const copy = new Set(localList);
		if (isChecked(itemUid)) {
			copy.delete(itemUid);
		} else {
			copy.add(itemUid);
		}
		setLocalList(copy);
		console.log("check", itemUid);
		setChecked(noteUid, [...copy.values()]);
	};

	return (
		<div className="items flex flex-col gap-2">
			{list.map((item) => (
				<div className="item flex gap-2 items-center" key={item.uid}>
					<div
						onClick={isCheckable ? () => updateChecklist(item.uid) : undefined}
						className={`checkbox flex border-2 ${
							handleChange ? "border-white" : "border-black"
						} w-8 h-7 ${isChecked(item.uid) ? "bg-black" : ""} `}
					/>
					<div className="text w-full flex-auto">
						{handleChange ? (
							<input
								className="p-1 w-full flex-auto"
								type="text"
								value={item.text}
								onChange={
									handleChange
										? (e) => handleChange(item.uid, e.target.value)
										: undefined
								}
							/>
						) : (
							<p>{item.text}</p>
						)}
					</div>
					{!!handleDelete && (
						<Button
							text="X"
							size="small"
							onClick={handleDelete ? () => handleDelete(item.uid) : undefined}
							theme="danger"
						/>
					)}
				</div>
			))}
		</div>
	);
};
