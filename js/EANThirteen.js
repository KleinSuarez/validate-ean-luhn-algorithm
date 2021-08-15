const EAN_THIRTEEN_LENGTH = 13;

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

function verifyEANCode(barCode, originalBarCode) {
    if (barCode.includes(' ')) barCode = removeSpaces(barCode);
    if (barCode.length < 13) barCode = padLeft(barCode);

    let checkDigit = barCode.charAt(EAN_THIRTEEN_LENGTH - 1);
    return verifyCheckDigit(checkDigit, barCode) == 'Si' ? `${verifyCheckDigit(checkDigit, barCode)} ${verifyCountry(originalBarCode, countries)}` : `${verifyCheckDigit(checkDigit, barCode)}`;
}

function padLeft(barCode) {
    return (barCode.toString().length < EAN_THIRTEEN_LENGTH) ? padLeft('0' + barCode) : barCode;
}

function verifyCheckDigit(checkDigit, barCode) {
    let sum = sumDigits(barCode);
    let baseSum = sum.oddSum + sum.evenSum * 3;
    let calculatedDigit = ((roundedSum(sum) - baseSum) >= 10) ? 0 : (roundedSum(sum) - baseSum);

    if (baseSum == 0) return '';
    if (checkDigit == calculatedDigit) return 'Si';
    if (checkDigit !== calculatedDigit) return 'No';
}

function verifyCountry(originalBarCode, countries) {

    let country = countries.map(country => {
        if (originalBarCode.slice(0, country.code.toString().length).includes(country.code)) return country.name
    }).filter(Boolean);
    return (country.length !== 0) ? country : 'Desconocido';
}

function sumDigits(barCode) {
    let sum = { oddSum: 0, evenSum: 0 };

    for (let index = 0; index < barCode.length - 1; index++) {
        if (index % 2 == 0) sum.oddSum += Number(barCode[index])
        else sum.evenSum += Number(barCode[index])
    }
    return sum;
}

function roundedSum(sum) {
    return Math.ceil((sum.oddSum + sum.evenSum * 3) / 10) * 10;
}