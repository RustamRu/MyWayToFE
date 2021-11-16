function getRandomTime(minValue, maxValue) { 
    return String(Math.floor(Math.random() * (maxValue - minValue)) + minValue).padStart(2, "0");
}