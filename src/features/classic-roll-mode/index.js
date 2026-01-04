import {id as MODULE_ID} from '../../../module.json';
import {registerClassicRollModeSettings} from './settings.js';

let selectElement = null;

export function registerClassicRollModeFeature() {
    registerClassicRollModeSettings();

    if (!game.settings.get(MODULE_ID, 'classicRollMode')) {
        return;
    }

    Hooks.on('renderChatInput', onRenderChatInput);
}

function onRenderChatInput(chatLog, elements) {
    document.body.classList.add('sosly-classic-roll-mode');

    const rollPrivacy = elements['#roll-privacy'];
    const chatMessage = elements['#chat-message'];
    const chatControls = elements['#chat-controls'];
    if (!rollPrivacy || !chatMessage || !chatControls) {
        return;
    }

    rollPrivacy.style.display = 'none';

    if (!selectElement) {
        selectElement = createRollModeSelect();
    }

    const inSidebar = chatMessage.closest('.chat-form') !== null;
    if (inSidebar) {
        chatControls.insertBefore(selectElement, rollPrivacy);
    } else {
        chatMessage.parentNode.insertBefore(selectElement, chatMessage);
    }
}

function createRollModeSelect() {
    const select = document.createElement('select');
    select.name = 'rollMode';
    select.classList.add('roll-type-select');
    select.setAttribute('aria-label', game.i18n.localize('CHAT.RollVisibility'));

    const currentMode = game.settings.get('core', 'rollMode');
    for (const [mode, config] of Object.entries(CONFIG.Dice.rollModes)) {
        const option = document.createElement('option');
        option.value = mode;
        option.textContent = game.i18n.localize(config.label);
        option.selected = mode === currentMode;
        select.appendChild(option);
    }

    select.addEventListener('change', event => {
        game.settings.set('core', 'rollMode', event.target.value);
    });

    return select;
}
