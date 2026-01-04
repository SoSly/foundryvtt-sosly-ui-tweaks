import {id as MODULE_ID} from '../../../module.json';

export function registerHorizontalNavigationSettings() {
    game.settings.register(MODULE_ID, 'horizontalNavigation', {
        name: game.i18n.localize('sosly-ui-tweaks.settings.horizontalNavigation.label'),
        hint: game.i18n.localize('sosly-ui-tweaks.settings.horizontalNavigation.hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true,
        requiresReload: true
    });
}
