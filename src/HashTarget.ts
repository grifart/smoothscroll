/**
 * Represents valid hash as per https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash
 */
export class HashTarget
{
	private constructor(
		private readonly value: string,
		private readonly targetElement: HTMLElement,
	) {}

	public static fromString(value: string, document: HTMLDocument): HashTarget
	{
		if (value === '' || value === '#') {
			throw new Error('Hash does not contain any fragment.');
		}

		const targetElementId = value.substring(1);
		const targetElement = document.getElementById(targetElementId);
		if (targetElement === null) {
			throw new Error(`No referenced element with ID ${targetElementId} exists.`);
		}

		return new this(value, targetElement);
	}

	public getHash(): string
	{
		return this.value;
	}

	public getElement(): HTMLElement
	{
		return this.targetElement;
	}
}
