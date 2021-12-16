/// <reference types="dcl" />
import { ImageSection } from '../utils/types';
/**
 * Displays an icon of 64x64 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export declare class MediumIcon extends Entity {
    image: UIImage;
    canvas: UICanvas;
    constructor(image: string, xOffset?: number, yOffset?: number, width?: number, height?: number, section?: ImageSection);
    /**
     * Hides the image from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible image visible again.
     * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
     */
    show(duration?: number): void;
}
/**
 * Displays an icon of 32x32 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export declare class SmallIcon extends Entity {
    image: UIImage;
    canvas: UICanvas;
    constructor(image: string, xOffset?: number, yOffset?: number, width?: number, height?: number, section?: ImageSection);
    /**
     * Hides the image from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible image visible again.
     * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
     */
    show(duration?: number): void;
}
/**
 * Displays an icon of 128x128 on the bottom-left corner
 *
 * @param {string} image path to image file
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width (128 by default)
 * @param {number} height image height (128 by default)
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export declare class LargeIcon extends Entity {
    image: UIImage;
    canvas: UICanvas;
    constructor(image: string, xOffset?: number, yOffset?: number, width?: number, height?: number, section?: ImageSection);
    /**
     * Hides the image from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible image visible again.
     * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
     */
    show(duration?: number): void;
}
/**
 * Displays an image of 512x512 on the center of the screen for limited time
 *
 * @param {string} image path to image file
 * @param {number} duration seconds to display the image onscreen. 0 keeps it on till you hide it
 * @param {number} xOffset position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {number} width image width
 * @param {number} height image height
 * @param {ImageSection} section cut out a section of the imge, as an object specifying sourceLeft, sourceTop, sourceWidth and sourceHeight
 * @param {boolean} startHidden if true, image starts invisible to load in the background till it runs its show() function.
 *
 */
export declare class CenterImage extends Entity {
    image: UIImage;
    canvas: UICanvas;
    constructor(image: string, duration: number, startHidden?: boolean, xOffset?: number, yOffset?: number, width?: number, height?: number, section?: ImageSection);
    /**
     * Hides the image from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible image visible again.
     * @param {number} duration Seconds to display the image onscreen. If no value is provided, it stays visible.
     */
    show(duration?: number): void;
}
