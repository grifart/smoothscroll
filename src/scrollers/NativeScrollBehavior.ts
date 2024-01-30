type ScrollBehavior = 'auto' | 'smooth' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';

class NativeScrollBehavior
{
	private originalValue: ScrollBehavior|null = null;

	private constructor(
		private readonly rootEl: HTMLHtmlElement,
	) {}

	public static forWindowObject(): NativeScrollBehavior
	{
		return new this(
			document.documentElement as HTMLHtmlElement,
		);
	}


	public remove(): void
	{
		this.originalValue = window.getComputedStyle(this.rootEl).getPropertyValue('scrollBehavior') as ScrollBehavior;
		this.rootEl.style.scrollBehavior = 'unset';
	}

	public restore(): void
	{
		if (this.originalValue === null) {
			return;
		}

		this.rootEl.style.scrollBehavior = this.originalValue;
	}

}

// export singleton instance
export const nativeScrollBehavior = NativeScrollBehavior.forWindowObject();
