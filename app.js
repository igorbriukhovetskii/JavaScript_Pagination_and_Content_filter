/*This variable holds number of students entries
 * per page for pagination*/
var studentsOnPage = 10;

/*This function calculates number of pages
 in our pagination depending from number of
 student entries per page and length of students list
 (it can be all students list or just search result list)*/
function number_Of_Pages (s) {
    return Math.ceil(s.length / studentsOnPage);
}

/*This function removes selected node/-s from the DOM tree*/
function nodeRemove (oldNodeSelector, parentNodeSelector) {
    var oldNode = document.querySelectorAll(oldNodeSelector);
    var parentNode = document.querySelector(parentNodeSelector);
    for ( var i = 0; i < oldNode.length; i++) {
        parentNode.removeChild(oldNode[i]);
    }
}

/*This function hides element/-s on page*/
function hideElements (element) {
    for (var i = 0; i < element.length; i++) {
        element[i].style.display = "none";
    }
}

/*This function adds event listener to the pagination link.
 * When link is clicked, linkClicked function runs.
 * It detects which link was selected, hides all
 * students and shows part of students list on page we selected*/
function addClickToPagination() {
    var pagination = document.querySelectorAll(".pagination-link");
    for (var i = 0; i < pagination.length; i++) {
        pagination[i].addEventListener("click", linkClicked);
    }
}

/*This function makes element/-s on page visible*/
/*And adds event listener to the pagination links*/
function showElements (element) {
    for (var i = 0; i < element.length; i++) {
        element[i].style.display = "block";
    }
    /*Adding event listener to the pagination link.*/
    addClickToPagination();
}

/*This function removes class attribute value from element/-s */
function removeClass (element, className) {
    for (var i = 0; i < element.length; i++) {
        element[i].classList.remove(className)
    }
}

/*This function adds class attribute value to the element/-s*/
function addClass(element, className) {
    for (var i = 0; i < element.length; i++) {
        element[i].classList.add(className);
    }
}

/*This function works with search query text.
* It gets text, transforms it and checks query length.*/
function getSearchQuery () {
    /*Selecting search input field*/
    var searchField = document.querySelector("#search-input");
    /*Getting text value entered*/
    var searchQuery = searchField.value;
    /*Transforming text value*/
    searchQuery = searchQuery.toString().toUpperCase().split(" ");
    /*Checking if search query is at least three characters long.
     Showing warning if shorter*/
    if (searchQuery.toString().length < 3) {
        return searchQuery = "";
    }
    return searchQuery;
}

/*This is the search function. It compares search query with
* the text in selected HTML elements and adds class
* .search-result to selected predecessor*/
function textSearch(cssSelector) {
    /*Starting function to get search query*/
    var searchQuery = getSearchQuery();
    /*Selecting all HTML elements that contain strings which we need to
    * compare with search query*/
    var studentName = document.querySelectorAll(cssSelector); /*cssSelector*/
    /*Start cycling through all selected HTML elements*/
    for (var i = 0; i < studentName.length; i++) {
        /*Getting text from every HTML element that contains text we need*/
        var currentName = studentName[i].innerHTML;
        /*Transforming HTML element's text*/
        currentName = currentName.toUpperCase().split(" ");
        /*Start cycling through search query, it can be more than one word*/
        for (var j = 0; (j < searchQuery.length) && searchQuery[j]; j++) {
            /*Start cycling through HTML element's text, it can be more than one word*/
            for (var k = 0; k < currentName.length && currentName[k]; k++) {
                /*Comparing part of search query and part of HTML element's text*/
                var sub = currentName[k].indexOf(searchQuery[j]);
                if (sub !== -1) {
                    /*If there is mach then we add class .search-result to selected predecessor*/
                    var nodeFound = studentName[i].parentNode.parentNode;
                    nodeFound.classList.add("search-result");
                }
            }
        }
    }
}

/*Generating pagination list entries*/
function paginationListGenerator(pages) {
    /*Adding list items to the pagination list.
    * Number of list items depends from calculated number of pages*/
    var paginationUL = document.querySelector(".pagination");
    for (var i = 0; i < pages; i++) {
        var newPaginationListItem = document.createElement("li");
        paginationUL.appendChild(newPaginationListItem);
    }
    /*Adding links to the pagination list items*/
    var paginationLI = paginationUL.querySelectorAll("li");
    for (var j = 0; j < paginationLI.length; j++) {
        var newPaginationLink = document.createElement("a");
        paginationLI[j].appendChild(newPaginationLink);
    }
    var paginationLinks = paginationUL.querySelectorAll("a");
    /*Adding class to the pagination links*/
    addClass(paginationLinks, "pagination-link");
    /*Adding id attribute to the pagination links*/
    for (var k = 0; k < paginationLinks.length; k++) {
        paginationLinks[k].setAttribute("id", (k+1).toString());
    }
    /*Adding text to pagination buttons*/
    for (var l = 0; l < paginationLinks.length; l++) {
        paginationLinks[l].innerHTML = (l+1).toString();
    }
}

