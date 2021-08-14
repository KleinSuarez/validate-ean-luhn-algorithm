import { countries } from '../util/countries.js';
const EAN_THIRTEEN_LENGTH = 13;
let barCode = '5029365779425';

if (barCode.includes(' ')) barCode = removeSpaces(barCode);
if (barCode.length < 13) barCode = padLeft(barCode);

let checkDigit = barCode.charAt(EAN_THIRTEEN_LENGTH - 1)

console.log(`${verifyCheckDigit(checkDigit, barCode)} ${verifyCountry(barCode, countries)}`)

function removeSpaces(barCode, countries) {
    return barCode.replace(/ /g, '');
}

function padLeft(barCode) {
    return (barCode.toString().length < EAN_THIRTEEN_LENGTH) ? padLeft('0' + barCode) : barCode;
}

function verifyCheckDigit(checkDigit, barCode) {
    let sum = sumDigits(barCode);
    let baseSum = sum.oddSum + sum.evenSum * 3;
    let calculatedDigit = ((roundedSum(sum) - baseSum) >= 10) ? 0 : (roundedSum(sum) - baseSum);

    if (baseSum == 0 && roundSum == 0) return '';
    if (checkDigit == calculatedDigit) return 'YES';
    if (checkDigit !== calculatedDigit) return 'NO';
}

function verifyCountry(barCode, countries) {
    let country = countries.map(country => {
        if (barCode.slice(0, country.code.toString().length).includes(country.code)) return country.name
    }).filter(Boolean);
    return country;
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