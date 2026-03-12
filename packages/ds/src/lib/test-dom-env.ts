import { JSDOM } from "jsdom";

if (!globalThis.window || !globalThis.document) {
	const dom = new JSDOM("<!doctype html><html><body></body></html>");

	globalThis.window = dom.window as unknown as Window & typeof globalThis;
	globalThis.document = dom.window.document;
	globalThis.navigator = dom.window.navigator;
	globalThis.Element = dom.window.Element;
	globalThis.HTMLElement = dom.window.HTMLElement;
	globalThis.Node = dom.window.Node;
	globalThis.MutationObserver = dom.window.MutationObserver;
	globalThis.Event = dom.window.Event;
	globalThis.CustomEvent = dom.window.CustomEvent;
	globalThis.getComputedStyle = dom.window.getComputedStyle;
	globalThis.requestAnimationFrame = (callback: FrameRequestCallback) =>
		dom.window.setTimeout(() => callback(dom.window.performance.now()), 0);
	globalThis.cancelAnimationFrame = (handle: number) => dom.window.clearTimeout(handle);
}
