# [PageHasFormChanges](https://github.com/joelpurra/pagehasformchanges)

A jQuery plugin to check if *anything* has changed in *any form* on a page, and warn the user before leaving the page.



## Description

Any form elements that trigger a [`.change()` jQuery event](http://api.jquery.com/change/) will also trigger showing the warning, when the user tries to navigate away from the page. Navigation in this case includes clicking a link, the browser's back button, reloading the page etcetera, using the [`window.onbeforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window.onbeforeunload) event. It does not include submitting any of the forms, as submitting the form is assumed to save the changes the user has made.



## Not covered
This simple plugin does not distinguish between multiple forms on a page. If the user changes fields in multiple forms and then submits one, there will be no warning shown for the other forms.



## Usage

### Basic usage

Just load the script, and you're all set!


### Options

```javascript
JoelPurra.PageHasFormChanges.setOptions({
		// Change the message shown to the user.
		// Default: "Changes have been detected in the form. Leaving the page will discard all form input."
		leavingPageWarningMessage: "y u no save changes?",

		// Don't reset if for example form validation wasn't successful.
		// Change to true if you prevent the default browser form submit and use ajax instead.
		// Default: false
		resetWarningOnPreventedSubmit: true
	});
```



## Runtime dependencies
- [jQuery](http://jquery.com/)
- [Ben Alman's JavaScript Debug](http://benalman.com/projects/javascript-debug-console-log/), a simple wrapper for console.log



## License
Copyright (c) 2012, 2013 Joel Purra <http://joelpurra.com/>
All rights reserved.

When using PageHasFormChanges, comply to at least one of the three available licenses: BSD, MIT, GPL. Please see the `LICENSE` file for details.
