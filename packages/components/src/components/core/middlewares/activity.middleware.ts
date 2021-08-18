import {ActivityMiddleware} from "botframework-webchat-api";
import {LegacyActivityRenderer} from "botframework-webchat-api/lib/types/ActivityMiddleware";
import {ActivityComponentFactoryOptions} from "../types/activity.types";


export class ActivityMiddlewares{

    constructor() {
        console.log('ActivityMiddleware -> Init done!');
    }

    get transformer(): ActivityMiddleware {
        return this.#transformer;
    }

    #transformer: ActivityMiddleware = () => (next: LegacyActivityRenderer): LegacyActivityRenderer => ((options: ActivityComponentFactoryOptions)  => {
        const render = next(options);
        console.log('ActivityMiddleware -> Transformer Args:', render, next, options);
        if (render){
            return (...renderArgs: any[]) => {
                // @ts-ignore
                const element = render(...renderArgs);
                const card = options;
                console.log('ActivityMiddleware -> Transformer Return functions IO:', renderArgs, element, card);
                return element;
            };
        }
    }) as LegacyActivityRenderer;

}
