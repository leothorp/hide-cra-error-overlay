let initHideOverlay = () => {};

  let observer = null;
  const defaults = {
    overlayId: [
      // "webpack-dev-server-client-overlay-div",
      "webpack-dev-server-client-overlay",
    ],
    withRestoreButton: true,
    disable: false,
  };

  const BUTTON_ID = "hide-cra-error-overlay-btn";

  //avoids violating CSP
  const setBtnStyles = (btn, styles) => {
    Object.entries(styles).forEach(([k, v]) => {
      btn.style[k] = v;
    });
  };
  const hideOverlay = (node, withRestoreButton) => {
    const id = node.id;

    if (withRestoreButton) {
      const btn = document.createElement("button");
      setBtnStyles(btn, {
        "background-color": "darkred",
        opacity: 0.5,
        width: "100px",
        "font-size": "14px",
        padding: "10px 0px",
        "text-align": "center",
        position: "fixed",
        color: "white",
        right: 0,
        bottom: 0,
        cursor: "pointer",
        "z-index": parseInt(node.style["z-index"]),
      });
      btn.id = BUTTON_ID;

      const maximize = (currOverlayEl, btn) => {
        if (currOverlayEl) {
          currOverlayEl.style.display = "block";
          btn.textContent = "Hide Errors";
        }
      };
      const minimize = (currOverlayEl, btn) => {
        if (currOverlayEl) {
          currOverlayEl.style.display = "none";
          btn.textContent = "Show Errors";
        }
      };
      btn.addEventListener("click", function (e) {
        const currOverlayEl = document.getElementById(id);
        const isShown = currOverlayEl.style.display !== "none";
        if (isShown) {
          minimize(currOverlayEl, e.target);
        } else {
          maximize(currOverlayEl, e.target);
        }
      });

      minimize(node, btn);
      document.body.appendChild(btn);
    } else {
      node.remove();
    }
  };

  const getElByOneOfIds = (ids) => {
    for (let i = 0; i < ids.length; i++) {
      const foundEl = document.getElementById(ids[i]);
      if (foundEl) {
        console.log('found', foundEl)
        return foundEl;
      }
    }
  };

  const _initHideOverlay = (userConfig = {}) => {
    debugger;
    const config = Object.assign({}, defaults, userConfig);
    const { overlayId, withRestoreButton, disable } = config;
    const normalizedOverlayIds = Array.isArray(overlayId)
      ? overlayId
      : [overlayId];
    destroyObserver();

    if (disable) {
      const currOverlayEl = getElByOneOfIds(normalizedOverlayIds);
      if (currOverlayEl) {
        currOverlayEl.style.display = "block";
      }
      const currButtonEl = document.getElementById(BUTTON_ID);
      if (currButtonEl) {
        currButtonEl.remove();
      }
      return;
    }

    observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (normalizedOverlayIds.includes(node.id)) {
            hideOverlay(node, withRestoreButton);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (normalizedOverlayIds.includes(node.id)) {
            const btn = document.getElementById(BUTTON_ID);
            if (btn) {
              btn.remove();
            }
          }
        });
      });
    });


    //kick it off async around when mutation observer is initialized
    setTimeout(() => {

      const initialOverlayEl = getElByOneOfIds(normalizedOverlayIds);
      if (initialOverlayEl) {
        hideOverlay(initialOverlayEl, withRestoreButton)
      }
    }, 200)

    const options = {
      subtree: false,
      childList: true,
    };
    observer.observe(document.body, options);
  };
  const destroyObserver = () => {
    observer?.disconnect();
    observer = null;
  };
  initHideOverlay = _initHideOverlay;
  initHideOverlay();


export { initHideOverlay };
