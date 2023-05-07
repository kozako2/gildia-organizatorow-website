var lastFocus, dialog, closeButton, pagebackground;

var openedModal = undefined;

function toggleDialog(sh, modalId) {
    console.log("modalId: " + modalId + " sh: " + sh);
    dialog = document.getElementById(modalId);
    closeButton = dialog.getElementsByClassName("close-button")[0];
    pagebackground = document.getElementById("bg");

    if (sh === "show") {
        lastFocus = document.activeElement;

        openedModal = modalId;

        // show the dialog 
        dialog.style.display = 'block';

        // after displaying the dialog, focus an element inside it
        closeButton.focus();

        // only hide the background *after* you've moved focus out of the content that will be "hidden"
        pagebackground.setAttribute("aria-hidden", "true");

    } else {
        openedModal = undefined;
        dialog.style.display = 'none';
        pagebackground.setAttribute("aria-hidden", "false");
        lastFocus.focus();
    }
}


document.addEventListener("focus", function (event) {

    var d = document.getElementById(openedModal);

    if (openedModal !== undefined && !d.contains(event.target)) {
        event.stopPropagation();
        d.focus();
    }

}, true);

document.addEventListener("keydown", function (event) {
    // ESC closes the opened dialog
    if (openedModal !== undefined && event.keyCode == 27) {
        toggleDialog('hide', openedModal);
    }
}, true);
