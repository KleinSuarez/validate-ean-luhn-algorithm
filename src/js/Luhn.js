/**
 * @type {number} logitud of credit card code
 * 
 */
const CARD_CODE_LENGTH = 16;

/**
 * 
 * This is the load function, the DOM selectors are loaded and events are added to validate the credit 
 * card number entered by the user.
 * 
 */
window.onload = () => {
    $form = document.querySelector('.luhn-form');

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        let form = new FormData($form);
        let cardCode = form.get('cardCode');
        if (cardCode.includes(' ')) cardCode = removeSpaces(cardCode);

        let result = document.querySelector('.result');
        if (cardCode == 0) result.innerHTML = ''
        else (cardCode.length !== CARD_CODE_LENGTH) ? result.innerHTML = `<label style="color:#991B1B">código no válido</label>` : result.innerHTML = this.validateCreditCard(cardCode);
    })
}

/**
 * 
 * This is a function for validation credit cards number the digits of the entered number are added, 
 * following the rule of the even positions multiply by 2 and the odd positions leave it the same
 * in order to validate if the calculated control number is equal to the entered
 * 
 * @param {string} cardCode number credit card entered for user
 * @returns returns if the number of credit card is valid or not and the type of card
 * 
 */
function validateCreditCard(cardCode) {
    let sumDigits = 0;
    let verificationDigit = cardCode.slice(-1);
    for (let index = 0; index < CARD_CODE_LENGTH - 1; index++) {
        if (index % 2 == 0) {
            sumDigits += (cardCode[index] * 2 >= 10) ? sumDigitsNumber(cardCode[index] * 2) : cardCode[index] * 2;
        }
        else sumDigits += Number(cardCode[index]);
    }
    if (10 - (sumDigits % 10) == verificationDigit) return `Tarjeta válida ${verifyCardType(cardCode, card)}`;
    else return 'Tarjeta no válida ';
}

/**
 * 
 * @param {number} number number of two or more digits that results of the validations process 
 * @returns sum of the consecutive digits of the number
 * 
 */
function sumDigitsNumber(number) {
    let sumNumberDigits = 0;
    number.toString().split('').forEach(index => sumNumberDigits += parseInt(index));
    return sumNumberDigits;
}

/**
 * 
 * @param {string} cardCode number credit card entered for user
 * @param {Array} card list card available whith code and type
 * @returns {object} type credit card entered
 * 
 */
function verifyCardType(cardCode, card) {
    let cardType = card.map(cardType => {
        if (cardCode.slice(0, 1).includes(cardType.code)) return cardType.name
    }).filter(Boolean);
    return (card.length !== 0) ? cardType : '';
}