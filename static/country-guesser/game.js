// problematic countries:

// Martinique

// bugs

// hint color doesnt always disappear after solving

var settingsGameDifficulty;
var settingsGameSelection;

var mapSVG;
var zoomAndPanElement;

// game variables
var gameCountries;             // next countries to find

var gameCorrectCountries;
var gameWrongCountries;

var gamePoints;
var gameTime;

var gameWrongGuesses;
var gameRightGuesses;
var gameConsecutiveWrongGuesses;

var gameStartPoint;

var all_countries;

function setupGame() {
    // sort out html and zooming/paning of svg
    mapSVG = document.getElementById(idMap);
    
    zoomAndPanElement = svgPanZoom("#" + idMap, {
        zoomEnabled: true,
        controlIconsEnabled: false,
        minZoom: 0.1,
        onZoom: onZoom
    });
    
    // make one array with all countries and add mouse events
    all_countries = [].concat(africa, asia, europe, north_america, south_america, oceania, antarctica);
    
    console.log(all_countries.length);
    
    for (var i = 0; i < all_countries.length; i++) {
        setupMouseEventsForCountry(all_countries[i]);
    }
    
    onZoom(1.0);
    setDifficulty(gameDifficultyNormal);
    setSelection(selectionWorld);
    setupLabel();
    
}

function startGame() {
    if(settingsGameSelection == selectionWorld) {
        gameCountries = shuffle(all_countries);
    } else if(settingsGameSelection == selectionAfrica) {
        gameCountries = shuffle(africa);
    } else if(settingsGameSelection == selectionEurope) {
        gameCountries = shuffle(europe);
    } else if(settingsGameSelection == selectionNorthAmerica) {
        gameCountries = shuffle(north_america);
    } else if(settingsGameSelection == selectionSouthAmerica) {
        gameCountries = shuffle(south_america);
    } else if(settingsGameSelection == selectionOceania) {
        gameCountries = shuffle(oceania);
    } else if(settingsGameSelection == selectionAsia) {
        gameCountries = shuffle(asia);
    }
    
    
    gameCorrectCountries = []
    gameWrongCountries = []
    gamePoints = 0
    gameRightGuesses = 0
    gameWrongGuesses = 0
    gameConsecutiveWrongGuesses = 0
    
    gameStartPoint = new Date();
    
    var label = document.getElementById(idLabel);
    if(isdifNoob()) {
        label.setAttributeNS(null, tOpacity, opacityVisible);  
    } else {
        label.setAttributeNS(null, tOpacity, opacityInvisible);  
    }
    nextCountry();
}

// to shuffle the countries
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function stopGame() {
    gameCountries = []
    
    document.getElementById(idLowerLabel).textContent = startText;
}

function getSVGPointFromNormalPoint(x, y) {
    var svgDropPoint = mapSVG.createSVGPoint();
    
    svgDropPoint.x = x;
    svgDropPoint.y = y;
    
    viewport = document.getElementsByClassName(mainGroupSelector)[0]
    svgDropPoint = svgDropPoint.matrixTransform(viewport.getCTM().inverse());
    return svgDropPoint;
}

function addClassToObjectsOfCountry(country, newclass) {
    objects = document.getElementsByClassName(country)
    for (var i=0; i<objects.length; i++) {
        objects.item(i).classList.add(newclass)
    }
}
function removeClassFromObjectsOfCountry(country, oldclass) {
    objects = document.getElementsByClassName(country)
    for (var i=0; i<objects.length; i++) {
        objects.item(i).classList.remove(oldclass)
    }
}

function setupLabel()
{
    // create one label that can show the current country (mouse hover)
    var label = document.createElementNS(mapSVG.namespaceURI, tText);
    label.setAttributeNS(null, tId, idLabel); 
    label.setAttributeNS(null, tFontSize, labelFontSize);
    label.setAttributeNS(null, tFontFamily, labelFontFamily);
    label.setAttributeNS(null, tOpacity, opacityInvisible);

    var textNodeOfLabel = document.createTextNode("");
    label.appendChild(textNodeOfLabel);
            
    mapSVG.appendChild(label);
    
    // move label to always be next to mouse
    mapSVG.addEventListener(mouseMove, function(evt){
        var label = document.getElementById(idLabel);
        
        label.setAttributeNS(null, tx, evt.clientX+5);    
        label.setAttributeNS(null, ty, evt.clientY+10);       
    });
}

