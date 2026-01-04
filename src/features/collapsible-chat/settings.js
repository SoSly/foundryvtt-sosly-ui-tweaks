import {id as MODULE_ID} from '../../../module.json';

export function registerCollapsibleChatSettings() {
    game.settings.register(MODULE_ID, 'chatCollapsed', {
        name: game.i18n.localize(`${MODULE_ID}.settings.chatCollapsed.label`),
        hint: game.i18n.localize(`${MODULE_ID}.settings.chatCollapsed.hint`),
        scope: 'client',
        config: false,
        type: Boolean,
        default: false
    });
}
