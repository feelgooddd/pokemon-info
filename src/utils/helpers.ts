

function firstCharToUpper(text: string){
    return text[0].toUpperCase() + text.slice(1);
}
function removeHyphen(text: string){
    return text.replace("-", " ");
}

function weightInLbs(weight: number) {
  const lbs = weight / 4.5359237; // Convert hectograms to lbs
  return Math.round(lbs);
}

function heightInFtIn(height: number) {
  const meters = height / 10;
  const totalInches = meters * 39.3701;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);

  // handle cases like 12 inches = +1 foeet
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }

  return { feet, inches };
}



export {firstCharToUpper, weightInLbs, heightInFtIn, removeHyphen}