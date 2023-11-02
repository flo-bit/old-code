/*
const mainGroupSelector = "svg-pan-zoom_viewport";

// calculate point in svg of map from point in browser window (e.g. mouse position)
function getSVGPointFromNormalPoint(x, y) {
    var svgDropPoint = mapSVG.createSVGPoint();
    
    svgDropPoint.x = x;
    svgDropPoint.y = y;
    
    viewport = document.getElementsByClassName(mainGroupSelector)[0]
    svgDropPoint = svgDropPoint.matrixTransform(viewport.getCTM().inverse());
    return svgDropPoint;
}*/
const mainGroupSelector = "svg-pan-zoom_viewport";

const gameDifficultyNoob = "GAME_DIFFICULTY_NOOB", 
      gameDifficultyNormal = "GAME_DIFFICULTY_NORMAL", 
      gameDifficultyHard = "GAME_DIFFICULTY_HARD";

const selectionWorld = "SELECTION_WORLD", 
      selectionEurope = "SELECTION_EUROPE", 
      selectionAfrica = "SELECTION_AFRICA", 
      selectionAsia = "SELECTION_ASIA", 
      selectionNorthAmerica = "SELECTION_NORTH_AMERICA", 
      selectionSouthAmerica = "SELECTION_SOUTH_AMERICA", 
      selectionOceania = "SELECTION_OCEANIA";

const cssClassSelected = "selected", 
      cssClassMouseOver = "mouseover", 
      cssClassMouseDown = "mousedown",
      svgClassSolved = "solved",
      svgClassCircle = "circle",
      svgClassNextCountryHint = "nextCountry";

const mouseEnter = "mouseenter", 
      mouseOut = "mouseout", 
      mouseDown = "mousedown", 
      mouseUp = "mouseup",
      mouseMove = "mousemove";

const idLabel = "label", 
      idMap = "map",
      idLowerLabel = "lowerLabel";

const startText = "Click on any country to start the game...",
      questionTextStart = "Where is <b>",
      questionTextEnd = "</b>?";

const labelFontFamily = "Montserrat",
      labelFontSize = "15",
      tFontFamily = "font-family",
      tFontSize = "font-size",
      tText = "text",
      tId = "id",
      ty = "y",
      tx = "x",
      tOpacity = "opacity";

const opacityHalfVisible = "0.5",
      opacityInvisible = "0.0",
      opacityVisible = "1.0";

const africa = ["dz","ao","bj","bw","bf","bi","cm","cv","cf","td","km","cd","cg","dj","eg","gq","er","et","ga","gm","gh","gn","gw","ci","ke","ls","lr","ly","mg","mw","ml","mr","mu","yt","ma","mz","na","ne","ng","re","rw","sh","st","sn","sc","sl","so","za","ss","sd","sz","tz","tg","tn","ug","zm","zw","eh"];
const asia =["af","am","az","bh","bd","bt","bn","kh","cn","cy","tl","ge","in","id","ir","iq","il","jp","jo","kz","kw","kg","la","lb","my","mv","mn","mm","np","kp","kr","om","pk","ps","ph","qa","sa","sg","lk","sy","tw","tj","th","tr","tm","ae","uz","vn","ye"];
const europe = ["al","ad","at","by","be","ba","bg","hr","cz","dk","ee","fi","fr","de","gr","gi","hu","is","ie","it","lv","li","lt","lu","mk","mt","md","mc","me","nl","no","pl","pt","ro","ru","sm","rs","sk","si","es","se","ch","ua","gb","va"];
const north_america = ["ai","ag","aw","bs","bb","bz","bm","vg","ca","ky","cr","cu","dm","do","sv","gl","gd","gt","ht","hn","jm","mq","mx","ms","ni","pa","pr","bl","kn","lc","mf","pm","vc","tt","tc","us","vi"];
const south_america = ["ar","bo","br","cl","co","ec","fk","gf","gy","py","pe","sr","uy","ve"];
const oceania = ["as","au","ck","fj","pf","gu","ki","mh","fm","nr","nc","nz","nu","mp","pw","pg","pn","ws","sb","to","tv","vu","wf"];
const antarctica = ["aq"];
    
