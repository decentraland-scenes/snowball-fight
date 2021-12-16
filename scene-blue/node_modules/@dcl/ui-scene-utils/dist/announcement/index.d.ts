/// <reference types="dcl" />
/**
 * Displays text in the center of the UI for a specific time
 *
 * @param {string} value string to display
 * @param {duration} duration time to keep the text visible (in seconds). Default: 3 seconds.
 * @param {Color4} [color=Color.Yellow()] text color, as a Color4. Default: black
 * @param {number} [size=60] font size, default 60
 * @param {boolean} bordersOff if true, text won't have a black margin around it
 *
 */
export declare function displayAnnouncement(value: string, duration?: number, color?: Color4, size?: number, bordersOff?: boolean): void;
/**
 * Hides any announcement text that might be visible
 */
export declare function hideAnnouncements(): void;
