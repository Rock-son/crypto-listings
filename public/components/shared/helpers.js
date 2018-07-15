"use strict";

/**
 * Returns spread, filtered and ordered array of objects
 * 
 * @param { desiredFields, objectToSpread, currency }
 * @return { spreadedAndFilteredData }
 */
function spreadAndFilterData(desiredFields, rawData, currency) {
        return rawData.map( obj => spreadObj(obj, desiredFields, currency));
}

function spreadObj(data, desiredFields, currency) {
    // spread nested properties and construct new obj with needed fields only
    const result = Object.assign({}, data, data.quotes[currency]);
    return Object.assign({}, desiredFields.map(key => key === "price" ? ({[`${key} (${currency})`]: result[key]}) : ({[key]: result[key]}))
        .reduce((obj, newObj) => Object.assign({}, obj, newObj), {}));
}


export { spreadAndFilterData };

