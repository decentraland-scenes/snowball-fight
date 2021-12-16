/// <reference types="dcl" />
import { BarStyles } from '../utils/types';
/**
 * Displays a colored bar that can be filled up and updated to different values.
 *
 * @param {number} value starting value
 * @param {number} [xOffset=0] position on X, to enable fitting several counters
 * @param {number} yOffset position on Y, to enable fitting several counters
 * @param {Color4} fillColor color of the bar
 * @param {BarStyles} style margin style of the bar, from the BarStyles enum
 * @param {number} [scale=1] multiplier for the size of the bar. 1 = 128 x 32
 * @param {boolean} startHidden if true, image starts invisible to load in the background till it runs its show() function.
 *
 */
export declare class UIBar extends Entity {
    valueAsNum: number;
    background: UIImage;
    bar: UIContainerRect;
    canvas: UICanvas;
    fullWidth: number;
    constructor(value: number, xOffset?: number, yOffset?: number, fillColor?: Color4, style?: BarStyles, scale?: number, startHidden?: boolean);
    /**
     * Get the current value of the bar
     *  * @return {number} The current value of the bar, as a value from 0 to 1
     *
     */
    read(): number;
    /**
     * Increase the value on the bar.
     *
     * @param {number} [amount=0.1] How much to increase the bar, up to a maximum of 1. By default it increases by 0.1
     *
     */
    increase(amount?: number): void;
    /**
     * Decrease the value on the bar.
     *
     * @param {number} [amount=0.1] How much to decrease the bar, down to a minimum of 0. By default it decreases by 0.1
     *
     */
    decrease(amount?: number): void;
    /**
     * Sets the bar's value to a specific amount, regardless of what it was before.
     *
     * @param {number} amount New value for the bar, between 0 and 1
     *
     */
    set(amount: number): void;
    /**
     * Hides the bar from view in the screen. Its values can still be changed and read while hidden.
     */
    hide(): void;
    /**
     * Makes an invisible bar visible again.
     */
    show(): void;
}
