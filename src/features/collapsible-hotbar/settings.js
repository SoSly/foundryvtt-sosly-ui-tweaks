import {id as MODULE_ID} from '../../../module.json';

export function registerCollapsibleHotbarSettings() {
    game.settings.register(MODULE_ID, 'hotbarCollapsed', {
        name: game.i18n.localize(`${MODULE_ID}.settings.hotbarCollapsed.label`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.hotbarCollapsed.hint`),
        scope: 'client',
        config: false,
        type: Boolean,
        default: false
    });
}
