function redirectTo(route) {
    console.log(`${URLBase}page/${route}.html`)
    window.location.href = `${URLBase}page/${route}.html`;
}
