export default function map<V, R>(
	obj: { [name: string]: V },
	callback: (value: V, key: string, obj: { [name: string]: V }) => R,
): { [name: string]: V } {
	return Object.keys(obj).reduce((acc, key) => {
		const v = callback(obj[key], key, obj);
		if (typeof v !== 'undefined') {
			acc[key] = v;
		}

		return acc;
	}, {}) as any;
}
