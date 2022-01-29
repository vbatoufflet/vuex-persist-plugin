import {Plugin, Store} from "vuex";

import {PersistConfig} from "@/types";

const defaultConfig: PersistConfig<unknown> = {
    debounce: 250,
    key: "vuex-persist",
    storage: window.localStorage,
    unloadSave: false,
};

export class Persist<T> {
    private config: PersistConfig<T>;

    constructor(config: Partial<PersistConfig<T>>) {
        this.config = Object.assign({}, defaultConfig, config);
    }

    public plugin(): Plugin<T> {
        return (store: Store<T>) => {
            let timeout: number | null = null;

            // Restore state from storage, then subscribe to mutations to keep
            // it in-sync with live changes.
            try {
                const value = this.config.storage.getItem(this.config.key);
                if (value !== null) {
                    store.replaceState(Object.assign({}, store.state, JSON.parse(value)));
                }
            } catch {}

            // eslint-disable-next-line @typescript-eslint/naming-convention
            store.subscribe((_mutation, state) => {
                if (timeout !== null) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(() => this.save(state), this.config.debounce);
            });

            if (this.config.unloadSave) {
                // Ensure state is saved before unloading the page
                window.addEventListener("beforeunload", () => {
                    if (timeout !== null) {
                        clearTimeout(timeout);
                    }

                    this.save(store.state);
                });
            }
        };
    }

    private save(state: T): void {
        this.config.storage.setItem(
            this.config.key,
            JSON.stringify(this.config.reduce?.(state) ?? state),
        );
    }
}

export default Persist;
