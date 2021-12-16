/// <reference types="dcl" />
/// <reference types="env" />
import { RecursivePartial } from "./commons/shared";
import { UIBase } from "./commons/UIBase";
export declare class UISearchPrompt extends UIBase<UIContainerRect> {
    private readonly onSuccessfulSelection;
    static readonly DEFAULTS: UISearchPromptConfig;
    private readonly config;
    private readonly inputText;
    private readonly insideContainer;
    private readonly errorMessage;
    private readonly uiOptions;
    private options;
    private defaultOptions;
    constructor(parent: UIShape, searchItems: {
        items: SearchPromptOption[];
        dropdownDefaultItemIds?: string[];
    }, initialConfig: UISearchPromtInitialProperties, onSuccessfulSelection: (selected: SearchPromptOption) => void);
    /**
     * Opens the search box
     */
    open(): void;
    /**
     * Close the search box
     */
    close(): void;
    /**
     * Sets all options available on the search box
     */
    setItems(options: SearchPromptOption[], dropdownDefaults?: string[]): void;
    /**
     * Sets the options with the given ids as the ones that will be shown when there is no text on the search box
     */
    setDropdownDefaults(defaults: string[]): void;
    private showDefaultOptions;
    private showOptions;
    private hideAllOptions;
    private showErrorMessage;
    private resizeHeight;
}
export declare type SearchPromptOption = {
    id: string;
    searchBy?: string;
    visualText: SearchPromptOptionText;
    image?: {
        src: string;
        sourceWidth: number;
        sourceHeight: number;
    };
};
export declare type UISearchPromptConfig = {
    borderColor: Color4;
    backgroundColor: Color4;
    borderSize: number;
    width: number;
    initialHeight: number;
    search: {
        fontSize: number;
        textColor: Color4;
        placeholder: {
            defaultText: string;
            textColor: Color4;
        };
    };
    options: {
        maxVisibleOptions: number;
        oddBackgroundColor: Color4;
        imageSize: number;
        topFontSize: number;
        bottomFontSize: number;
        topTextColor: Color4;
        bottomTextColor: Color4;
    };
    errorMessage: {
        fontSize: number;
        textColor: Color4;
    };
};
export declare type UISearchPromtInitialProperties = RecursivePartial<Pick<UIContainerRect, 'visible' | 'opacity' | 'hAlign' | 'vAlign' | 'positionX' | 'positionY'> & UISearchPromptConfig>;
declare type SearchPromptOptionText = string | {
    text: string;
    subText: string;
} | {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
};
export {};