/*This function adds search input field to the page*/
function addSearchInputField () {
    var pageHeader = document.querySelector(".page-header");
    var newDiv = document.createElement("div");
    pageHeader.appendChild(newDiv);
    newDiv.classList.add("student-search");
    var searchWrapper = document.querySelector(".student-search");
    var newInput = document.createElement("input");
    searchWrapper.appendChild(newInput);
    newInput.setAttribute("id", "search-input");
    newInput.setAttribute("placeholder", "Search student");
}

/*This function adds search button to the page*/
function addSearchButton() {
    var searchWrapper = document.querySelector(".student-search");
    var newButton = document.createElement("button");
    searchWrapper.appendChild(newButton);
    newButton.setAttribute("id", "search-btn");
    newButton.innerHTML = "Search";
}

/*This function adds message to the page
 * if no students found*/
function addNotFoundMsg () {
    var pageHeader = document.querySelector(".page");
    var message = document.createElement("h3");
    pageHeader.appendChild(message);
    message.setAttribute("id", "not-found-msg");
    message.innerHTML = "No matches found.<br>Press ESC button to see full list of students<br>Or enter new student's name"
}

/*This function adds message to the page
* if search query is shorter than three characters*/
function addTooShortMsg() {
    var page = document.querySelector(".page");
    var tooShortMsg = document.createElement("h3");
    page.appendChild(tooShortMsg);
    tooShortMsg.classList.add("too-short-msg");
    tooShortMsg.innerHTML = "Search query must be at least three characters long<br>Press ESC button to see full list of students<br>Or enter new student's name"
}

/*This function adds message to the page to help user
* if he want to see full list of students*/
function addHelpMsg() {
    var searchInputField = document.querySelector(".page");
    var helpMessage = document.createElement("b");
    searchInputField.appendChild(helpMessage);
    helpMessage.classList.add("help-msg");
    helpMessage.innerHTML = "Press ESC to see full list of students";
}

/*This function removes previous messages from the page*/
function removeMsg() {
    var notFoundMessage = document.querySelector("#not-found-msg");
    var tooShortMsg = document.querySelector(".too-short-msg");
    var helpMsg = document.querySelector(".help-msg");
    if (notFoundMessage) {
        nodeRemove("#not-found-msg", ".page");
    }
    if (tooShortMsg) {
        nodeRemove(".too-short-msg", ".page");
    }
    if (helpMsg) {
        nodeRemove(".help-msg", ".page");
    }
}

/*This function transforms an collection element
* into the new array element*/
function collectionItemTransform() {
    return Array.prototype.slice.call(arguments, 0)
}

/*This function transforms an entire array-like collection
* into the new array*/
function collectionTransform(oldCollection) {
    var newArray = [];
    var newElement = [];
    for (var j = 0; j < oldCollection.length; j++) {
        newElement = collectionItemTransform(oldCollection[j]);
        newArray = newArray.concat(newElement);
    }
    return newArray;
}

/*This function generates pagination for search result
 * and shows results*/
function showSearchResults() {
    /*Selecting all students found*/
    var searchResult = document.querySelectorAll(".search-result");
    /*Checking if we found someone actually*/
    if (searchResult.length !== 0) {
        var numberOfPages = number_Of_Pages(searchResult);
    }
    /*Checking if we have more students in search result
     *than can be shown without pagination*/
    if (searchResult.length > studentsOnPage) {
        /*If we have more students that we want
         * to show on one page, than we generate
         * pagination*/
        paginationListGenerator(numberOfPages);
        var paginationLinks = document.querySelectorAll(".pagination-link");
        /*Adding class .active to the first page*/
        paginationLinks[0].classList.add("active");
        /*Hiding all students*/
        var allStudents = document.querySelectorAll(".student-item");
        hideElements(allStudents);
        /*Showing first group of students*/
        var studentsToShow = collectionTransform(searchResult);
        studentsToShow = studentsToShow.slice(0, studentsOnPage);
        showElements(studentsToShow);
        /*Adding help message*/
        addHelpMsg();
        /*If founded quantity of students is not more than
         * can be shown without pagination*/
    } else {
        /*Hiding all students*/
        allStudents = document.querySelectorAll(".student-item");
        hideElements(allStudents);
        /*Showing students we found*/
        studentsToShow = collectionTransform(searchResult);
        studentsToShow = studentsToShow.slice(0, studentsOnPage);
        showElements(studentsToShow);
        /*Adding help message*/
        addHelpMsg();
    }
    /*If no entries found appending "not-found" message*/
    if (searchResult.length === 0) {
        removeMsg();
        addNotFoundMsg();
    }
}

/*This function works with pagination links (for original list
of students and for search results list)*/
function linkClicked () {
    /*Selecting all pagination links*/
    var paginationLinks = document.querySelectorAll(".pagination-link");
    /*Removing class .active from all pagination links*/
    for (var i = 0; i < paginationLinks.length; i++) {
        paginationLinks[i].classList.remove("active");
    }
    /*Adding class .active to the link we clicked on*/
    this.classList.add("active");
    /*Selecting all students*/
    var allStudents = document.querySelectorAll(".student-item");
    /*Hiding all students*/
    hideElements(allStudents);
    /*Calculating start and finish indexes in the array of all students*/
    var startIndex = (this.getAttribute("id") - 1) * studentsOnPage;
    var endIndex = startIndex + studentsOnPage;
    /*Getting part of all students array, using start and finish indexes*/
    var selectedStudents = collectionTransform(allStudents);
    selectedStudents = selectedStudents.slice(startIndex, endIndex);
    /*Showing selected part of all students list*/
    showElements(selectedStudents);
}

