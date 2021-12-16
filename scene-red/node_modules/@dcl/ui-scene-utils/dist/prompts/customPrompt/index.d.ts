/// <reference types="dcl" />
import { PromptStyles, ButtonStyles, SwitchStyles, ImageSection } from '../../utils/types';
/**
 * Creates a prompt object that includes a background and a close icon, and supports adding as many custom UI elements as desired
 *
 * @param {PromptStyles| string} style: Pick from a few predefined options of color, shape and size, or provide the string path to a custom image
 * @param {number} width Background width
 * @param {number} height Background height
 * @param {boolean} startHidden If true, prompt starts invisible to load in the background till calling the `show()` function of the prompt object.
 */
export declare class CustomPrompt extends Entity {
    elements: (CustomPromptText | CustomPromptIcon | CustomPromptSwitch | CustomPromptCheckBox | CustomPromptButton | CustomPromptTextBox)[];
    texture: Texture;
    darkTheme: boolean;
    background: UIImage;
    closeIcon: UIImage;
    UIOpenTime: number;
    canvas: UICanvas;
    constructor(style?: PromptStyles | string, width?: number, height?: number, startHidden?: boolean);
    /**
     * Hides the prompt from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible prompt visible again.
     */
    show(): void;
    /**
     * Adds a text UI element to the custom prompt
     * @param {string} value Text to display
     * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {Color4} color Color of the text. By default black over light themes and white over dark themes
     * @param {number} size Font size
     */
    addText(value: string, posX: number, posY: number, color?: Color4, size?: number): CustomPromptText;
    /**
     * Adds a button UI element to the custom prompt
     * @param {string} label Text to display as a label
     * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {() => void} onClick Function to call every time the button is clicked
     * @param {ButtonStyles} style Appearance of the button, selecting from several predefined options for different colors and shapes
     */
    addButton(label: string, posX: number, posY: number, onClick: () => void, style?: ButtonStyles): CustomPromptButton;
    /**
     * Adds a checkbox UI element to the custom prompt
     * @param {string} label Text to display on the right of the box
     * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {() => void} onCheck Function to call every time the box is checked
     * @param {() => void} onUncheck Function to call every time the box is unchecked
     * @param {ButtonStyles} style Appearance of the button, selecting from several predefined options for different colors and shapes
     * @param {boolean} large Makes the checkbox significantly larger
     * @param {boolean} startChecked Starts the checkbox in a default state of already checked
     */
    addCheckbox(label: string, posX: number, posY: number, onCheck?: () => void, onUncheck?: () => void, large?: boolean, startChecked?: boolean): CustomPromptCheckBox;
    /**
     * Adds a switch UI element to the custom prompt
     * @param {string} label Text to display on the right of the switch
     * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {() => void} onCheck Function to call every time the switch is activated
     * @param {() => void} onUncheck Function to call every time the switch is deactivated
     * @param {SwitchStyles} style Appearance of the switch, selecting from several predefined options for different colors and shapes
     * @param {boolean} startChecked Starts the switch in a default state of already activated
     */
    addSwitch(label: string, posX: number, posY: number, onCheck?: () => void, onUncheck?: () => void, style?: SwitchStyles, startChecked?: boolean): CustomPromptSwitch;
    /**
     * Adds a switch UI element to the custom prompt
     * @param {string} image Path to the image file
     * @param {number} [xOffset=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [yOffset=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {number} [width=0] Width of the image
     * @param {number} [height=0] Height of the image
     * @param {ImageSection} section ImageSection object to specify a specific region of the image file
     */
    addIcon(image: string, xOffset: number, yOffset: number, width?: number, height?: number, section?: ImageSection): CustomPromptIcon;
    /**
     * Adds a textbox UI element to the custom prompt, for the player to fill in an input value
     * @param {number} [posX=0] Position on X on the prompt, counting from the center of the prompt
     * @param {number} [posY=0] Position on Y on the prompt, counting from the center of the prompt
     * @param {string} placeholder Default string to display in the box
     * @param {e: string => void} onChange Function to call every time the value in the text box is modified by the player
     */
    addTextBox(posX: number, posY: number, placeholder?: string, onChange?: (e: string) => void): CustomPromptTextBox;
}
/**
 * A button UI element to use in a custom prompt
 */
export declare class CustomPromptButton extends Entity {
    label: UIText;
    image: UIImage;
    icon: UIImage | null;
    constructor(parent: CustomPrompt, texture: Texture, UIOpenTime: number, label: string, posX: number, posY: number, onClick: () => void, style?: ButtonStyles);
    /**
     * Hides the item from view in the screen. It can't be clicked while invisible.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
    /**
     * Grays out the item so it can't be clicked.
     */
    grayOut(): void;
    /**
     * The opposite action of graying out, so it can't be clicked again.
     */
    enable(): void;
}
/**
 * A checkbox UI element to use in a custom prompt
 */
export declare class CustomPromptCheckBox extends Entity {
    label: UIText;
    image: UIImage;
    checked: boolean;
    private darkTheme;
    private large;
    constructor(parent: CustomPrompt, texture: Texture, darkTheme: boolean, label: string, posX: number, posY: number, onCheck?: () => void, onUncheck?: () => void, large?: boolean, startChecked?: boolean);
    /**
     * Hides the item from view in the screen. It can't be clicked while invisible.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
    /**
     * Sets the box state to checked.
     */
    uncheck(): void;
    /**
     * Sets the box state to unchecked.
     */
    check(): void;
}
/**
 * A switch UI element to use in a custom prompt
 */
export declare class CustomPromptSwitch extends Entity {
    label: UIText;
    image: UIImage;
    checked: boolean;
    private darkTheme;
    private style;
    constructor(parent: CustomPrompt, texture: Texture, darkTheme: boolean, label: string, posX: number, posY: number, onCheck?: () => void, onUncheck?: () => void, style?: SwitchStyles, startChecked?: boolean);
    /**
     * Hides the item from view in the screen. It can't be clicked while invisible.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
    /**
     * Sets the switch state to activated.
     */
    check(): void;
    /**
     * Sets the switch state to deactivated.
     */
    uncheck(): void;
}
/**
 * An icon UI element to use in a custom prompt, by default 128x128 pixels.
 */
export declare class CustomPromptIcon extends Entity {
    image: UIImage;
    constructor(parent: CustomPrompt, texture: Texture, xOffset: number, yOffset: number, width?: number, height?: number, section?: ImageSection);
    /**
     * Hides the item from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
}
/**
 * A text UI element to use in a custom prompt
 */
export declare class CustomPromptText extends Entity {
    text: UIText;
    constructor(parent: CustomPrompt, value: string, posX: number, posY: number, darkTheme?: boolean, color?: Color4, size?: number);
    /**
     * Hides the item from view in the screen.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
}
/**
 * A textbox UI element to use in a custom prompt
 */
export declare class CustomPromptTextBox extends Entity {
    fillInBox: UIInputText;
    currentText: string;
    constructor(parent: CustomPrompt, posX: number, posY: number, placeholder?: string, onChange?: (e: string) => void);
    /**
     * Hides the item from view in the screen. It can't be clicked while invisible.
     */
    hide(): void;
    /**
     * Makes an invisible item visible again.
     */
    show(): void;
}
