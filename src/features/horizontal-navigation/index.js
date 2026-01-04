import {id as MODULE_ID} from '../../../module.json';
import {registerHorizontalNavigationSettings} from './settings.js';

/**
 * State for tracking the currently dragged scene during drag-drop operations.
 * @type {Scene|null}
 */
let dragScene = null;

/**
 * State for tracking the current drop target element.
 * @type {HTMLElement|null}
 */
let dropTarget = null;

export function registerHorizontalNavigationFeature() {
    registerHorizontalNavigationSettings();

    if (!game.settings.get(MODULE_ID, 'horizontalNavigation')) {
        return;
    }

    Hooks.on('renderSceneNavigation', onRenderSceneNavigation);
}

/**
 * Handle the renderSceneNavigation hook.
 * Transforms the default two-container layout into a single flat list sorted by navOrder,
 * and sets up drag-drop reordering for GMs.
 * @param {SceneNavigation} app - The SceneNavigation application instance
 * @param {jQuery} html - The rendered HTML element (jQuery wrapped)
 */
function onRenderSceneNavigation(app, html) {
    document.body.classList.add('horizontal-navigation');

    const element = html instanceof jQuery ? html[0] : html;
    const activeMenu = element.querySelector('#scene-navigation-active');
    const inactiveMenu = element.querySelector('#scene-navigation-inactive');

    if (!activeMenu) {
        return;
    }

    // Collect all scene pills from both containers
    const allScenes = [
        ...activeMenu.querySelectorAll('.scene'),
        ...(inactiveMenu?.querySelectorAll('.scene') ?? [])
    ];

    // Sort by navOrder
    allScenes.sort((a, b) => {
        const sceneA = game.scenes.get(a.dataset.sceneId);
        const sceneB = game.scenes.get(b.dataset.sceneId);
        return (sceneA?.navOrder ?? 0) - (sceneB?.navOrder ?? 0);
    });

    // Move all pills into the active menu container (now our single container)
    for (const pill of allScenes) {
        activeMenu.appendChild(pill);
    }

    // Hide the inactive menu since it's now empty
    if (inactiveMenu) {
        inactiveMenu.style.display = 'none';
    }

    // Set up drag-drop for GMs only
    if (game.user.isGM) {
        setupDragDrop(activeMenu);
    }
}

/**
 * Set up drag-drop reordering for scene pills.
 * @param {HTMLElement} container - The container element holding all scene pills
 */
function setupDragDrop(container) {
    new foundry.applications.ux.DragDrop.implementation({
        dragSelector: '.scene',
        dropSelector: '#scene-navigation-active',
        callbacks: {
            dragstart: onDragStart,
            dragover: onDragOver,
            drop: onDrop
        }
    }).bind(container);
}

/**
 * Handle drag start - store reference to the dragged scene.
 * @param {DragEvent} event
 */
function onDragStart(event) {
    const target = event.target.closest('.scene');
    if (!target) {
        return;
    }
    dragScene = game.scenes.get(target.dataset.sceneId);
}

/**
 * Handle drag over - highlight the drop target with visual indicator.
 * @param {DragEvent} event
 */
function onDragOver(event) {
    const target = event.target.closest('.scene');
    if (target === dropTarget) {
        return;
    }

    // Remove previous drop target highlight
    if (dropTarget) {
        dropTarget.classList.remove('drop-target-before', 'drop-target-after');
    }
    dropTarget = target;

    if (!target || !dragScene || target.dataset.sceneId === dragScene.id) {
        return;
    }

    // Determine drop position based on horizontal position within the target
    const rect = target.getBoundingClientRect();
    const midpoint = rect.left + (rect.width / 2);
    const dropClass = event.clientX < midpoint ? 'drop-target-before' : 'drop-target-after';
    target.classList.add(dropClass);
}

/**
 * Handle drop - persist the new order using sortRelative.
 * @param {DragEvent} event
 */
async function onDrop(event) {
    if (dropTarget) {
        dropTarget.classList.remove('drop-target-before', 'drop-target-after');
        dropTarget = null;
    }

    const scene = dragScene;
    dragScene = null;
    if (!scene) {
        return;
    }

    const li = event.target.closest('.scene');
    const target = game.scenes.get(li?.dataset.sceneId);
    if (!target || target === scene) {
        return;
    }

    const rect = li.getBoundingClientRect();
    const midpoint = rect.left + (rect.width / 2);
    const insertBefore = event.clientX < midpoint;

    const siblings = game.scenes.filter(s => s !== scene);
    await scene.sortRelative({
        sortKey: 'navOrder',
        target,
        siblings,
        sortBefore: insertBefore
    });
}
