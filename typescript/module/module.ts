import { print } from '../helper';
// Object Literals
// As from typescipt 2.1 a `Record` type
// was added to represent key/value pairs
// common with pbject literals
const ObjLitMod: Record<string, any> = {
    prop: 'SomeProp',
    func: function() {
        print('Disguised Rustacean!');
    },
    config: {
        value: '🤷‍',
        language: 'Igbo'
    },
    logConfig: function() {
        print(`I hear you speak good ${this.config.language}?\nMe: ${this.config.value}`);
    }
}

ObjLitMod.func();
ObjLitMod.logConfig();

// The Module Pattern
// TypeScript allows for a classical
// object oriented programming language behaviour
// by providing access modifiers, and class keywords like `static`, `readonly`
// The export keyword mainly does two things:
// 1. creates a Javascript IIFEs
// 2. exports the variable as a property of the current module
// Our API users can import this class with any name
export class ModPattern {
// uncomment the line below and comment out above to export this class and the its name
// export default class ModPattern {
    public name: string;
    private password: string;

    public createUser(data: { name: string, password: string}) {
        this.name = data.name;
        this.password = this.hash(data.password);
        print(this);
    }

    private hash(text: string) {
        return text.split('').reverse().join('');
    }
}

const mod = new ModPattern();
mod.createUser({ name: 'Tom', password: 'secret' });
