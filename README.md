# hide-cra-error-overlay

### Hide the Create React App error overlay behind a "Show Errors" button. ##



### Installation
```
  npm i hide-cra-error-overlay
```
### Usage
In src/index.js (or another project file):
```javascript
if (process.env.NODE_ENV !== "production") {
  import("hide-cra-error-overlay");
}
```
That's it! the overlay will be replaced with the "Show Errors" button from now on.

### Screenshots
Before (overlay):

<img src="https://user-images.githubusercontent.com/12928449/172033836-5daadd0e-d237-4546-9afa-5244cce43211.png" width="400" height="300">

After (button):

<img src="https://user-images.githubusercontent.com/12928449/172033833-0b601939-8a87-4b76-afc9-2520c2554923.png" width="400" height="300">

### Why would someone use this?
During development, Create React App displays a full-screen error overlay for webpack compilation errors. The config for this is only accessible by ejecting- but particularly with Typescript errors, sometimes you may just want to temporarily ignore these to be able to test your app.
When imported, this module hides the error overlay whenever it is triggered. It also adds a small "Show Errors" button to the lower right of the screen- click this to toggle the original error overlay on/off at any time.

### In Production
Assuming that you follow the recommended usage above, there is zero impact on production bundle size from using this. CRA's webpack config will strip out the contents of the NODE_ENV !== "production" conditional for the production build, and a dynamic import is used to prevent inclusion in the bundle unless that condition is met.

### Config
To adjust the behavior, you can optionally import `initHideOverlay` and invoke it with any of the options in the example below. Values shown below are the defaults. Note that before this function is invoked, the default behavior will be in place.
```javascript
import {initHideOverlay} from "hide-cra-error-overlay";

initHideOverlay({
    //DOM id(s) of the 'overlay' element to hide when it appears
    //(assumed to be a direct child of document.body)
    //can be a string, or an array of ids to check for in order.
    overlayId: ["webpack-dev-server-client-overlay-div", "webpack-dev-server-client-overlay"],
    
    //whether or not to add the "Show Errors" button
    withRestoreButton: true,
   
   //disable hiding, restore original CRA behavior
   disable: false, 
});
```
`initHideOverlay` can be invoked multiple times for different config at different points in execution (e.g., when a certain component is mounted).
