import { TNote } from "@/typings/notes";
import { useRouter } from "next/router";
import { DateString } from "../layout/DateString";

export const Note: React.FC<TNote> = (note) => {
	const { push } = useRouter();

	return (
		<div
			className="flex flex-col items-stretch text-black p-4 cursor-pointer transition-transform hover:scale-105"
			style={{ maxWidth: "600px", minWidth: "250px" }}
			onClick={() => push(`/notes/edit/${note.uid}`)}
		>
			<div className="content bg-white p-4">
				<div className="text" dangerouslySetInnerHTML={{ __html: note.text }} />
				{note.list && <div className="my-2">LIST!!</div>}
			</div>
			<div className="flex justify-between wrap bg-orange text-white text-xs px-4 py-1">
				<div className="source">{note.source}</div>
				<div className="timestamp">
					<DateString timestamp={note.timestamp} />
				</div>
			</div>
		</div>
	);
};