/*This function provides search functionality.
It gets search inputs, filters all students array,
finds matches, generates pagination and shows selected students*/
function  searchClicked() {
    /*Selecting all students*/
    var allStudents = document.querySelectorAll(".student-item");
    /*Hiding all students*/
    hideElements(allStudents);
    /*Removing previous messages*/
    removeMsg();
    /*Removing class .search-result if it exists*/
    var searchResult = document.querySelectorAll(".search-result");
    if (searchResult.length !== 0) {
        removeClass(searchResult, "search-result");
    }
    /*Deleting all previous pagination if it exists*/
    var paginationLinks = document.querySelectorAll(".pagination-link");
    if (paginationLinks.length !== 0) {
        nodeRemove(".pagination li", ".pagination")
    }
    /*Getting search query from search field*/
    var searchQuery = getSearchQuery();
    /*Checking if search query isn't shorter than three characters*/
    if (searchQuery !== "") {
        /*Starting search in students names*/
        textSearch(".student-details h3");
        /*Starting search in students emails*/
        textSearch(".email");
        showSearchResults();
    } else {
        /*Adding message if search query is too short*/
        addTooShortMsg()
    }
}

/*This function runs after escape button is pressed.
* It removes all messages, clears previous search
* results and shows the original list of students
* with pagination*/
function escapePressed() {
    /*Selecting search input field*/
    var searchField = document.querySelector("#search-input");
    /*If escape button is pressed and there is text in search field*/
    /*Removing previous messages*/
    removeMsg();
    /*First we select all students*/
    var allStudents = document.querySelectorAll(".student-item");
    /*Then we hide all students*/
    hideElements(allStudents);
    /*Clearing all text in the search field*/
    searchField.value = "";
    /*Removing all previously generated pagination if it exists*/
    var pagination = document.querySelectorAll(".pagination li");
    if (pagination.length !== 0) {
        nodeRemove(".pagination li", ".pagination");
    }
    /*Calculating number of pages in
    * our pagination for full list of students*/
    var numberOfPages = number_Of_Pages(allStudents);
    /*Generating html code for pagination and adding it to the DOM tree*/
    paginationListGenerator(numberOfPages);
    /*Selecting first student's entries. Number of entries depending from
        the previously specified number of students per page */
    /*Showing first group of students*/
    var studentsToShow = collectionTransform(allStudents);
    studentsToShow = studentsToShow.slice(0, studentsOnPage);
    /*Showing the first group of students*/
    showElements(studentsToShow);
    /*Adding class .active to the first page of pagination*/
    var paginationLinks = document.querySelectorAll(".pagination-link");
    paginationLinks[0].classList.add("active");
}

/*This function runs as page finishes load
 * It creates initial pagination, shows first
 * pagination page and adds search input field*/
function pageLoad() {
    /*Selecting all students*/
    var allStudents = document.querySelectorAll(".student-item");
    /*Hiding all entries*/
    hideElements(allStudents);
    /*Calculating number of pages in pagination
     * depending from number of students*/
    number_Of_Pages(allStudents);
    /*Adding empty unordered list for pagination*/
    var page = document.querySelector(".page");
    var paginationUl = document.createElement("ul");
    page.appendChild(paginationUl);
    paginationUl.classList.add("pagination");
    /*Generating pagination*/
    paginationListGenerator(number_Of_Pages(allStudents));
    /*Showing students*/
    var studentsToShow = collectionTransform(allStudents);
    studentsToShow = studentsToShow.slice(0, studentsOnPage);
    showElements(studentsToShow);
    /*Adding class .active to the first pagination page*/
    var firstPaginationLink = paginationUl.querySelector(".pagination-link");
    firstPaginationLink.classList.add("active");
    /*Adding search input field to the document*/
    addSearchInputField();
    /*Adding search button to the document*/
    addSearchButton();

}

/*Adding event listener to the document
* When page is loaded, pageLoad function starts
* It generates initial pagination and shows first page*/
document.addEventListener("load", pageLoad());

/*Adding event listener to the "search" button.
* When it clicked, searchClicked function runs.
* It gets search query text, finds matches in
* students list and generate pagination for
* search result if needed*/
var searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchClicked);

/*Adding event listener to the ENTER key. When it pressed
* searchClicked function runs*/
window.addEventListener("keydown", function (event) {
    var searchInput = document.querySelector("#search-input");
    if (event.keyCode === 13 && searchInput.value) {
        searchClicked();
    }
});

/*Adding event listener to the ESC key. When it pressed
* escapePressed function runs. It clears input field, removes
* previous search results and shows full list of students
* with pagination*/
window.addEventListener("keydown", function (event) {
   if (event.keyCode === 27) {
       escapePressed();
   }
});

