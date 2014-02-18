/*
 * jQuery(Zepto) Plug-in
 *     name: Simple Tabs
 *  version: 0.0.1
 *   author: zbinlin
 *  require: jquery or zepto
 */

/*
 * Usage:
 * $(DOM).SimpleTabs();
 *
 * $(DOM).SimpleTabs("click", function (event, $tabs, $tabpanels) {
 *     // do something here...
 * }, {
 *     live: false,
 *     container: document
 * });
 */
"use strict";
(function ($, undefined) {
    $.extend($.fn, {
        SimpleTabs: function (evt, fn, options) {
            var nop = function () {};
            if ("function" === typeof evt) {
                options = fn;
                fn = evt;
                evt = "click";
            }
            evt = (evt || "click").toString();
            fn = "function" === typeof fn ? fn : nop;

            options = $.extend({
                live: false,
                container: document
            }, options);

            var ACT = "tab-active", PANEL = "tab-panel-cls";

            var $tabs = $(this),
                panelCLS = $tabs.data(PANEL),
                $panel = $(options.container).find("." + panelCLS);
            $tabs.on(evt, function __(event) {
                if (options.live) {
                    $tabs.off(evt, __);
                    $tabs = $('[data-' + PANEL + '="' + panelCLS + '"]');
                    $panel = $(options.container).find("." + panelCLS);
                    $tabs.on(evt, __);
                }
                var idx = $tabs.index(this);
                $tabs.data(ACT, false), $(this).data(ACT, true);
                $($panel.hide().get(idx)).show();
                return fn.call(this, event, $tabs, $panel);
            }).filter('[data-' + ACT + '="true"]').trigger(evt);

            return this;
        }
    });
}($));
