/// <reference types="dcl" />
/**
 * Displays a number on the center of the UI
 *
 * @param {string} value string value
 * @param {number} [xOffset=0] position on X, to enable fitting several UI elements
 * @param {number} [yOffset=0] position on Y, to enable fitting several UI elements
 * @param {Color4} [color Color4.White()] text color
 * @param {number} [size=25] text size
 * @param {boolean} bordersOff if true, text won't have a black margin around it
 *
 */
export declare class CornerLabel extends Entity {
    uiText: UIText;
    canvas: UICanvas;
    constructor(value: string, xOffset?: number, yOffset?: number, color?: Color4, size?: number, bordersOff?: boolean);
    /**
     * Hides the label from view in the screen. Its values can still be changed and read while hidden.
     */
    hide(): void;
    /**
     * Makes an label counter visible again.
     */
    show(): void;
    /**
     * Sets the label's value to a new string.
     *
     * @param {string} newString New value for the label
     *
     */
    set(newString: string): void;
}
