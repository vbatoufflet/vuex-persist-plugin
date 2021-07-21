import {Plugin} from "vuex";

export interface PersistConfig<T> {
    debounce: number;
    key: string;
    storage: Storage;
    unloadSave: boolean;
    reduce?(state: T): Partial<T>;
}

export class Persist<T> {
    constructor(config: Partial<PersistConfig<T>>);

    public plugin(): Plugin<T>;
}

export default Persist;
