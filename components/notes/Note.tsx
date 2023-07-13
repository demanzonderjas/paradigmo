import { TNote } from "@/typings/notes";
import { useRouter } from "next/router";
import { DateString } from "../layout/DateString";
import { Checklist } from "../checklist/Checklist";
import { Icon } from "../layout/Icon";
import { isLink } from "../../utils/validation";

export const Note: React.FC<TNote> = (note) => {
	const { push, pathname } = useRouter();
	const isView = /view/.test(pathname);

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
				{!isView && (
					<Icon handleClick={() => push(`/notes/view/${note.uid}`)} evenOdd={true}>
						<path
							d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
							fillRule="nonzero"
						/>
					</Icon>
				)}
			</div>
			<div className="flex justify-between wrap bg-orange text-white text-xs px-4 py-1">
				<div className="source">
					{isLink(note.source) ? (
						<a href={note.source} target="_blank">
							{note.source}
						</a>
					) : (
						note.source
					)}
				</div>
				<div className="timestamp">
					<DateString timestamp={note.timestamp} />
				</div>
			</div>
		</div>
	);
};
