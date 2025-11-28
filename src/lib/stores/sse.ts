import { writable, type Writable } from 'svelte/store';

export type SseStatus = 'connecting' | 'open' | 'error' | 'closed';

export type SseState<T> = {
    data: T | null;
    status: SseStatus;
    error: string | null;
    lastUpdated: Date | null;
};

export type SseOptions<T> = {
    withCredentials?: boolean;
    transform?: (json: any) => T;
};

export function createSseStore<T>(url: string, options?: SseOptions<T>) {
    const withCredentials = options?.withCredentials ?? true;
    const transform = options?.transform ?? ((json: any) => json as T);

    let es: EventSource | null = null;
    const initial: SseState<T> = { data: null, status: 'connecting', error: null, lastUpdated: null };
    const store: Writable<SseState<T>> = writable(initial);

    function open() {
        // Ensure closed before opening
        es?.close();
        es = new EventSource(url, { withCredentials } as EventSourceInit);

        es.onopen = () => {
            store.update((s) => ({ ...s, status: 'open', error: null }));
        };

        es.onmessage = (ev: MessageEvent<string>) => {
            try {
                const parsed = transform(JSON.parse(ev.data));
                store.update((s) => ({ ...s, data: parsed, status: 'open', error: null, lastUpdated: new Date() }));
            } catch (e) {
                store.update((s) => ({ ...s, status: 'error', error: 'Failed to parse SSE message' }));
            }
        };

        es.onerror = () => {
            // EventSource will auto-reconnect by default; reflect error state meanwhile
            store.update((s) => ({ ...s, status: 'error' }));
        };
    }

    function close() {
        es?.close();
        es = null;
        store.update((s) => ({ ...s, status: 'closed' }));
    }

    function reconnect() {
        close();
        store.update((s) => ({ ...s, status: 'connecting' }));
        open();
    }

    // Auto open only in the browser to avoid SSR issues
    if (typeof window !== 'undefined') {
        open();
    }

    return {
        subscribe: store.subscribe,
        close,
        reconnect,
    };
}
