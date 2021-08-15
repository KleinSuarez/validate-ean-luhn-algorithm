const CARD_CODE_LENGTH = 16;
window.onload = () => {
    $form = document.querySelector('.luhn-form');

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        let form = new FormData($form);
        let cardCode = form.get('cardCode');

        let result = document.querySelector('.result');
        if (cardCode == 0) result.innerHTML = ''
        else result.innerHTML = this.validateCreditCard(cardCode);
    })
}


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

function sumDigitsNumber(number) {
    let sumNumberDigits = 0;
    number.toString().split('').forEach(index => sumNumberDigits += parseInt(index));
    return sumNumberDigits;
}



function verifyCardType(cardCode, card) {
    let cardType = card.map(cardType => {
        if (cardCode.slice(0, 1).includes(cardType.code)) return cardType.name
    }).filter(Boolean);
    return (card.length !== 0) ? cardType : '';
}