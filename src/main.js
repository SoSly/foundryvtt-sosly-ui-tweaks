import {registerHorizontalNavigationFeature} from './features/horizontal-navigation/index.js';

Hooks.once('init', async () => {
    console.log('SoSly UI Tweaks | Initializing');
    registerHorizontalNavigationFeature();
});
