const input1 = "The quick brown fox jumps over the lazy dog.";
const text1 = "The quick brown fox jumps over the lazy dog.";
const expectedAccuracy1 = 100;

calculateResults(input1, text1);
console.log(accuracyElement.textContent === expectedAccuracy1); // true

const input2 = "The quick brown fox jumps over the lazy cat.";
const text2 = "The quick brown fox jumps over the lazy dog.";
const expectedAccuracy2 = 85;

calculateResults(input2, text2);
console.log(accuracyElement.textContent === expectedAccuracy2); // true

const input3 = "";
const text3 = "The quick brown fox jumps over the lazy dog.";
const expectedWpm3 = 0;
const expectedAccuracy3 = 0;

calculateResults(input3, text3);
console.log(wpmElement.textContent === expectedWpm3); // true
console.log(accuracyElement.textContent === expectedAccuracy3); // true