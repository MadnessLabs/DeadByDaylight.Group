import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-bac865b7.js';
import { g as globalScripts } from './app-globals-c143d5f2.js';
import './ionic-global-48c6f4a1.js';

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = import.meta.url;
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return import(/* webpackChunkName: "polyfills-dom" */ './dom-c5ed0ba5.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"app-tournament\",[[0,\"app-tournament\",{\"db\":[16],\"tournamentId\":[1,\"tournament-id\"],\"tournament\":[32]}]]],[\"fireenjin-popover-filter\",[[0,\"fireenjin-popover-filter\",{\"label\":[1],\"controls\":[16]}]]],[\"fireenjin-input-address\",[[0,\"fireenjin-input-address\",{\"googleMapsKey\":[1,\"google-maps-key\"],\"placeholder\":[1],\"value\":[1032],\"label\":[1],\"required\":[4],\"name\":[1],\"lines\":[1],\"labelPosition\":[1,\"label-position\"],\"place\":[32],\"manualEntry\":[32],\"forceUpdate\":[32]},[[0,\"ionChange\",\"onChange\"]]]]],[\"fireenjin-renderer\",[[0,\"fireenjin-renderer\"]]],[\"app-admin\",[[0,\"app-admin\",{\"db\":[16],\"auth\":[16],\"formData\":[32]},[[0,\"ionInput\",\"onInput\"],[0,\"submit\",\"onSubmit\"]]]]],[\"app-profile\",[[0,\"app-profile\",{\"userId\":[1,\"user-id\"],\"auth\":[16]}]]],[\"app-signup\",[[0,\"app-signup\",{\"email\":[32],\"password\":[32]},[[0,\"ionInput\",\"onInput\"],[0,\"submit\",\"onSubmit\"]]]]],[\"ion-datetime\",[[33,\"ion-datetime\",{\"color\":[1],\"name\":[1],\"disabled\":[4],\"readonly\":[4],\"min\":[1025],\"max\":[1025],\"presentation\":[1],\"cancelText\":[1,\"cancel-text\"],\"doneText\":[1,\"done-text\"],\"clearText\":[1,\"clear-text\"],\"yearValues\":[8,\"year-values\"],\"monthValues\":[8,\"month-values\"],\"dayValues\":[8,\"day-values\"],\"hourValues\":[8,\"hour-values\"],\"minuteValues\":[8,\"minute-values\"],\"locale\":[1],\"firstDayOfWeek\":[2,\"first-day-of-week\"],\"value\":[1025],\"showDefaultTitle\":[4,\"show-default-title\"],\"showDefaultButtons\":[4,\"show-default-buttons\"],\"showClearButton\":[4,\"show-clear-button\"],\"showDefaultTimeLabel\":[4,\"show-default-time-label\"],\"hourCycle\":[1,\"hour-cycle\"],\"size\":[1],\"showMonthAndYear\":[32],\"activeParts\":[32],\"workingParts\":[32],\"isPresented\":[32],\"isTimePopoverOpen\":[32],\"confirm\":[64],\"reset\":[64],\"cancel\":[64]}]]],[\"fireenjin-log-item\",[[0,\"fireenjin-log-item\",{\"type\":[1],\"name\":[1],\"resolveTime\":[2,\"resolve-time\"],\"input\":[1],\"output\":[1],\"createdAt\":[1,\"created-at\"],\"lines\":[1]}]]],[\"app-home\",[[0,\"app-home\",{\"db\":[16],\"auth\":[16],\"formData\":[32]},[[0,\"submit\",\"onSubmit\"],[0,\"ionInput\",\"onInput\"]]]]],[\"fireenjin-input-search-user\",[[4,\"fireenjin-input-search-user\",{\"name\":[1],\"label\":[1],\"placeholder\":[1],\"value\":[1032],\"required\":[4],\"autofocus\":[4],\"disableSearch\":[4,\"disable-search\"],\"disabled\":[4],\"endpoint\":[1],\"dataPropsMap\":[8,\"data-props-map\"],\"mode\":[1],\"iconEnd\":[1,\"icon-end\"],\"iconStart\":[1,\"icon-start\"],\"limit\":[2],\"template\":[16],\"results\":[16],\"lines\":[1],\"labelPosition\":[1,\"label-position\"]}]]],[\"fireenjin-search-bar\",[[0,\"fireenjin-search-bar\",{\"filters\":[1040],\"paginationEl\":[8,\"pagination-el\"],\"modeToggle\":[4,\"mode-toggle\"],\"displayMode\":[1025,\"display-mode\"],\"disabled\":[4],\"beforeGetResults\":[8,\"before-get-results\"],\"showFilter\":[1028,\"show-filter\"],\"currentFilters\":[32],\"togglePaginationDisplay\":[64],\"clearFilter\":[64],\"updateCurrentFilters\":[64]},[[4,\"fireenjinTrigger\",\"onTrigger\"],[0,\"ionChange\",\"onChange\"]]]]],[\"fireenjin-input-amount\",[[0,\"fireenjin-input-amount\",{\"name\":[1],\"label\":[1],\"placeholder\":[1],\"value\":[1032],\"required\":[4],\"presets\":[16],\"decimal\":[4],\"autofocus\":[4],\"disabled\":[4],\"min\":[1],\"max\":[1],\"step\":[1],\"lines\":[1],\"labelPosition\":[1,\"label-position\"],\"formattedValue\":[32]},[[0,\"ionBlur\",\"onChange\"]]]]],[\"fireenjin-toggle\",[[4,\"fireenjin-toggle\",{\"label\":[1],\"name\":[1],\"value\":[4],\"color\":[1],\"labelPosition\":[1,\"label-position\"],\"disabled\":[4],\"lines\":[1]}]]],[\"fireenjin-input-file\",[[0,\"fireenjin-input-file\",{\"path\":[1],\"icon\":[1],\"label\":[1],\"fileName\":[1,\"file-name\"],\"name\":[1],\"accept\":[1],\"defaultValue\":[8,\"default-value\"],\"value\":[8],\"type\":[1],\"documentId\":[1,\"document-id\"],\"endpoint\":[1],\"uploadData\":[8,\"upload-data\"],\"isLoading\":[32],\"fileUrl\":[32],\"selectedFile\":[32],\"dragOver\":[32],\"openFile\":[64]}]]],[\"fireenjin-radios\",[[0,\"fireenjin-radios\",{\"label\":[1],\"value\":[1032],\"required\":[8],\"options\":[8],\"name\":[1],\"lines\":[1],\"selected\":[1026],\"labelPosition\":[1,\"label-position\"],\"selectedIndex\":[32]}]]],[\"fireenjin-select-tags\",[[4,\"fireenjin-select-tags\",{\"disableFetch\":[4,\"disable-fetch\"],\"name\":[1],\"label\":[8],\"placeholder\":[1],\"value\":[1032],\"options\":[1040],\"required\":[4],\"multiple\":[4],\"duplicates\":[4],\"disabled\":[4],\"allowAdding\":[4,\"allow-adding\"],\"endpoint\":[1],\"resultsKey\":[1,\"results-key\"],\"limit\":[2],\"orderBy\":[1,\"order-by\"],\"orderDirection\":[1,\"order-direction\"],\"dataPropsMap\":[8,\"data-props-map\"],\"page\":[1026],\"results\":[1040],\"fetchData\":[8,\"fetch-data\"],\"query\":[1],\"lines\":[1],\"labelPosition\":[1,\"label-position\"],\"choices\":[32],\"hasValue\":[32],\"paramData\":[32],\"setValue\":[64],\"getChoices\":[64],\"clearParamData\":[64],\"addResults\":[64],\"clearResults\":[64],\"getResults\":[64]},[[16,\"fireenjinSuccess\",\"onSuccess\"],[0,\"change\",\"onChange\"],[0,\"keydown\",\"onKeyDown\"]]]]],[\"fireenjin-share\",[[0,\"fireenjin-share\",{\"facebookAppId\":[1,\"facebook-app-id\"],\"url\":[1],\"text\":[1],\"subject\":[1],\"lines\":[1]}]]],[\"fireenjin-calendar\",[[0,\"fireenjin-calendar\",{\"locales\":[1],\"year\":[2],\"max\":[1],\"min\":[1],\"month\":[2],\"range\":[4],\"available\":[16],\"endDate\":[1025,\"end-date\"],\"startDate\":[1025,\"start-date\"],\"yearsTitle\":[1,\"years-title\"],\"currentView\":[32],\"switchView\":[64],\"setDate\":[64]}]]],[\"fireenjin-input-photo\",[[4,\"fireenjin-input-photo\",{\"disabled\":[4],\"value\":[1025],\"path\":[1],\"fallback\":[1],\"name\":[1],\"fileName\":[1,\"file-name\"],\"showButton\":[4,\"show-button\"],\"buttonText\":[1,\"button-text\"],\"type\":[1],\"documentId\":[1,\"document-id\"],\"endpoint\":[1],\"initials\":[1],\"multiple\":[4],\"resize\":[4],\"loading\":[1028],\"photoUrl\":[32],\"triggerFileInput\":[64]},[[16,\"fireenjinSuccess\",\"onSuccess\"]]]]],[\"fireenjin-tabs\",[[4,\"fireenjin-tabs\",{\"hash\":[4],\"selected\":[1025],\"tabs\":[32]}]]],[\"dbdgroup-router\",[[0,\"dbdgroup-router\",null,[[8,\"swUpdate\",\"onUpdate\"]]]]],[\"ion-back-button\",[[33,\"ion-back-button\",{\"color\":[513],\"defaultHref\":[1025,\"default-href\"],\"disabled\":[516],\"icon\":[1],\"text\":[1],\"type\":[1],\"routerAnimation\":[16]}]]],[\"ion-fab-button\",[[33,\"ion-fab-button\",{\"color\":[513],\"activated\":[4],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1],\"show\":[4],\"translucent\":[4],\"type\":[1],\"size\":[1],\"closeIcon\":[1,\"close-icon\"]}]]],[\"ion-loading\",[[34,\"ion-loading\",{\"overlayIndex\":[2,\"overlay-index\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"message\":[1],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"showBackdrop\":[4,\"show-backdrop\"],\"spinner\":[1025],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-menu-button\",[[33,\"ion-menu-button\",{\"color\":[513],\"disabled\":[4],\"menu\":[1],\"autoHide\":[4,\"auto-hide\"],\"type\":[1],\"visible\":[32]},[[16,\"ionMenuChange\",\"visibilityChanged\"],[16,\"ionSplitPaneVisible\",\"visibilityChanged\"]]]]],[\"ion-picker\",[[34,\"ion-picker\",{\"overlayIndex\":[2,\"overlay-index\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"buttons\":[16],\"columns\":[16],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"showBackdrop\":[4,\"show-backdrop\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"animated\":[4],\"htmlAttributes\":[16],\"presented\":[32],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64],\"getColumn\":[64]}]]],[\"ion-refresher-content\",[[0,\"ion-refresher-content\",{\"pullingIcon\":[1025,\"pulling-icon\"],\"pullingText\":[1,\"pulling-text\"],\"refreshingSpinner\":[1025,\"refreshing-spinner\"],\"refreshingText\":[1,\"refreshing-text\"]}]]],[\"ion-toast\",[[33,\"ion-toast\",{\"overlayIndex\":[2,\"overlay-index\"],\"color\":[513],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"cssClass\":[1,\"css-class\"],\"duration\":[2],\"header\":[1],\"message\":[1],\"keyboardClose\":[4,\"keyboard-close\"],\"position\":[1],\"buttons\":[16],\"translucent\":[4],\"animated\":[4],\"icon\":[1],\"htmlAttributes\":[16],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-accordion\",[[49,\"ion-accordion\",{\"value\":[1],\"disabled\":[4],\"readonly\":[4],\"toggleIcon\":[1,\"toggle-icon\"],\"toggleIconSlot\":[1,\"toggle-icon-slot\"],\"state\":[32],\"isNext\":[32],\"isPrevious\":[32]}]]],[\"ion-breadcrumb\",[[33,\"ion-breadcrumb\",{\"collapsed\":[4],\"last\":[4],\"showCollapsedIndicator\":[4,\"show-collapsed-indicator\"],\"color\":[1],\"active\":[4],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"separator\":[4],\"target\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16]}]]],[\"ion-item-option\",[[33,\"ion-item-option\",{\"color\":[513],\"disabled\":[4],\"download\":[1],\"expandable\":[4],\"href\":[1],\"rel\":[1],\"target\":[1],\"type\":[1]}]]],[\"ion-menu\",[[33,\"ion-menu\",{\"contentId\":[513,\"content-id\"],\"menuId\":[513,\"menu-id\"],\"type\":[1025],\"disabled\":[1028],\"side\":[513],\"swipeGesture\":[4,\"swipe-gesture\"],\"maxEdgeStart\":[2,\"max-edge-start\"],\"isPaneVisible\":[32],\"isEndSide\":[32],\"isOpen\":[64],\"isActive\":[64],\"open\":[64],\"close\":[64],\"toggle\":[64],\"setOpen\":[64]},[[16,\"ionSplitPaneVisible\",\"onSplitPaneChanged\"],[2,\"click\",\"onBackdropClick\"],[0,\"keydown\",\"onKeydown\"]]]]],[\"ion-modal\",[[33,\"ion-modal\",{\"hasController\":[4,\"has-controller\"],\"overlayIndex\":[2,\"overlay-index\"],\"delegate\":[16],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"breakpoints\":[16],\"initialBreakpoint\":[2,\"initial-breakpoint\"],\"backdropBreakpoint\":[2,\"backdrop-breakpoint\"],\"handle\":[4],\"component\":[1],\"componentProps\":[16],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"showBackdrop\":[4,\"show-backdrop\"],\"animated\":[4],\"swipeToClose\":[4,\"swipe-to-close\"],\"presentingElement\":[16],\"htmlAttributes\":[16],\"isOpen\":[4,\"is-open\"],\"trigger\":[1],\"presented\":[32],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-reorder\",[[33,\"ion-reorder\",null,[[2,\"click\",\"onClick\"]]]]],[\"ion-segment-button\",[[33,\"ion-segment-button\",{\"disabled\":[4],\"layout\":[1],\"type\":[1],\"value\":[1],\"checked\":[32]}]]],[\"ion-tab-button\",[[33,\"ion-tab-button\",{\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"layout\":[1025],\"selected\":[1028],\"tab\":[1],\"target\":[1]},[[8,\"ionTabBarChanged\",\"onTabBarChanged\"]]]]],[\"fireenjin-avatar\",[[0,\"fireenjin-avatar\",{\"src\":[1],\"size\":[1],\"initials\":[1],\"fallback\":[1]}]]],[\"fireenjin-graph\",[[0,\"fireenjin-graph\",{\"datasets\":[1040],\"labels\":[1040],\"name\":[1],\"type\":[1],\"setDatasets\":[64],\"setLabels\":[64],\"refresh\":[64],\"removeChart\":[64]}]]],[\"fireenjin-input-search-popover\",[[0,\"fireenjin-input-search-popover\",{\"name\":[1],\"results\":[8],\"template\":[16]}]]],[\"fireenjin-kanban\",[[0,\"fireenjin-kanban\",{\"options\":[8]}]]],[\"fireenjin-map\",[[0,\"fireenjin-map\",{\"googleMapsKey\":[1,\"google-maps-key\"],\"options\":[8],\"visible\":[4],\"markers\":[1040],\"position\":[32],\"isVisible\":[32],\"addMarker\":[64],\"setMarkers\":[64],\"setZoom\":[64],\"setCenter\":[64],\"clearMarkers\":[64]}]]],[\"fireenjin-progress-circle\",[[1,\"fireenjin-progress-circle\",{\"percent\":[1026],\"radius\":[2],\"stroke\":[2]}]]],[\"fireenjin-render-template\",[[0,\"fireenjin-render-template\",{\"templateId\":[1,\"template-id\"],\"data\":[8],\"template\":[1032],\"partials\":[1040],\"html\":[32],\"setPartials\":[64],\"renderTemplate\":[64]},[[16,\"fireenjinSuccess\",\"onSuccess\"]]]]],[\"fireenjin-resizer\",[[4,\"fireenjin-resizer\",{\"direction\":[1],\"replaceStyles\":[8,\"replace-styles\"],\"resizeStart\":[16]}]]],[\"fireenjin-star-rating\",[[0,\"fireenjin-star-rating\",{\"disabled\":[4],\"name\":[1],\"maxRating\":[2,\"max-rating\"],\"value\":[1],\"currentRating\":[32],\"setCurrentRating\":[64]},[[0,\"input\",\"onInput\"]]]]],[\"fireenjin-tab\",[[4,\"fireenjin-tab\",{\"tab\":[1],\"selected\":[4]}]]],[\"ion-accordion-group\",[[33,\"ion-accordion-group\",{\"animated\":[4],\"multiple\":[4],\"value\":[1025],\"disabled\":[4],\"readonly\":[4],\"expand\":[1],\"requestAccordionToggle\":[64],\"getAccordions\":[64]},[[0,\"keydown\",\"onKeydown\"]]]]],[\"ion-app\",[[0,\"ion-app\",{\"setFocus\":[64]}]]],[\"ion-avatar\",[[33,\"ion-avatar\"]]],[\"ion-breadcrumbs\",[[33,\"ion-breadcrumbs\",{\"color\":[1],\"maxItems\":[2,\"max-items\"],\"itemsBeforeCollapse\":[2,\"items-before-collapse\"],\"itemsAfterCollapse\":[2,\"items-after-collapse\"],\"collapsed\":[32],\"activeChanged\":[32]},[[0,\"collapsedClick\",\"onCollapsedClick\"]]]]],[\"ion-card-content\",[[32,\"ion-card-content\"]]],[\"ion-card-header\",[[33,\"ion-card-header\",{\"color\":[513],\"translucent\":[4]}]]],[\"ion-card-subtitle\",[[33,\"ion-card-subtitle\",{\"color\":[513]}]]],[\"ion-card-title\",[[33,\"ion-card-title\",{\"color\":[513]}]]],[\"ion-fab\",[[1,\"ion-fab\",{\"horizontal\":[1],\"vertical\":[1],\"edge\":[4],\"activated\":[1028],\"close\":[64]}]]],[\"ion-fab-list\",[[1,\"ion-fab-list\",{\"activated\":[4],\"side\":[1]}]]],[\"ion-footer\",[[36,\"ion-footer\",{\"collapse\":[1],\"translucent\":[4]}]]],[\"ion-header\",[[36,\"ion-header\",{\"collapse\":[1],\"translucent\":[4]}]]],[\"ion-img\",[[1,\"ion-img\",{\"alt\":[1],\"src\":[1],\"loadSrc\":[32],\"loadError\":[32]}]]],[\"ion-item-group\",[[32,\"ion-item-group\"]]],[\"ion-item-options\",[[32,\"ion-item-options\",{\"side\":[1],\"fireSwipeEvent\":[64]}]]],[\"ion-item-sliding\",[[0,\"ion-item-sliding\",{\"disabled\":[4],\"state\":[32],\"getOpenAmount\":[64],\"getSlidingRatio\":[64],\"open\":[64],\"close\":[64],\"closeOpened\":[64]}]]],[\"ion-menu-toggle\",[[1,\"ion-menu-toggle\",{\"menu\":[1],\"autoHide\":[4,\"auto-hide\"],\"visible\":[32]},[[16,\"ionMenuChange\",\"visibilityChanged\"],[16,\"ionSplitPaneVisible\",\"visibilityChanged\"]]]]],[\"ion-nav\",[[1,\"ion-nav\",{\"delegate\":[16],\"swipeGesture\":[1028,\"swipe-gesture\"],\"animated\":[4],\"animation\":[16],\"rootParams\":[16],\"root\":[1],\"push\":[64],\"insert\":[64],\"insertPages\":[64],\"pop\":[64],\"popTo\":[64],\"popToRoot\":[64],\"removeIndex\":[64],\"setRoot\":[64],\"setPages\":[64],\"setRouteId\":[64],\"getRouteId\":[64],\"getActive\":[64],\"getByIndex\":[64],\"canGoBack\":[64],\"getPrevious\":[64]}]]],[\"ion-nav-link\",[[0,\"ion-nav-link\",{\"component\":[1],\"componentProps\":[16],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16]}]]],[\"ion-progress-bar\",[[33,\"ion-progress-bar\",{\"type\":[1],\"reversed\":[4],\"value\":[2],\"buffer\":[2],\"color\":[513]}]]],[\"ion-range\",[[33,\"ion-range\",{\"color\":[513],\"debounce\":[2],\"name\":[1],\"dualKnobs\":[4,\"dual-knobs\"],\"min\":[2],\"max\":[2],\"pin\":[4],\"pinFormatter\":[16],\"snaps\":[4],\"step\":[2],\"ticks\":[4],\"disabled\":[4],\"value\":[1026],\"ratioA\":[32],\"ratioB\":[32],\"pressedKnob\":[32]}]]],[\"ion-refresher\",[[32,\"ion-refresher\",{\"pullMin\":[2,\"pull-min\"],\"pullMax\":[2,\"pull-max\"],\"closeDuration\":[1,\"close-duration\"],\"snapbackDuration\":[1,\"snapback-duration\"],\"pullFactor\":[2,\"pull-factor\"],\"disabled\":[4],\"nativeRefresher\":[32],\"state\":[32],\"complete\":[64],\"cancel\":[64],\"getProgress\":[64]}]]],[\"ion-reorder-group\",[[0,\"ion-reorder-group\",{\"disabled\":[4],\"state\":[32],\"complete\":[64]}]]],[\"ion-route-redirect\",[[0,\"ion-route-redirect\",{\"from\":[1],\"to\":[1]}]]],[\"ion-router-link\",[[1,\"ion-router-link\",{\"color\":[513],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1]}]]],[\"ion-router-outlet\",[[1,\"ion-router-outlet\",{\"mode\":[1025],\"delegate\":[16],\"animated\":[4],\"animation\":[16],\"swipeHandler\":[16],\"commit\":[64],\"setRouteId\":[64],\"getRouteId\":[64]}]]],[\"ion-segment\",[[33,\"ion-segment\",{\"color\":[513],\"disabled\":[4],\"scrollable\":[4],\"swipeGesture\":[4,\"swipe-gesture\"],\"value\":[1025],\"selectOnFocus\":[4,\"select-on-focus\"],\"activated\":[32]},[[0,\"keydown\",\"onKeyDown\"]]]]],[\"ion-skeleton-text\",[[1,\"ion-skeleton-text\",{\"animated\":[4]}]]],[\"ion-slide\",[[0,\"ion-slide\"]]],[\"ion-slides\",[[36,\"ion-slides\",{\"options\":[8],\"pager\":[4],\"scrollbar\":[4],\"update\":[64],\"updateAutoHeight\":[64],\"slideTo\":[64],\"slideNext\":[64],\"slidePrev\":[64],\"getActiveIndex\":[64],\"getPreviousIndex\":[64],\"length\":[64],\"isEnd\":[64],\"isBeginning\":[64],\"startAutoplay\":[64],\"stopAutoplay\":[64],\"lockSwipeToNext\":[64],\"lockSwipeToPrev\":[64],\"lockSwipes\":[64],\"getSwiper\":[64]}]]],[\"ion-split-pane\",[[33,\"ion-split-pane\",{\"contentId\":[513,\"content-id\"],\"disabled\":[4],\"when\":[8],\"visible\":[32]}]]],[\"ion-tab\",[[1,\"ion-tab\",{\"active\":[1028],\"delegate\":[16],\"tab\":[1],\"component\":[1],\"setActive\":[64]}]]],[\"ion-tab-bar\",[[33,\"ion-tab-bar\",{\"color\":[513],\"selectedTab\":[1,\"selected-tab\"],\"translucent\":[4],\"keyboardVisible\":[32]}]]],[\"ion-tabs\",[[1,\"ion-tabs\",{\"useRouter\":[1028,\"use-router\"],\"selectedTab\":[32],\"select\":[64],\"getTab\":[64],\"getSelected\":[64],\"setRouteId\":[64],\"getRouteId\":[64]}]]],[\"ion-textarea\",[[34,\"ion-textarea\",{\"fireFocusEvents\":[4,\"fire-focus-events\"],\"color\":[513],\"autocapitalize\":[1],\"autofocus\":[4],\"clearOnEdit\":[1028,\"clear-on-edit\"],\"debounce\":[2],\"disabled\":[4],\"inputmode\":[1],\"enterkeyhint\":[1],\"maxlength\":[2],\"minlength\":[2],\"name\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"cols\":[2],\"rows\":[2],\"wrap\":[1],\"autoGrow\":[4,\"auto-grow\"],\"value\":[1025],\"hasFocus\":[32],\"setFocus\":[64],\"setBlur\":[64],\"getInputElement\":[64]}]]],[\"ion-thumbnail\",[[1,\"ion-thumbnail\"]]],[\"ion-title\",[[33,\"ion-title\",{\"color\":[513],\"size\":[1]}]]],[\"ion-toolbar\",[[33,\"ion-toolbar\",{\"color\":[513]},[[0,\"ionStyle\",\"childrenStyle\"]]]]],[\"fireenjin-input-state\",[[0,\"fireenjin-input-state\",{\"name\":[1],\"placeholder\":[1],\"value\":[1]}]]],[\"fireenjin-select\",[[0,\"fireenjin-select\",{\"disabled\":[4],\"cancelText\":[1,\"cancel-text\"],\"okText\":[1,\"ok-text\"],\"placeholder\":[1],\"name\":[1],\"selectedText\":[1,\"selected-text\"],\"multiple\":[4],\"interface\":[1],\"interfaceOptions\":[8,\"interface-options\"],\"compareWith\":[1,\"compare-with\"],\"value\":[1032],\"icon\":[1],\"endpoint\":[1],\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"message\":[1],\"orderBy\":[1,\"order-by\"],\"dataPropsMap\":[8,\"data-props-map\"],\"optionEl\":[16],\"limit\":[2],\"params\":[8],\"query\":[1],\"label\":[1],\"options\":[1040],\"required\":[4],\"resultsKey\":[1,\"results-key\"],\"labelPosition\":[1,\"label-position\"],\"lines\":[1],\"results\":[32]},[[16,\"fireenjinSuccess\",\"onSuccess\"]]]]],[\"fireenjin-pagination\",[[0,\"fireenjin-pagination\",{\"gridEl\":[16],\"listEl\":[16],\"disablePageCheck\":[4,\"disable-page-check\"],\"disableFetch\":[4,\"disable-fetch\"],\"approxItemHeight\":[1026,\"approx-item-height\"],\"endpoint\":[1],\"query\":[1],\"fetchData\":[8,\"fetch-data\"],\"limit\":[2],\"orderBy\":[1,\"order-by\"],\"orderDirection\":[1,\"order-direction\"],\"dataPropsMap\":[8,\"data-props-map\"],\"display\":[1],\"page\":[1026],\"results\":[1040],\"groupBy\":[1,\"group-by\"],\"loadingSpinner\":[1,\"loading-spinner\"],\"loadingText\":[1,\"loading-text\"],\"resultsKey\":[1025,\"results-key\"],\"pageKey\":[1025,\"page-key\"],\"pageCountKey\":[1025,\"page-count-key\"],\"resultCountKey\":[1025,\"result-count-key\"],\"name\":[1025],\"collection\":[1],\"renderItem\":[16],\"disableVirtualScroll\":[4,\"disable-virtual-scroll\"],\"removeDuplicates\":[4,\"remove-duplicates\"],\"fetchParams\":[8,\"fetch-params\"],\"paramData\":[32],\"clearParamData\":[64],\"addResults\":[64],\"clearResults\":[64],\"getResults\":[64]},[[16,\"fireenjinSuccess\",\"onSuccess\"],[0,\"ionInfinite\",\"onInfiniteScroll\"],[9,\"resize\",\"onResize\"],[16,\"ionRouteDidChange\",\"getResults\"]]]]],[\"fireenjin-input\",[[0,\"fireenjin-input\",{\"stripeKey\":[1,\"stripe-key\"],\"type\":[8],\"placeholder\":[8],\"label\":[1],\"value\":[1032],\"required\":[8],\"name\":[1],\"autocomplete\":[1],\"autocapitalize\":[1],\"autocorrect\":[1],\"autofocus\":[4],\"minlength\":[2],\"maxlength\":[2],\"disabled\":[4],\"info\":[1],\"edit\":[4],\"min\":[1],\"max\":[1],\"iconLeft\":[1,\"icon-left\"],\"iconRight\":[1,\"icon-right\"],\"silence\":[4],\"step\":[1],\"actionOptions\":[8,\"action-options\"],\"pattern\":[8],\"clearInput\":[4,\"clear-input\"],\"multiple\":[4],\"readOnly\":[4,\"read-only\"],\"spellCheck\":[4,\"spell-check\"],\"inputMode\":[1,\"input-mode\"],\"stripeElements\":[16],\"lines\":[1],\"labelPosition\":[1,\"label-position\"],\"showInfo\":[32],\"passwordVisible\":[32],\"cleave\":[32],\"input\":[32],\"inputType\":[32],\"getCardToken\":[64],\"setFocus\":[64],\"checkValidity\":[64],\"clear\":[64],\"reportValidity\":[64],\"initializeStripeElements\":[64]},[[0,\"ionBlur\",\"onBlur\"]]]]],[\"fireenjin-input-search\",[[4,\"fireenjin-input-search\",{\"name\":[1],\"label\":[1],\"placeholder\":[1],\"value\":[1032],\"required\":[4],\"autofocus\":[4],\"disabled\":[4],\"endpoint\":[1],\"dataPropsMap\":[8,\"data-props-map\"],\"template\":[16],\"type\":[1],\"searchParams\":[8,\"search-params\"],\"disableSearch\":[4,\"disable-search\"],\"mode\":[1],\"iconEnd\":[1,\"icon-end\"],\"iconStart\":[1,\"icon-start\"],\"results\":[1040],\"resultsKey\":[1,\"results-key\"],\"lines\":[1],\"labelPosition\":[1,\"label-position\"],\"checkValidity\":[64],\"reportValidity\":[64],\"clearResults\":[64],\"closePopover\":[64],\"openPopover\":[64]},[[0,\"ionBlur\",\"onBlur\"],[16,\"fireenjinSuccess\",\"onSuccess\"]]]]],[\"ion-chip\",[[33,\"ion-chip\",{\"color\":[513],\"outline\":[4],\"disabled\":[4]}]]],[\"ion-searchbar\",[[34,\"ion-searchbar\",{\"color\":[513],\"animated\":[4],\"autocomplete\":[1],\"autocorrect\":[1],\"cancelButtonIcon\":[1,\"cancel-button-icon\"],\"cancelButtonText\":[1,\"cancel-button-text\"],\"clearIcon\":[1,\"clear-icon\"],\"debounce\":[2],\"disabled\":[4],\"inputmode\":[1],\"enterkeyhint\":[1],\"placeholder\":[1],\"searchIcon\":[1,\"search-icon\"],\"showCancelButton\":[1,\"show-cancel-button\"],\"showClearButton\":[1,\"show-clear-button\"],\"spellcheck\":[4],\"type\":[1],\"value\":[1025],\"focused\":[32],\"noAnimate\":[32],\"setFocus\":[64],\"getInputElement\":[64]}]]],[\"fireenjin-json-viewer\",[[4,\"fireenjin-json-viewer\",{\"watcher\":[4],\"openDepth\":[2,\"open-depth\"],\"formatStringJSON\":[64]}]]],[\"ion-badge\",[[33,\"ion-badge\",{\"color\":[513]}]]],[\"ion-buttons\",[[34,\"ion-buttons\",{\"collapse\":[4]}]]],[\"ion-picker-column\",[[32,\"ion-picker-column\",{\"col\":[16]}]]],[\"ion-picker-column-internal\",[[33,\"ion-picker-column-internal\",{\"items\":[16],\"value\":[1032],\"color\":[513],\"numericInput\":[4,\"numeric-input\"],\"isActive\":[32],\"scrollActiveItemIntoView\":[64]}]]],[\"ion-picker-internal\",[[33,\"ion-picker-internal\"]]],[\"ion-route\",[[0,\"ion-route\",{\"url\":[1],\"component\":[1],\"componentProps\":[16],\"beforeLeave\":[16],\"beforeEnter\":[16]}]]],[\"ion-router\",[[0,\"ion-router\",{\"root\":[1],\"useHash\":[4,\"use-hash\"],\"canTransition\":[64],\"push\":[64],\"back\":[64],\"printDebug\":[64],\"navChanged\":[64]},[[8,\"popstate\",\"onPopState\"],[4,\"ionBackButton\",\"onBackButton\"]]]]],[\"ion-text\",[[1,\"ion-text\",{\"color\":[513]}]]],[\"ion-toggle\",[[33,\"ion-toggle\",{\"color\":[513],\"name\":[1],\"checked\":[1028],\"disabled\":[4],\"value\":[1],\"activated\":[32]}]]],[\"ion-infinite-scroll-content\",[[32,\"ion-infinite-scroll-content\",{\"loadingSpinner\":[1025,\"loading-spinner\"],\"loadingText\":[1,\"loading-text\"]}]]],[\"ion-infinite-scroll\",[[0,\"ion-infinite-scroll\",{\"threshold\":[1],\"disabled\":[4],\"position\":[1],\"isLoading\":[32],\"complete\":[64]}]]],[\"ion-virtual-scroll\",[[0,\"ion-virtual-scroll\",{\"approxItemHeight\":[2,\"approx-item-height\"],\"approxHeaderHeight\":[2,\"approx-header-height\"],\"approxFooterHeight\":[2,\"approx-footer-height\"],\"headerFn\":[16],\"footerFn\":[16],\"items\":[16],\"itemHeight\":[16],\"headerHeight\":[16],\"footerHeight\":[16],\"renderItem\":[16],\"renderHeader\":[16],\"renderFooter\":[16],\"nodeRender\":[16],\"domRender\":[16],\"totalHeight\":[32],\"positionForItem\":[64],\"checkRange\":[64],\"checkEnd\":[64]},[[9,\"resize\",\"onResize\"]]]]],[\"ion-ripple-effect\",[[1,\"ion-ripple-effect\",{\"type\":[1],\"addRipple\":[64]}]]],[\"fireenjin-form\",[[4,\"fireenjin-form\",{\"name\":[1],\"formData\":[1032,\"form-data\"],\"submitButton\":[1,\"submit-button\"],\"submitButtonColor\":[1,\"submit-button-color\"],\"submitButtonFill\":[1,\"submit-button-fill\"],\"resetButton\":[1,\"reset-button\"],\"resetButtonColor\":[1,\"reset-button-color\"],\"resetButtonFill\":[1,\"reset-button-fill\"],\"hideControls\":[4,\"hide-controls\"],\"endpoint\":[1],\"documentId\":[1,\"document-id\"],\"excludeData\":[16],\"beforeSubmit\":[16],\"disableLoader\":[4,\"disable-loader\"],\"loading\":[1028],\"disableEnterButton\":[4,\"disable-enter-button\"],\"disableReset\":[4,\"disable-reset\"],\"confirmExit\":[4,\"confirm-exit\"],\"hasChanged\":[1028,\"has-changed\"],\"method\":[1],\"action\":[1],\"fetch\":[8],\"fetchParams\":[8,\"fetch-params\"],\"fetchDataMap\":[8,\"fetch-data-map\"],\"submit\":[64],\"reset\":[64],\"checkFormValidity\":[64],\"reportFormValidity\":[64],\"setFormData\":[64]},[[0,\"ionInput\",\"onInput\"],[0,\"ionChange\",\"onInput\"],[0,\"ionSelect\",\"onSelect\"],[0,\"keydown\",\"onKeyDown\"],[0,\"fireenjinSuccess\",\"onSuccess\"]]]]],[\"ion-item-divider\",[[33,\"ion-item-divider\",{\"color\":[513],\"sticky\":[4]}]]],[\"ion-action-sheet\",[[34,\"ion-action-sheet\",{\"overlayIndex\":[2,\"overlay-index\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"buttons\":[16],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-alert\",[[34,\"ion-alert\",{\"overlayIndex\":[2,\"overlay-index\"],\"keyboardClose\":[4,\"keyboard-close\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"cssClass\":[1,\"css-class\"],\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"message\":[1],\"buttons\":[16],\"inputs\":[1040],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"present\":[64],\"dismiss\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]},[[4,\"keydown\",\"onKeydown\"]]]]],[\"ion-radio-group\",[[0,\"ion-radio-group\",{\"allowEmptySelection\":[4,\"allow-empty-selection\"],\"name\":[1],\"value\":[1032]},[[4,\"keydown\",\"onKeydown\"]]]]],[\"ion-select\",[[33,\"ion-select\",{\"disabled\":[4],\"cancelText\":[1,\"cancel-text\"],\"okText\":[1,\"ok-text\"],\"placeholder\":[1],\"name\":[1],\"selectedText\":[1,\"selected-text\"],\"multiple\":[4],\"interface\":[1],\"interfaceOptions\":[8,\"interface-options\"],\"compareWith\":[1,\"compare-with\"],\"value\":[1032],\"isExpanded\":[32],\"open\":[64]}]]],[\"ion-select-option\",[[1,\"ion-select-option\",{\"disabled\":[4],\"value\":[8]}]]],[\"ion-spinner\",[[1,\"ion-spinner\",{\"color\":[513],\"duration\":[2],\"name\":[1],\"paused\":[4]}]]],[\"ion-list-header\",[[33,\"ion-list-header\",{\"color\":[513],\"lines\":[1]}]]],[\"ion-radio\",[[33,\"ion-radio\",{\"color\":[513],\"name\":[1],\"disabled\":[4],\"value\":[8],\"checked\":[32],\"buttonTabindex\":[32],\"setFocus\":[64],\"setButtonTabindex\":[64]}]]],[\"ion-select-popover\",[[34,\"ion-select-popover\",{\"header\":[1],\"subHeader\":[1,\"sub-header\"],\"message\":[1],\"multiple\":[4],\"options\":[16]},[[0,\"ionChange\",\"onSelect\"]]]]],[\"ion-content\",[[1,\"ion-content\",{\"color\":[513],\"fullscreen\":[4],\"forceOverscroll\":[1028,\"force-overscroll\"],\"scrollX\":[4,\"scroll-x\"],\"scrollY\":[4,\"scroll-y\"],\"scrollEvents\":[4,\"scroll-events\"],\"getScrollElement\":[64],\"scrollToTop\":[64],\"scrollToBottom\":[64],\"scrollByPoint\":[64],\"scrollToPoint\":[64]},[[8,\"appload\",\"onAppLoad\"]]]]],[\"ion-card\",[[33,\"ion-card\",{\"color\":[513],\"button\":[4],\"type\":[1],\"disabled\":[4],\"download\":[1],\"href\":[1],\"rel\":[1],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"target\":[1]}]]],[\"ion-popover\",[[33,\"ion-popover\",{\"hasController\":[4,\"has-controller\"],\"delegate\":[16],\"overlayIndex\":[2,\"overlay-index\"],\"enterAnimation\":[16],\"leaveAnimation\":[16],\"component\":[1],\"componentProps\":[16],\"keyboardClose\":[4,\"keyboard-close\"],\"cssClass\":[1,\"css-class\"],\"backdropDismiss\":[4,\"backdrop-dismiss\"],\"event\":[8],\"showBackdrop\":[4,\"show-backdrop\"],\"translucent\":[4],\"animated\":[4],\"htmlAttributes\":[16],\"triggerAction\":[1,\"trigger-action\"],\"trigger\":[1],\"size\":[1],\"dismissOnSelect\":[4,\"dismiss-on-select\"],\"reference\":[1],\"side\":[1],\"alignment\":[1025],\"arrow\":[4],\"isOpen\":[4,\"is-open\"],\"keyboardEvents\":[4,\"keyboard-events\"],\"presented\":[32],\"presentFromTrigger\":[64],\"present\":[64],\"dismiss\":[64],\"getParentPopover\":[64],\"onDidDismiss\":[64],\"onWillDismiss\":[64]}]]],[\"ion-checkbox\",[[33,\"ion-checkbox\",{\"color\":[513],\"name\":[1],\"checked\":[1028],\"indeterminate\":[1028],\"disabled\":[4],\"value\":[8]}]]],[\"ion-input\",[[34,\"ion-input\",{\"fireFocusEvents\":[4,\"fire-focus-events\"],\"color\":[513],\"accept\":[1],\"autocapitalize\":[1],\"autocomplete\":[1],\"autocorrect\":[1],\"autofocus\":[4],\"clearInput\":[4,\"clear-input\"],\"clearOnEdit\":[4,\"clear-on-edit\"],\"debounce\":[2],\"disabled\":[4],\"enterkeyhint\":[1],\"inputmode\":[1],\"max\":[8],\"maxlength\":[2],\"min\":[8],\"minlength\":[2],\"multiple\":[4],\"name\":[1],\"pattern\":[1],\"placeholder\":[1],\"readonly\":[4],\"required\":[4],\"spellcheck\":[4],\"step\":[1],\"size\":[2],\"type\":[1],\"value\":[1032],\"hasFocus\":[32],\"setFocus\":[64],\"setBlur\":[64],\"getInputElement\":[64]}]]],[\"ion-button\",[[33,\"ion-button\",{\"color\":[513],\"buttonType\":[1025,\"button-type\"],\"disabled\":[516],\"expand\":[513],\"fill\":[1537],\"routerDirection\":[1,\"router-direction\"],\"routerAnimation\":[16],\"download\":[1],\"href\":[1],\"rel\":[1],\"shape\":[513],\"size\":[513],\"strong\":[4],\"target\":[1],\"type\":[1]}]]],[\"ion-col\",[[1,\"ion-col\",{\"offset\":[1],\"offsetXs\":[1,\"offset-xs\"],\"offsetSm\":[1,\"offset-sm\"],\"offsetMd\":[1,\"offset-md\"],\"offsetLg\":[1,\"offset-lg\"],\"offsetXl\":[1,\"offset-xl\"],\"pull\":[1],\"pullXs\":[1,\"pull-xs\"],\"pullSm\":[1,\"pull-sm\"],\"pullMd\":[1,\"pull-md\"],\"pullLg\":[1,\"pull-lg\"],\"pullXl\":[1,\"pull-xl\"],\"push\":[1],\"pushXs\":[1,\"push-xs\"],\"pushSm\":[1,\"push-sm\"],\"pushMd\":[1,\"push-md\"],\"pushLg\":[1,\"push-lg\"],\"pushXl\":[1,\"push-xl\"],\"size\":[1],\"sizeXs\":[1,\"size-xs\"],\"sizeSm\":[1,\"size-sm\"],\"sizeMd\":[1,\"size-md\"],\"sizeLg\":[1,\"size-lg\"],\"sizeXl\":[1,\"size-xl\"]},[[9,\"resize\",\"onResize\"]]]]],[\"ion-grid\",[[1,\"ion-grid\",{\"fixed\":[4]}]]],[\"ion-list\",[[32,\"ion-list\",{\"lines\":[1],\"inset\":[4],\"closeSlidingItems\":[64]}]]],[\"ion-row\",[[1,\"ion-row\"]]],[\"ion-backdrop\",[[33,\"ion-backdrop\",{\"visible\":[4],\"tappable\":[4],\"stopPropagation\":[4,\"stop-propagation\"]},[[2,\"click\",\"onMouseDown\"]]]]],[\"ion-label\",[[34,\"ion-label\",{\"color\":[513],\"position\":[1],\"noAnimate\":[32]}]]],[\"ion-note\",[[33,\"ion-note\",{\"color\":[513]}]]],[\"ion-icon\",[[1,\"ion-icon\",{\"mode\":[1025],\"color\":[1],\"ios\":[1],\"md\":[1],\"flipRtl\":[4,\"flip-rtl\"],\"name\":[513],\"src\":[1],\"icon\":[8],\"size\":[1],\"lazy\":[4],\"sanitize\":[4],\"svgContent\":[32],\"isVisible\":[32],\"ariaLabel\":[32]}]]],[\"ion-item\",[[49,\"ion-item\",{\"color\":[513],\"button\":[4],\"detail\":[4],\"detailIcon\":[1,\"detail-icon\"],\"disabled\":[4],\"download\":[1],\"fill\":[1],\"shape\":[1],\"href\":[1],\"rel\":[1],\"lines\":[1],\"counter\":[4],\"routerAnimation\":[16],\"routerDirection\":[1,\"router-direction\"],\"target\":[1],\"type\":[1],\"multipleInputs\":[32],\"focusable\":[32],\"counterString\":[32]},[[0,\"ionChange\",\"handleIonChange\"],[0,\"ionColor\",\"labelColorChanged\"],[0,\"ionStyle\",\"itemStyle\"]]]]]]"), options);
});
