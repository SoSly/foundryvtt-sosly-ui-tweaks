import {id as MODULE_ID} from '../../module.json';

/**
 * Valid tray slide directions.
 * @typedef {'down' | 'right' | 'left' | 'up'} TrayDirection
 */

/**
 * Configuration options for creating a Tray instance.
 * @typedef {Object} TrayOptions
 * @property {HTMLElement} container - The element to apply collapsed class to
 * @property {TrayDirection} direction - Direction the tray slides when collapsed
 * @property {string} settingKey - Module setting key for persisting collapsed state
 * @property {HTMLElement} buttonContainer - Element to inject the toggle button into
 * @property {'append' | 'prepend'} [buttonPosition='append'] - Where to insert the toggle button
 * @property {string} [expandedIcon='fa-chevron-down'] - FontAwesome icon class when expanded
 * @property {string} [collapsedIcon='fa-chevron-up'] - FontAwesome icon class when collapsed
 * @property {string} [expandedTooltip] - Tooltip when expanded (defaults to i18n lookup)
 * @property {string} [collapsedTooltip] - Tooltip when collapsed (defaults to i18n lookup)
 */

/**
 * A reusable tray component that handles collapse/expand behavior.
 * The component manages state and toggle button; CSS handles the actual animation
 * based on the `.collapsed` class and `data-tray-direction` attribute.
 */
export class Tray {
    /**
     * @param {TrayOptions} options
     */
    constructor(options) {
        this.container = options.container;
        this.direction = options.direction;
        this.settingKey = options.settingKey;
        this.buttonContainer = options.buttonContainer;
        this.buttonPosition = options.buttonPosition ?? 'append';
        this.expandedIcon = options.expandedIcon ?? 'fa-chevron-down';
        this.collapsedIcon = options.collapsedIcon ?? 'fa-chevron-up';
        this.expandedTooltip = options.expandedTooltip ?? game.i18n.localize(`${MODULE_ID}.tray.collapse`);
        this.collapsedTooltip = options.collapsedTooltip ?? game.i18n.localize(`${MODULE_ID}.tray.expand`);

        this.button = null;
        this._initialize();
    }

    /**
     * Initialize the tray: set direction attribute, create button, apply initial state.
     * @private
     */
    _initialize() {
        this.container.dataset.trayDirection = this.direction;

        this._createButton();

        const collapsed = game.settings.get(MODULE_ID, this.settingKey);
        this._applyState(collapsed);
    }

    /**
     * Create and inject the toggle button.
     * @private
     */
    _createButton() {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.classList.add('ui-control', 'icon', 'sosly-tray-toggle');
        this.button.addEventListener('click', this._onToggle.bind(this));

        if (this.buttonPosition === 'prepend') {
            this.buttonContainer.prepend(this.button);
        } else {
            this.buttonContainer.append(this.button);
        }
    }

    /**
     * Handle toggle button click.
     * @private
     */
    async _onToggle() {
        const currentState = this.container.classList.contains('collapsed');
        const newState = !currentState;

        await game.settings.set(MODULE_ID, this.settingKey, newState);
        this._applyState(newState);
    }

    /**
     * Apply the collapsed or expanded state to the container and button.
     * @param {boolean} collapsed - Whether the tray should be collapsed
     * @private
     */
    _applyState(collapsed) {
        if (collapsed) {
            this.container.classList.add('collapsed');
            this.button.classList.remove('fa-solid', this.expandedIcon);
            this.button.classList.add('fa-solid', this.collapsedIcon);
            this.button.dataset.tooltip = this.collapsedTooltip;
        } else {
            this.container.classList.remove('collapsed');
            this.button.classList.remove('fa-solid', this.collapsedIcon);
            this.button.classList.add('fa-solid', this.expandedIcon);
            this.button.dataset.tooltip = this.expandedTooltip;
        }
    }
}
