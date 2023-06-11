import { useEffect, useState } from "react";
import { useNotes } from "@/hooks/useNotes";
import { TListItem, TNote, TTag } from "@/typings/notes";
import { Button } from "../form/Button";
import { TagAutocomplete } from "../tags/TagAutocomplete";
import { TagList } from "../tags/TagList";
import { useRouter } from "next/router";
import { RichTextField } from "../form/RichTextField";
import { DateString } from "../layout/DateString";
import { Icon } from "../layout/Icon";
import uuid from "uniqid";
import { Checklist } from "../checklist/Checklist";

const createNewListItem = (): TListItem => {
	return { uid: uuid(), text: "" };
};

export const NoteForm: React.FC<{ seed?: TNote }> = ({ seed }) => {
	const [note, setNote] = useState("");
	const [source, setSource] = useState("");
	const [tags, setTags] = useState<TTag[]>([]);
	const [showList, setShowList] = useState<boolean>(!!seed && !!seed.list);
	const [checklist, setChecklist] = useState<TListItem[]>([createNewListItem()]);
	const { addNote, updateNote, addTag, deleteNote } = useNotes();
	const { push } = useRouter();

	const handleSubmit = async () => {
		const noteData: TNote = {
			text: note,
			tags,
			source: source || null,
			timestamp: Date.now(),
			list: checklist ? checklist.filter((item) => !!item.text) : null,
		};
		if (seed) {
			await updateNote(seed, noteData);
			push(`/notes/view/${seed.uid}`);
		} else {
			const uid = await addNote(noteData);
			push(`/notes/view/${uid}`);
		}
	};

	const addListItem = () => {
		const item = createNewListItem();
		setChecklist([...checklist, item]);
	};

	const addTagToNote = async ({ name, uid }: TTag) => {
		if (tags.some((tag) => tag.uid === uid)) {
			return;
		}
		const tag = uid ? { name, uid } : await addTag(name);
		setTags([...tags, tag]);
	};

	const removeTag = (uid: string) => {
		setTags(tags.filter((t) => t.uid !== uid));
	};

	const handleDelete = async () => {
		await deleteNote({ ...seed, tags });
		push("/");
	};

	const updateItem = (uid: string, text: string) => {
		const itemIndex = checklist.findIndex((item) => item.uid === uid);
		const items = [...checklist];
		items[itemIndex] = { ...items[itemIndex], text };
		setChecklist(items);
	};

	const removeItem = (uid: string) => {
		setChecklist(checklist.filter((t) => t.uid !== uid));
	};

	useEffect(() => {
		if (seed) {
			setNote(seed.text || "");
			setSource(seed.source || "");
			setTags(seed.tags || []);
			setChecklist(seed.list || [createNewListItem()]);
			if (seed.list) {
				setShowList(true);
			}
		}
	}, [seed]);

	return (
		<form className="flex flex-auto flex-col gap-5 max-w-2xl px-4">
			<div className="fields text-black flex flex-start flex-col flex-auto justify-center gap-5 flex-wrap">
				<div>
					<DateString timestamp={seed ? seed.timestamp : Date.now()} />
				</div>
				<RichTextField value={note} setValue={setNote} />
				<div className="show-list">
					<Icon evenOdd={true} handleClick={() => setShowList(!showList)}>
						<path
							d="m10.5 17.25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-3.55c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7-2.2c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-6c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7 .25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75z"
							fillRule="nonzero"
						/>
					</Icon>
					{showList && (
						<div className="checklist flex flex-col gap-2 my-4">
							<Checklist
								list={checklist}
								handleDelete={removeItem}
								handleChange={updateItem}
							/>
							<Button text="Add item" onClick={addListItem} />
						</div>
					)}
				</div>
				<input
					className="w-full p-2"
					placeholder="source"
					type="text"
					value={source}
					onChange={(e) => setSource(e.target.value)}
				/>
				<TagAutocomplete addTag={addTagToNote} />
				<TagList tags={tags} removeTag={removeTag} />
			</div>
			<Button text={seed ? "Update note" : "Add note"} onClick={handleSubmit} />
			{seed && <Button text="Delete note" onClick={handleDelete} theme="danger" />}
		</form>
	);
};
