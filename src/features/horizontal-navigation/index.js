import {id as MODULE_ID} from '../../../module.json';
import {registerHorizontalNavigationSettings} from './settings.js';

export function registerHorizontalNavigationFeature() {
    registerHorizontalNavigationSettings();

    if (!game.settings.get(MODULE_ID, 'horizontalNavigation')) {
        return;
    }

    Hooks.on('renderSceneNavigation', onRenderSceneNavigation);
}

function onRenderSceneNavigation() {
    document.body.classList.add('horizontal-navigation');
}
