let creditIsOn = false;



function giveCredit() {
  if (creditIsOn === false) {
    creditsBox.style.display = "block";
    creditIsOn = true;
  } else {
    creditsBox.style.display = "none";
    creditIsOn = false;
  }
}

function closeCreditsFunc(){
    creditsBox.style.display = "none";
    creditIsOn = false;
}