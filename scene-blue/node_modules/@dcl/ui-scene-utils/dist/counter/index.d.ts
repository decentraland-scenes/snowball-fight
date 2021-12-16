/// <reference types="dcl" />
/**
 * Displays a number on the center of the UI
 *
 * @param {number} value starting value
 * @param {number} [xOffset=0] position on X, to enable fitting several counters
 * @param {number} [yOffset=0] position on Y, to enable fitting several counters
 * @param {Color4} [color=Color4.White()] text color
 * @param {number} [size=25] text size
 * @param {boolean} bordersOff remove black border around text
 * @param {boolean} fixedDigits display a specific amount of digits, regardless of the value, adding preceding 0s
 *
 */
export declare class UICounter extends Entity {
    valueAsNum: number;
    uiText: UIText;
    canvas: UICanvas;
    fixedDigits: number | null;
    constructor(value: number, xOffset?: number, yOffset?: number, color?: Color4, size?: number, bordersOff?: boolean, fixedDigits?: number);
    /**
     * Get the current value of the counter
     *  * @return {number} The current value of the counter
     *
     */
    read(): number;
    /**
     * Increase the value on the counter.
     *
     * @param {number} [amount=1] How much to increase the counter. By default it increases by 1
     *
     */
    increase(amount?: number): void;
    /**
     * Decrease the value on the counter.
     *
     * @param {number} [amount=1] How much to decrease the counter. By default it decreases by 1
     *
     */
    decrease(amount?: number): void;
    /**
     * Sets the counter's value to a specific amount, regardless of what it was before.
     *
     * @param {number} amount New value for the counter
     *
     */
    set(amount: number): void;
    /**
     * Hides the counter from view in the screen. Its values can still be changed and read while hidden.
     */
    hide(): void;
    /**
     * Makes an invisible counter visible again.
     */
    show(): void;
    private toFixedLengthString;
}
