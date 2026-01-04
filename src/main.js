import {registerClassicRollModeFeature} from './features/classic-roll-mode/index.js';
import {registerCollapsibleChatFeature} from './features/collapsible-chat/index.js';
import {registerCollapsibleHotbarFeature} from './features/collapsible-hotbar/index.js';
import {registerHorizontalNavigationFeature} from './features/horizontal-navigation/index.js';

Hooks.once('init', async () => {
    console.log('SoSly UI Tweaks | Initializing');
    registerClassicRollModeFeature();
    registerCollapsibleChatFeature();
    registerCollapsibleHotbarFeature();
    registerHorizontalNavigationFeature();
});
