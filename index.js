const getOverlayEl = (id) => document.querySelector(`#${id}`);
const hideOverlay = (node) => {};
let observer = null;
const initHideOverlay = (
  config = ({
    overlayId = "webpack-dev-server-client-overlay",
    withRestoreButton = true,
  } = {})
) => {
  destroyObserver();
  //TODO: (what happens for wrong id)
  //TODO: (test prod bundle impact (lib for that?))
  observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      console.log("mutty", mutation);
      mutation.addedNodes.forEach((node) => {
        console.log("added node: ", node);
        if (node.target.id === overlayId) {
          minimize();
        }
      });
    });
  });
  const options = {
    subtree: false,
    childList: true,
  };
  observer.observe(document.querySelector("body"), options);
};

const destroyObserver = () => {
  observer?.disconnect();
  observer = null;
};
if (true) {
}
export default process.env.NODE_ENV === "development"
  ? initHideOverlay
  : () => {};
