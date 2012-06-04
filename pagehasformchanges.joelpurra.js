/*!
* @license PageHasFormChanges
* Copyright © 2012 Joel Purra <http://joelpurra.se/>
* Released under MIT, BSD and GPL license. Comply with at least one.
*
* A jQuery plugin to check if *anything* has changed in *any form* on a page,
* and warn the user before leaving the page.
*/
// https://gist.github.com/

// Any form elements that trigger a .change() jQuery event will also trigger
// showing the warning, when the user tries to navigate away from the page.
// Navigation in this case includes clicking a link, the browser's back button,
// reloading the page etcetera. It does not include submitting any of the forms,
// as submitting the form is assumed to save the changes the user has made.

// Not covered: This simple plugin does not distinguish between multiple forms
// on a page. If the user changes fields in multiple forms and then submits one,
// there will be no warning shown for the other forms.

// Options: JoelPurra.PageHasFormChanges.setOptions({ /* … */ });
//    leavingPageWarningMessage: "y u no save changes?".
//    resetWarningOnPreventedSubmit: default false. Don't reset if for example
//        form validation wasn't successful. Change to true if you prevent the
//        default browser form submit and use ajax instead.

// Uses Ben Alman's JavaScript Debug: A simple wrapper for console.log
// http://benalman.com/projects/javascript-debug-console-log/

/*jslint vars: true, white: true, browser: true*/
/*global jQuery*/

// Set up namespace, if needed
var JoelPurra = JoelPurra || {};

(function ($, namespace)
{
   namespace.PageHasFormChanges = {};

    var defaultOptions = {
        leavingPageWarningMessage: "Changes have been detected in the form. Leaving the page will discard all form input.",
        resetWarningOnPreventedSubmit: false
    }

    var options = $.extend(true, {}, defaultOptions);

    var userHasChangedSomething = false;

    var tag = "PageHasFormChanges";

    $(document).change(function (e)
    {
        debug.log(tag, "$(document).change() detected", e);

        if (userHasChangedSomething !== true)
        {
            debug.info(tag, "Triggered by change event. Will warn user before leaving the page.");
        }

        userHasChangedSomething = true;
    });

    $(document).submit(function (e)
    {
        debug.log(tag, "$(document).submit() detected", e);

        if(e.isDefaultPrevented())
        {
            debug.log(tag, "$(document).submit() event was already prevented from actually submitting the form.", e);

            if(options.resetWarningOnPreventedSubmit !== true)
            {
                return;
            }
        }

        if (userHasChangedSomething === true)
        {
            debug.info(tag, "Reset by submit event. Will not warn user before leaving the page.");
        }

        userHasChangedSomething = false;
    });

    function initializeOnBeforeUnloadListener()
    {
        // From http://jonathonhill.net/2011-03-04/catching-the-javascript-beforeunload-event-the-cross-browser-way/
        window.onbeforeunload = function (e)
        {
            if (userHasChangedSomething !== true)
            {
                return null;
            }

            var e = e || window.event;

            // For IE and Firefox prior to version 4
            if (e)
            {
                e.returnValue = options.leavingPageWarningMessage;
            }

            // For Safari
            return options.leavingPageWarningMessage;
        };
    }

    namespace.PageHasFormChanges.setOptions = function (userOptions)
    {
        var optionsBefore = options;

        options = $.extend(true, {}, options, userOptions);

        debug.log(tag, "setOptions", optionsBefore, userOptions, options);
    }

    function atStartup()
    {
        initializeOnBeforeUnloadListener();
    }

    atStartup();

}(jQuery, JoelPurra));