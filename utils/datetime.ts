export const getDateFromKey = (key: string) => {
	let PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
	let id = key.substring(0, 8);
	let timestamp = 0;
	for (let i = 0; i < id.length; i++) {
		let c = id.charAt(i);
		timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c);
	}
	return new Date(timestamp);
};
