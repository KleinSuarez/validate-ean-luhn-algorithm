/**
 * 
 * @param {string} barCode barcode entered by user
 * @returns {string} barcode format string without spaces
 * 
 */
function removeSpaces(barCode) {
    return barCode.replace(/ /g, '');
}