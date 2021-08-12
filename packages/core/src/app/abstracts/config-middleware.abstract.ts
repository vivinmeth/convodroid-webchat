import {v4 as uuidV4} from "uuid";

export class ConfigMiddlewareAbstract{

    protected ConfigLocked = false;
    #LockSecret?: string;

    constructor() {
        console.log();
    }

    configLockLogic(): void{}

    lockConfig(): [boolean, string | undefined]{
        if (!this.ConfigLocked){
            this.configLockLogic();
            this.ConfigLocked = true;
            this.#LockSecret = uuidV4();
            console.log('Config Locked!');
        }
        else{
            console.warn('Config Already Locked!');
        }
        return [true, this.#LockSecret];

    }

    unlockConfig(LockSecret: string): void{
        if (LockSecret === this.#LockSecret){
            this.ConfigLocked = false;
        }
        else {
            console.error('Invalid LockSecret. Unlock failed!');
        }
    }
}
