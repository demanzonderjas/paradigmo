import { TNote } from "@/typings/notes";
import { useState } from "react";
import { Icon } from "../layout/Icon";
import { Note } from "./Note";

export const NoteList: React.FC<{ notes: TNote[] }> = ({ notes }) => {
	const [sortReverse, setSortReverse] = useState(false);

	return (
		<>
			<div className="sort pb-10">
				<Icon evenOdd={true} handleClick={() => setSortReverse(!sortReverse)}>
					<path
						fill="white"
						d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z"
					/>
				</Icon>
			</div>
			<div className="notes flex flex-wrap justify-center gap-2">
				{notes
					.sort((noteA, noteB) =>
						sortReverse
							? noteA.timestamp - noteB.timestamp
							: noteB.timestamp - noteA.timestamp
					)
					.map((note) => (
						<Note key={note.uid} {...note} />
					))}
			</div>
		</>
	);
};
