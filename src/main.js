import {registerCollapsibleHotbarFeature} from './features/collapsible-hotbar/index.js';
import {registerHorizontalNavigationFeature} from './features/horizontal-navigation/index.js';

Hooks.once('init', async () => {
    console.log('SoSly UI Tweaks | Initializing');
    registerCollapsibleHotbarFeature();
    registerHorizontalNavigationFeature();
});
