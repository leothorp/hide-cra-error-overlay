# hide-cra-error-overlay

## Minimize the Create React App error overlay by default. ##
### Motivation
During development, Create React App displays a full-screen error overlay for webpack compilation errors. This can't be disabled without ejecting- but particularly with Typescript errors, sometimes you may just want to temporarily ignore these to see your app.
When imported, this module hides the error overlay whenever it is triggered. It replaces it with a small "Show Errors" button to the lower right of the screen 
that can toggle the overlay back on.

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
### In Production
The contents of this module are compiled away by webpack when `process.env.NODE_ENV === 'production'`, so leaving in the import won't impact your bundle size. `initHideOverlay` becomes a no-op if used in production.
### Config
To adjust the behavior, you can optionally import `initHideOverlay` and invoke it with any of the options in the example below. Values shown below are the defaults. Note that before this function is invoked, the default behavior will be in place.
```javascript
import {initHideOverlay} from "hide-cra-error-overlay";

initHideOverlay({
    //DOM id of the 'overlay' element to hide when it appears
    //(assumed to be a direct child of document.body)
    overlayId: "webpack-dev-server-client-overlay", 
    
    //whether or not to add the "Show Errors" button
    withRestoreButton: true,
   
   //disable hiding, restore original CRA behavior
   disable: false, 
});
```
`initHideOverlay` can be invoked multiple times for different config at different points in execution (e.g., when a certain component is mounted).
