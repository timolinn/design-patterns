import { print } from '../helper';
// Singletons basically prevents two or more
// instances of the object existing at the same
// time
class Singleton {
    private static _instance: Singleton;

    // notice the private keyword on the constructor
    // means we are not allowed to call the new keyword
    // directly on the class
    private constructor(public data: string) {
        this.data = data;
    }

    static getInstance(data: string): Singleton {
        if (!this._instance) {
            this._instance = new Singleton(data);
        }
        return this._instance;
    }
}

const sng = Singleton.getInstance('Valhala');
print(sng.data);
const sng1 = Singleton.getInstance('Isingard');
print(sng1.data);