const countryDictionaryNames = {"AD":"Andorra", "AE":"United Arab Emirates", "AF":"Afghanistan", "AG":"Antigua and Barbuda", "AI":"Anguilla", "AL":"Albania", "AM":"Armenia", "AO":"Angola", "AQ":"Antarctica", "AR":"Argentina", "AS":"American Samoa", "AT":"Austria", "AU":"Australia", "AW":"Aruba", "AX":"Åland Islands", "AZ":"Azerbaijan", "BA":"Bosnia and Herzegovina", "BB":"Barbados", "BD":"Bangladesh", "BE":"Belgium", "BF":"Burkina Faso", "BG":"Bulgaria", "BH":"Bahrain", "BI":"Burundi", "BJ":"Benin", "BL":"Saint Barthélemy", "BM":"Bermuda", "BN":"Brunei Darussalam", "BO":"Bolivia", "BQ":"Bonaire", "BR":"Brazil", "BS":"Bahamas", "BT":"Bhutan", "BV":"Bouvet Island", "BW":"Botswana", "BY":"Belarus", "BZ":"Belize", "CA":"Canada", "CC":"Cocos (Keeling) Islands", "CD":"Democratic Republic of the Congo", "CF":"Central African Republic", "CG":"Congo", "CH":"Switzerland", "CI":"Cote d'Ivoire", "CK":"Cook Islands", "CL":"Chile", "CM":"Cameroon", "CN":"China", "CO":"Colombia", "CR":"Costa Rica", "CU":"Cuba", "CV":"Cape Verde", "CW":"Curaçao", "CX":"Christmas Island", "CY":"Cyprus", "CZ":"Czechia", "DE":"Germany", "DJ":"Djibouti", "DK":"Denmark", "DM":"Dominica", "DO":"Dominican Republic", "DZ":"Algeria", "EC":"Ecuador", "EE":"Estonia", "EG":"Egypt", "EH":"Western Sahara", "ER":"Eritrea", "ES":"Spain", "ET":"Ethiopia", "FI":"Finland", "FJ":"Fiji", "FK":"Falkland Islands", "FM":"Micronesia", "FO":"Faroe Islands", "FR":"France", "GA":"Gabon", "GB":"England", "GD":"Grenada", "GE":"Georgia", "GF":"French Guiana", "GG":"Guernsey", "GH":"Ghana", "GI":"Gibraltar", "GL":"Greenland", "GM":"Gambia", "GN":"Guinea", "GP":"Guadeloupe", "GQ":"Equatorial Guinea", "GR":"Greece", "GS":"South Georgia and the South Sandwich Islands", "GT":"Guatemala", "GU":"Guam", "GW":"Guinea-Bissau", "GY":"Guyana", "HK":"Hong Kong", "HM":"Heard Island and McDonald Islands", "HN":"Honduras", "HR":"Croatia", "HT":"Haiti", "HU":"Hungary", "ID":"Indonesia", "IE":"Ireland", "IL":"Israel", "IM":"Isle of Man", "IN":"India", "IO":"British Indian Ocean Territory", "IQ":"Iraq", "IR":"Iran", "IS":"Iceland", "IT":"Italy", "JE":"Jersey", "JM":"Jamaica", "JO":"Jordan", "JP":"Japan", "KE":"Kenya", "KG":"Kyrgyzstan", "KH":"Cambodia", "KI":"Kiribati", "KM":"Comoros", "KN":"Saint Kitts and Nevis", "KP":"Democratic People's Republic of Korea", "KR":"Republic of Korea", "KW":"Kuwait", "KY":"Cayman Islands", "KZ":"Kazakhstan", "LA":"Lao People's Democratic Republic", "LB":"Lebanon", "LC":"Saint Lucia", "LI":"Liechtenstein", "LK":"Sri Lanka", "LR":"Liberia", "LS":"Lesotho", "LT":"Lithuania", "LU":"Luxembourg", "LV":"Latvia", "LY":"Libya", "MA":"Morocco", "MC":"Monaco", "MD":"Moldova", "ME":"Montenegro", "MF":"Saint Martin", "MG":"Madagascar", "MH":"Marshall Islands", "MK":"Macedonia", "ML":"Mali", "MM":"Myanmar", "MN":"Mongolia", "MO":"Macau", "MP":"Northern Mariana Islands", "MQ":"Martinique", "MR":"Mauritania", "MS":"Montserrat", "MT":"Malta", "MU":"Mauritius", "MV":"Maldives", "MW":"Malawi", "MX":"Mexico", "MY":"Malaysia", "MZ":"Mozambique", "NA":"Namibia", "NC":"New Caledonia", "NE":"Niger", "NF":"Norfolk Island", "NG":"Nigeria", "NI":"Nicaragua", "NL":"Netherlands", "NO":"Norway", "NP":"Nepal", "NR":"Nauru", "NU":"Niue", "NZ":"New Zealand", "OM":"Oman", "PA":"Panama", "PE":"Peru", "PF":"French Polynesia", "PG":"Papua New Guinea", "PH":"Philippines", "PK":"Pakistan", "PL":"Poland", "PM":"Saint Pierre and Miquelon", "PN":"Pitcairn", "PR":"Puerto Rico", "PS":"State of Palestine", "PT":"Portugal", "PW":"Palau", "PY":"Paraguay", "QA":"Qatar", "RE":"Réunion", "RO":"Romania", "RS":"Serbia", "RU":"Russia", "RW":"Rwanda", "SA":"Saudi Arabia", "SB":"Solomon Islands", "SC":"Seychelles", "SD":"Sudan", "SE":"Sweden", "SG":"Singapore", "SH":"Saint Helena, Ascension and Tristan da Cunha", "SI":"Slovenia", "SJ":"Svalbard and Jan Mayen", "SK":"Slovakia", "SL":"Sierra Leone", "SM":"San Marino", "SN":"Senegal", "SO":"Somalia", "SR":"Suriname", "SS":"South Sudan", "ST":"Sao Tome and Principe", "SV":"El Salvador", "SX":"Sint Maarten", "SY":"Syria", "SZ":"Swaziland", "TC":"Turks and Caicos Islands", "TD":"Chad", "TF":"French Southern Territories", "TG":"Togo", "TH":"Thailand", "TJ":"Tajikistan", "TK":"Tokelau", "TL":"East Timor", "TM":"Turkmenistan", "TN":"Tunisia", "TO":"Tonga", "TR":"Turkey", "TT":"Trinidad and Tobago", "TV":"Tuvalu", "TW":"Taiwan", "TZ":"United Republic of Tanzania", "UA":"Ukraine", "UG":"Uganda", "UM":"United States Minor Outlying Islands", "US":"United States of America", "UY":"Uruguay", "UZ":"Uzbekistan", "VA":"Vatican City", "VC":"Saint Vincent and the Grenadines", "VE":"Venezuela", "VG":"British Virgin Islands", "VI":"U.S. Virgin Islands", "VN":"Viet Nam", "VU":"Vanuatu", "WF":"Wallis and Futuna", "WS":"Samoa", "YE":"Yemen", "YT":"Mayotte", "ZA":"South Africa", "ZM":"Zambia", "ZW":"Zimbabwe"};