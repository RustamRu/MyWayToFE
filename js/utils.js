function getRandomTime(minValue, maxValue) {
    return String(Math.floor(Math.random() * (maxValue - minValue)) + minValue).padStart(2, "0");
}
function getFormattedTime(duration) {
    return String(Math.floor(duration / 60)).padStart(2, "0") + ':' + String(duration % 60).padStart(2, "0");
}
function getFormattedDate(date) {
    const formattedDate = new Date(date);
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return formattedDate.toLocaleString("ru", options);
}