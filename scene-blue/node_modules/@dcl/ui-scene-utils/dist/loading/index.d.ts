/// <reference types="dcl" />
/**
 * Displays a loading icon on the center of the screen
 * @param {number} [duration=3] Seconds to display the image onscreen. 0 keeps it on till you hide it manually
 * @param {number} [xOffset=0] Position on X, to enable fitting several counters
 * @param {number} [yOffset=0] Position on Y, to enable fitting several counters
 * @param {number} [scale=1] Multiplier for the size of the bar. 1 = 48 x 64
 *
 */
export declare class LoadingIcon extends Entity {
    image: UIImage;
    canvas: UICanvas;
    constructor(duration?: number, xOffset?: number, yOffset?: number, scale?: number);
    /**
     * Hides the image from view in the screen.
     *
     */
    hide(): void;
    /**
     * Makes an invisible image visible again.
     *
     */
    show(): void;
}
