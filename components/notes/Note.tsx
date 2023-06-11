import { TNote } from "@/typings/notes";
import { useRouter } from "next/router";
import { DateString } from "../layout/DateString";
import { Checklist } from "../checklist/Checklist";
import { Icon } from "../layout/Icon";

export const Note: React.FC<TNote> = (note) => {
	const { push } = useRouter();

	return (
		<div
			className="flex flex-col items-stretch text-black p-4"
			style={{ maxWidth: "600px", minWidth: "250px" }}
		>
			<div className="content bg-white p-4">
				<div className="text" dangerouslySetInnerHTML={{ __html: note.text }} />
				{note.list && (
					<div className="my-2">
						<Checklist
							checked={note.checked}
							list={note.list}
							noteUid={note.uid}
							isCheckable={true}
						/>
					</div>
				)}
			</div>
			<div className="flex justify-end wrap items-center bg-green text-white text-xs px-4">
				<Icon handleClick={() => push(`/notes/edit/${note.uid}`)} evenOdd={true}>
					<path
						d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z"
						fillRule="nonzero"
					/>
				</Icon>
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
