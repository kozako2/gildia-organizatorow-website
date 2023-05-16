var lastFocus, dialog, closeButton, pagebackground;

var openedModal = undefined;

function toggleDialog(sh, index) {
    var index = Number(index);

    console.log("modalId: " + index + " sh: " + sh);
    dialogParent = document.getElementById("memberDetailsModalBackground");

    dialog = dialogParent.querySelectorAll(":scope > div")[index];
    closeButton = dialog.getElementsByClassName("close-button")[0];
    pagebackground = document.getElementById("bg");

    if (sh === "show") {
        lastFocus = document.activeElement;

        openedModal = index;

        // show the dialog 
        dialog.classList.add("member-details-modal-content-opened");
        dialogParent.style.display = 'block';

        // siblings on the left and right
        displayPreviousTile(index);
        displayNextTile(index);

        // after displaying the dialog, focus an element inside it
        closeButton.focus();

        // only hide the background *after* you've moved focus out of the content that will be "hidden"
        pagebackground.setAttribute("aria-hidden", "true");

    } else {
        hidePreviousTile(index);
        hideNextTile(index);
        openedModal = undefined;
        dialog.classList.remove("member-details-modal-content-opened");
        dialogParent.style.display = 'none';
        pagebackground.setAttribute("aria-hidden", "false");
        lastFocus.focus();
    }
}

function displayPreviousTile(index) {
    var previousTile = getModalByIndex(getPreviousTileIndex(index));
    previousTile.classList.add("member-details-modal-content-right-preview");
}

function hidePreviousTile(index) {
    var previousTile = getModalByIndex(getPreviousTileIndex(index));
    previousTile.classList.remove("member-details-modal-content-right-preview");
}

function displayNextTile(index) {
    var nextTile = getModalByIndex(getNextTileIndex(index));
    nextTile.classList.add("member-details-modal-content-left-preview");
}
function hideNextTile(index) {
    var nextTile = getModalByIndex(getNextTileIndex(index));
    nextTile.classList.remove("member-details-modal-content-left-preview");
}

function modalNavigationLeft() {
    var newIndex = getPreviousTileIndex(openedModal);
    toggleDialog("hide", openedModal);
    toggleDialog("show", newIndex);
}

function modalNavigationRight() {
    var newIndex = getNextTileIndex(openedModal);
    toggleDialog("hide", openedModal);
    toggleDialog("show", newIndex);
}

function getPreviousTileIndex(index) {
    var dialogParent = document.getElementById("memberDetailsModalBackground");
    var numberOfTiles = dialogParent.querySelectorAll(":scope > div").length;
    return ((index - 1) % numberOfTiles + numberOfTiles) % numberOfTiles;
}

function getNextTileIndex(index) {
    var dialogParent = document.getElementById("memberDetailsModalBackground");
    var numberOfTiles = dialogParent.querySelectorAll(":scope > div").length;
    return (index + 1) % numberOfTiles;
}

function getModalByIndex(index) {
    var dialogParent = document.getElementById("memberDetailsModalBackground");
    return dialogParent.querySelectorAll(":scope > div")[index];
}

document.addEventListener("focus", function (event) {
    var d = getModalByIndex(openedModal);

    if (openedModal !== undefined && !d.contains(event.target)) {
        event.stopPropagation();
        d.focus();
    }

}, true);

document.addEventListener("keydown", function (event) {
    if (openedModal !== undefined && event.code === "Escape") {
        toggleDialog('hide', openedModal);
    }
    else if (openedModal !== undefined && event.code === "ArrowLeft") {
        modalNavigationRight();
    }
    else if (openedModal !== undefined && event.code === "ArrowRight") {
        modalNavigationLeft();
    }
}, true);
