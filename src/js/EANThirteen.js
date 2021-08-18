/**
 * @type {number} logitude of bar code
 * 
 */
const EAN_THIRTEEN_LENGTH = 13;

/**
 * 
 * This is the load function, the DOM selectors are loaded and events are added to validate the credit 
 * card number entered by the user.
 * 
 */
window.onload = () => {
    $form = document.querySelector('.ean-form');
    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        let form = new FormData($form);
        let barCode = form.get('barCode');
        let originalBarCode = barCode;

        inputValue = document.querySelector('.barCode');
        inputValue.value = barCode = padLeft(barCode);

        let result = document.querySelector('.result');
        if (barCode == 0) result.innerHTML = ''
        else (barCode.length > EAN_THIRTEEN_LENGTH) ? result.innerHTML = `<label style="color:#991B1B">longitud mayor a la esperada</label>` : result.innerHTML = this.verifyEANCode(barCode, originalBarCode);
    })
}


/**
 * main verification barcode function
 * 
 * @param {string} barCode entered barcode by user
 * @param {string} originalBarCode entered barcode by user
 * @returns result of executed verifyCheckDigit function
 */
function verifyEANCode(barCode, originalBarCode) {
    if (barCode.includes(' ')) barCode = removeSpaces(barCode);
    if (barCode.length < 13) barCode = padLeft(barCode);

    let checkDigit = barCode.charAt(EAN_THIRTEEN_LENGTH - 1);
    return verifyCheckDigit(checkDigit, barCode) == 'Si' ? `${verifyCheckDigit(checkDigit, barCode)} ${verifyCountry(originalBarCode, countries)}` : `${verifyCheckDigit(checkDigit, barCode)}`;
}


/**
 * 
 * @param {String} barCode entered barcode by user
 * @returns if the array is shorter whith EAN_THIRTEEN_LENGTH it returns a string with leading zeros otherwise it returns the same array
 */
function padLeft(barCode) {
    return (barCode.toString().length < EAN_THIRTEEN_LENGTH) ? padLeft('0' + barCode) : barCode;
}


/**
 *  This function calculates the verification digit and compares it with the code entered to see if it is valid or not
 * 
 * @param {Number} checkDigit verification digit of the barcode entered
 * @param {string} barCode barcode entered by user
 * @returns returns 'Si' if the barcode is valid otherwise returns 'No' or if the code is zero returns empty
 */
function verifyCheckDigit(checkDigit, barCode) {
    let sum = sumDigits(barCode);
    let baseSum = sum.oddSum + sum.evenSum * 3;
    let calculatedDigit = ((roundedSum(sum) - baseSum) >= 10) ? 0 : (roundedSum(sum) - baseSum);

    if (baseSum == 0) return '';
    return (checkDigit == calculatedDigit) ? 'Si' : 'No';
}

/**
 * 
 * @param {String} originalBarCode barcode entered by user
 * @param {Array} countries list of countries available for validation
 * @returns If the country corresponding to the code in the barcode is in the list, it returns it, 
 * otherwise it returns unknown
 */
function verifyCountry(originalBarCode, countries) {
    let country = countries.map(country => {
        if (originalBarCode.slice(0, country.code.toString().length).includes(country.code)) return country.name
    }).filter(Boolean);
    return (country.length !== 0) ? country : 'Desconocido';
}

/**
 * 
 * @param {String} barCode entered barcode by user
 * @returns object whith sum of digits in odd and even positions of the barcode
 */
function sumDigits(barCode) {
    let sum = { oddSum: 0, evenSum: 0 };

    for (let index = 0; index < barCode.length - 1; index++) {
        if (index % 2 == 0) sum.oddSum += Number(barCode[index])
        else sum.evenSum += Number(barCode[index])
    }
    return sum;
}

/**
 * 
 * @param {Object} sum  sum of digits in odd and even positions of the barcode
 * @returns Number ceil
 */
function roundedSum(sum) {
    return Math.ceil((sum.oddSum + sum.evenSum * 3) / 10) * 10;
}