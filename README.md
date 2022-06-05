# hide-cra-error-overlay

### Minimize the Create React App error overlay by default. ###

During development, create React App displays a full-screen error overlay for webpack compilation errors. 
Particularly with Typescript errors, sometimes you want to temporarily ignore these to see your app.
This package hides the error overlay by default whenever it appears, and adds a small "Show Errors" button to the lower right of the screen 
that can toggle them.

### Installation
```
  npm i hide-cra-error-overlay
```
### Usage
In src/index.js (or another project file):
```javascript
import "hide-cra-error-overlay";
```
That's it! the overlay will be replaced with the "Show Errors" button from now on.

### Config
To adjust the behavior, you can optionally import `initHideOverlay` and invoke it with any of the options in the example below. Values shown below are the defaults. Note that before this function is invoked, the default behavior will be in place.
```javascript
import {initHideOverlay} from "hide-cra-error-overlay";

initHideOverlay({
    overlayId: "webpack-dev-server-client-overlay", //DOM id of the 'overlay' element to hide (if there were ever another element you wanted to hide when it appears in development)
    withRestoreButton: true, //whether or not to add the "Show Errors" button
    disable: false, //disable hiding, restore original CRA behavior
});
```
This function can be invoked multiple times for different config at different points in execution (e.g., when a certain component is mounted).