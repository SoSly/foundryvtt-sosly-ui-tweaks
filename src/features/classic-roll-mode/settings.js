import {id as MODULE_ID} from '../../../module.json';

export function registerClassicRollModeSettings() {
    game.settings.register(MODULE_ID, 'classicRollMode', {
        name: game.i18n.localize('sosly-ui-tweaks.settings.classicRollMode.label'),
        hint: game.i18n.localize('sosly-ui-tweaks.settings.classicRollMode.hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        requiresReload: true
    });
}
