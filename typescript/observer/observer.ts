import { print } from "../helper";

interface Observable {
    subscribe: (observer: Notifiable) => void;
    detach: (observer: Notifiable) => void;
    notify: () => void;
}

interface Notifiable {
    update: (payload: Record<string, string>) => void;
}

class ObserverList<T> {
    private list: T[] = [];

    public add(obj: T): void {
        this.list.push(obj);
    }

    public count(): number {
        return this.list.length;
    }

    public get(index: number): T {
        if (index < 0 || index > this.count()) {
            throw new Error("Invalid observer index");
        }
        return this.list[index];
    }

    public remove(observer: T): void {
        this.list.splice(this.list.indexOf(observer), 1);
    }
}

class Subject implements Observable {
    private observers = new ObserverList<Notifiable>();

    public subscribe(observer: Notifiable): void {
        this.observers.add(observer);
    }

    public detach(observer: Notifiable): void {
        this.observers.remove(observer);
    }

    public notify(): void {
        const observerCount = this.observers.count();
        for (let i = 0; i < observerCount; i++) {
            this.observers.get(i).update(this.context());
        }
    }

    public context(): {
        name: string,
        id: string,
        message: string
    } {
        return {
            name: "Subject",
            id: "5e6twgh3829djksnod090223",
            message: "New message"
        };
    }
}

class Observer implements Notifiable {
    constructor(private name: string) { }

    public update(payload: Record<string, string>): void {
        print("updating... ", this.name);
        print(`ID: ${payload.id};`, `MESSAGE: ${payload.message}`);
        print(this.name, " Done.");
    }
}


// ============================================================
//   Example Usage                                           //
// ===========================================================

const subject = new Subject();
const observer1 = new Observer("Observer1");
const observer2 = new Observer("Observer2");
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify();
subject.detach(observer1);
subject.notify();
