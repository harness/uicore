import { MouseEvent, KeyboardEvent } from 'react';
import copy from 'clipboard-copy';
declare function stopEvent(event: MouseEvent | KeyboardEvent): void;
declare const Utils: {
    stopEvent: typeof stopEvent;
    copy: typeof copy;
};
export { Utils };
