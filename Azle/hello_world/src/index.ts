import { IDL, query, update } from 'azle';

export default class {
    message: string = 'Hello world!';

    //methods
    @query([], IDL.Text)
    getMessage(): string {
        return this.message;
    }

    @update([IDL.Text])
    setMessage(message: string): void {
        this.message = message;
    }

    @update([], IDL.Text)
    neutralizeMessage(): string {
        this.message = 'Neutralized!';
        return this.message;
    }
   
    }

