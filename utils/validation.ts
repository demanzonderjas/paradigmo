export function isLink(str: string) {
	if (!str || typeof str !== "string") {
		return false;
	}
	return /https?:\/\//.test(str);
}
