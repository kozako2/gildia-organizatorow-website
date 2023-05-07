var lastFocus, dialog, closeButton, pagebackground;

var openedModal = undefined;

function toggleDialog(sh, index) {
    var index = Number(index);

    console.log("modalId: " + index + " sh: " + sh);
    dialogParent = document.getElementById("memberDetailsModalBackground");

    dialog = dialogParent.querySelectorAll(":scope > div")[index];
    closeButton = dialog.getElementsByClassName("close-button")[0];
    pagebackground = document.getElementById("bg");

    var numberOfTiles = dialogParent.querySelectorAll(":scope > div").length;
    console.log(numberOfTiles);

    if (sh === "show") {
        lastFocus = document.activeElement;

        openedModal = index;

        // show the dialog 
        dialog.style.display = 'block';
        dialogParent.style.display = 'block';

        // siblings on the left and right
        displayPreviousTile(index, numberOfTiles);
        displayNextTile(index, numberOfTiles);

        // after displaying the dialog, focus an element inside it
        closeButton.focus();

        // only hide the background *after* you've moved focus out of the content that will be "hidden"
        pagebackground.setAttribute("aria-hidden", "true");

    } else {
        hidePreviousTile(index, numberOfTiles);
        hideNextTile(index, numberOfTiles);
        openedModal = undefined;
        dialog.style.display = 'none';
        dialogParent.style.display = 'none';
        pagebackground.setAttribute("aria-hidden", "false");
        lastFocus.focus();
    }
}

function displayPreviousTile(index, numberOfTiles) {
    var previousTileIndex = ((index - 1) % numberOfTiles + numberOfTiles) % numberOfTiles;
    var previousTile = dialogParent.querySelectorAll(":scope > div")[previousTileIndex];
    previousTile.classList.add("member-details-modal-content-right-preview");
    previousTile.style.display = "block";
}

function hidePreviousTile(index, numberOfTiles) {
    var previousTileIndex = ((index - 1) % numberOfTiles + numberOfTiles) % numberOfTiles;
    var previousTile = dialogParent.querySelectorAll(":scope > div")[previousTileIndex];
    previousTile.classList.remove("member-details-modal-content-right-preview");
    previousTile.style.display = "none";
}

function displayNextTile(index, numberOfTiles) {
    var nextTileIndex = (index + 1) % numberOfTiles;
    var nextTile = dialogParent.querySelectorAll(":scope > div")[nextTileIndex];
    nextTile.classList.add("member-details-modal-content-left-preview");
    nextTile.style.display = "block";
}
function hideNextTile(index, numberOfTiles) {
    var nextTileIndex = (index + 1) % numberOfTiles;
    var nextTile = dialogParent.querySelectorAll(":scope > div")[nextTileIndex];
    nextTile.classList.remove("member-details-modal-content-left-preview");
    nextTile.style.display = "none";
}

function modalNavigationRight() {
    var dialogParent = document.getElementById("memberDetailsModalBackground");
    var numberOfTiles = dialogParent.querySelectorAll(":scope > div").length;
    var newIndex = ((openedModal - 1) % numberOfTiles + numberOfTiles) % numberOfTiles;

    toggleDialog("hide", openedModal);
    toggleDialog("show", newIndex);
}

function modalNavigationLeft() {
    var dialogParent = document.getElementById("memberDetailsModalBackground");
    var numberOfTiles = dialogParent.querySelectorAll(":scope > div").length;
    var newIndex = (openedModal + 1) % numberOfTiles;
    toggleDialog("hide", openedModal);
    toggleDialog("show", newIndex);
}


document.addEventListener("focus", function (event) {

    var dialogParent = document.getElementById("memberDetailsModalBackground");
    var d = dialogParent.querySelectorAll(":scope > div")[openedModal];

    if (openedModal !== undefined && !d.contains(event.target)) {
        event.stopPropagation();
        d.focus();
    }

}, true);

document.addEventListener("keydown", function (event) {
    if (openedModal !== undefined && event.code === "Escape") {
        toggleDialog('hide', openedModal);
    }
    else if (openedModal !== undefined && event.code === "ArrowRight") {
        modalNavigationRight();
    }
    else if (openedModal !== undefined && event.code === "ArrowLeft") {
        modalNavigationLeft();
    }
}, true);
