import { TNote } from "@/typings/notes";
import { useRouter } from "next/router";

export const Note: React.FC<TNote> = (note) => {
	const { push } = useRouter();

	return (
		<div
			className="flex flex-col items-stretch text-black p-4 cursor-pointer transition-transform hover:scale-105"
			style={{ maxWidth: "600px", minWidth: "250px" }}
			onClick={() => push(`/notes/edit/${note.uid}`)}
		>
			<div className="text bg-white p-4" dangerouslySetInnerHTML={{ __html: note.text }} />
			{note.source && (
				<div className="source bg-orange text-white text-xs px-4 py-1">{note.source}</div>
			)}
		</div>
	);
};
