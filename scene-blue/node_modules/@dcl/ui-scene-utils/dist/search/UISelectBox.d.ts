/// <reference types="dcl" />
import { UIBase } from "./commons/UIBase";
import { SearchPromptOption, UISearchPromtInitialProperties } from "./UISearchPrompt";
export declare class UISelectBox extends UIBase<UIContainerRect> {
    private readonly onSuccessfulSelection;
    private readonly uiSearchPrompt;
    private readonly config;
    private readonly initialText;
    constructor(parent: UIShape, searchItems: {
        items: SearchPromptOption[];
        initialItemId?: string;
        dropdownDefaultItemIds?: string[];
    }, initialConfig: UISearchPromtInitialProperties, onSuccessfulSelection: (selected: SearchPromptOption) => void);
    /**
     * Opens the select box
     */
    open(): void;
    /**
     * Close the select box
     */
    close(): void;
    /**
     * Sets all options available on the select box
     */
    setSearchItems(options: SearchPromptOption[], dropdownDefaults?: string[]): void;
    /**
     * Sets the options with the given ids as the ones that will be shown when there is no text on the select box
     */
    setSearchDropdownDefaults(defaults: string[]): void;
}
