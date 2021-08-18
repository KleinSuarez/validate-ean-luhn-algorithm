/**
 * This is the redirect function route
 * @param {string}  route route
 * 
 */
function redirectTo(route) {
    window.location.href = `${devURLBase}page/${route}.html`;
}