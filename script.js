document.addEventListener("DOMContentLoaded", function () { 

  const lastPeriodInput = document.getElementById("lastPeriod"); 
  const cycleLengthInput = document.getElementById("cycleLength"); 
  const calculateBtn = document.getElementById("calculateBtn"); 
  const resultDisplay = document.getElementById("result"); 
  
   function calculateNextPeriod() { const lastPeriodDate = new Date(lastPeriodInput.value); 
    const cycleLength = parseInt(cycleLengthInput.value); 

     if (isNaN(lastPeriodDate) || isNaN(cycleLength) || cycleLength <= 0) { 
      resultDisplay.textContent = "Please enter valid inputs."; 
      resultDisplay.style.color = "red"; 
      
      return; } 
       const nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength); 
        
        resultDisplay.textContent = `Your next period is expected on: ${nextPeriodDate.toDateString()}`;
         resultDisplay.style.color = "black"; } 
         calculateBtn.addEventListener("click", calculateNextPeriod); 
        });