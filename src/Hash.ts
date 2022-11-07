/**
 * Represents valid hash as per https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash
 */
export class Hash
{
	private constructor(
		private readonly value: string,
	) {}

	public static fromString(value: string): Hash
	{
		if (value === '' || value === '#') {
			throw new Error('Hash does not contain any fragment.');
		}

		return new this(value);
	}

	public getValue(): string
	{
		return this.value;
	}

	public findTargetElementIn(document: HTMLDocument): HTMLElement
	{
		const targetElementId = this.value.substring(1);
		const targetElement = document.getElementById(targetElementId);
		if (targetElement === null) {
			throw new Error(`No referenced element with ID ${targetElementId} exists.`);
		}

		return targetElement;
	}
}
