import {Tray} from '../../components/Tray.js';
import {registerCollapsibleChatSettings} from './settings.js';

let trayInitialized = false;

export function registerCollapsibleChatFeature() {
    registerCollapsibleChatSettings();

    Hooks.on('renderChatInput', onRenderChatInput);
}

function onRenderChatInput(chatLog, elements) {
    document.body.classList.add('sosly-collapsible-chat');

    if (trayInitialized) {
        return;
    }

    const chatNotifications = document.getElementById('chat-notifications');
    const rightColumn = document.getElementById('ui-right-column-1');

    if (!chatNotifications || !rightColumn) {
        return;
    }

    new Tray({
        container: chatNotifications,
        direction: 'right',
        settingKey: 'chatCollapsed',
        buttonContainer: rightColumn,
        buttonPosition: 'append',
        expandedIcon: 'fa-chevron-right',
        collapsedIcon: 'fa-chevron-left'
    });

    trayInitialized = true;
}
