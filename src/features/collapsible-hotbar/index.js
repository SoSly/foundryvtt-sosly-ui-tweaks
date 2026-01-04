import {Tray} from '../../components/Tray.js';
import {registerCollapsibleHotbarSettings} from './settings.js';

/**
 * Track whether we've already set up the tray for this hotbar render.
 * Prevents duplicate button injection on re-renders.
 * @type {boolean}
 */
let trayInitialized = false;

export function registerCollapsibleHotbarFeature() {
    registerCollapsibleHotbarSettings();

    Hooks.on('renderHotbar', onRenderHotbar);
}

/**
 * Handle the renderHotbar hook.
 * Sets up the collapsible tray behavior on the hotbar.
 * @param {Hotbar} app - The Hotbar application instance
 * @param {jQuery|HTMLElement} html - The rendered HTML element
 */
function onRenderHotbar(app, html) {
    document.body.classList.add('sosly-collapsible-hotbar');

    if (trayInitialized) {
        return;
    }

    const element = html instanceof jQuery ? html[0] : html;
    const leftControls = element.querySelector('#hotbar-controls-left');

    if (!leftControls) {
        return;
    }

    new Tray({
        container: element,
        direction: 'down',
        settingKey: 'hotbarCollapsed',
        buttonContainer: leftControls,
        buttonPosition: 'prepend'
    });

    trayInitialized = true;
}