function showCountryLabel() {
    document.getElementById(idLabel).setAttributeNS(null, tOpacity, opacityVisible);
}
function hideCountryLabel() {
    document.getElementById(idLabel).setAttributeNS(null, tOpacity, opacityInvisible);
}
function showNextCountry() {
    if(isdifNoob()) {
        addClassToObjectsOfCountry(gameCountries[0], svgClassNextCountryHint);
    }
}
function nextCountry() {
    document.getElementById(idLowerLabel).innerHTML = questionTextStart + countryDictionaryNames[gameCountries[0].toUpperCase()] + questionTextEnd;
}

function circlesSetOpacity(opacity) {
    objects = document.getElementsByClassName(svgClassCircle)
    for (var i=0; i<objects.length; i++) {
        objects[i].setAttributeNS(null,tOpacity,opacity);
    }
}

// events

function clickedOnCountry(country) {
    if(!gameCountries || gameCountries.length == 0) {
        startGame();
        return;
    }
    if(country == gameCountries[0]) {
        removeClassFromObjectsOfCountry(svgClassNextCountryHint, svgClassNextCountryHint);
        
        gameConsecutiveWrongGuesses = 0;
        gameRightGuesses++;
        
        if(!isdifHard()) {
            addClassToObjectsOfCountry(country, svgClassSolved);
        }
        
        gameCountries.shift();
        
        if(gameCountries.length == 0) {
            // WINNING!
        } else {
            nextCountry();
        }
    }
    else {
        gameWrongGuesses++;
        gameConsecutiveWrongGuesses++;
    }
}

function mouseEnterCountry(evt) {
    addClassToObjectsOfCountry(this.id, cssClassMouseOver);
    document.getElementById(idLabel).textContent = countryDictionaryNames[this.id.toUpperCase()];
}
function mouseOutCountry() {
    removeClassFromObjectsOfCountry(this.id, cssClassMouseOver);
    hideCountryLabel();
}
function mouseDownCountry() {
    addClassToObjectsOfCountry(this.id, cssClassMouseDown);
}
function mouseUpCountry() {
    clickedOnCountry(this.id);
    removeClassFromObjectsOfCountry(this.id, cssClassMouseDown);
    removeClassFromObjectsOfCountry(cssClassMouseDown, cssClassMouseDown);
}
function setupMouseEventsForCountry(country) {
    object = document.getElementById(country)
        
    if(object) {
        object.addEventListener(mouseEnter, mouseEnterCountry);
        object.addEventListener(mouseOut, mouseOutCountry);
            
        object.addEventListener(mouseDown, mouseDownCountry);
        object.addEventListener(mouseUp, mouseUpCountry);
    } 
    else {
        console.log("couldn't find country: " + country)
    }
}

function onZoom(newZoom)
{
    if(newZoom > 2.5) {
         circlesSetOpacity(opacityHalfVisible);
    }
    else {
         circlesSetOpacity(opacityInvisible);
    }
}
function isdifNoob() {
    return (settingsGameDifficulty == gameDifficultyNoob);
}
function isdifNormal() {
    return (settingsGameDifficulty == gameDifficultyNormal);
}
function isdifHard() {
    return (settingsGameDifficulty == gameDifficultyHard);
}

function setDifficulty(difficulty) {
    if(settingsGameDifficulty != difficulty) {
        settingsGameDifficulty = difficulty;
        document.getElementById(gameDifficultyNoob).classList.remove(cssClassSelected);
        document.getElementById(gameDifficultyNormal).classList.remove(cssClassSelected);
        document.getElementById(gameDifficultyHard).classList.remove(cssClassSelected);
        
        document.getElementById(settingsGameDifficulty).classList.add(cssClassSelected);
        stopGame()
    }
}

function setSelection(selection) {
    if(settingsGameSelection != selection) {
        settingsGameSelection = selection;
        document.getElementById(selectionWorld).classList.remove(cssClassSelected);
        document.getElementById(selectionAfrica).classList.remove(cssClassSelected);
        document.getElementById(selectionAsia).classList.remove(cssClassSelected);
        document.getElementById(selectionEurope).classList.remove(cssClassSelected);
        document.getElementById(selectionNorthAmerica).classList.remove(cssClassSelected);
        document.getElementById(selectionSouthAmerica).classList.remove(cssClassSelected);
        document.getElementById(selectionOceania).classList.remove(cssClassSelected);
        
        document.getElementById(settingsGameSelection).classList.add(cssClassSelected);
        stopGame()
    }
}

window.onload = setupGame()