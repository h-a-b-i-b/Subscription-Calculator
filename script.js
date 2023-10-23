const planDataToCompare = [];

function addPlanToCompare() {
    const rechargeAmountToCompare = parseFloat(document.getElementById('rechargeAmount').value);
    const validityPeriodToCompare = parseFloat(document.getElementById('validityPeriod').value);
    const includeGST = document.getElementById('includeGST').checked;

    if (!isNaN(rechargeAmountToCompare) && !isNaN(validityPeriodToCompare)) {
        const newPlan = { rechargeAmountToCompare, validityPeriodToCompare, includeGST };
        planDataToCompare.push(newPlan);
        document.getElementById('rechargeAmount').value = '';
        document.getElementById('validityPeriod').value = '';
        updateComparisonTable(newPlan);
    } else {
        alert('Please enter valid values for comparison.');
    }
}

function updateComparisonTable(newPlan) {
    const resultContainer = document.getElementById('planComparison');
    const daysDifference = newPlan.validityPeriodToCompare;
    let costPerDay = newPlan.rechargeAmountToCompare / newPlan.validityPeriodToCompare;
    let costPerYear = newPlan.rechargeAmountToCompare * (365 / newPlan.validityPeriodToCompare);
    let costPerHour = costPerYear / (365 * 24);

    if (newPlan.includeGST) {
        costPerDay *= 1.18; // Apply 18% GST
        costPerYear *= 1.18;
        costPerHour *= 1.18;
    }

    costPerDay = costPerDay.toFixed(2);
    costPerYear = costPerYear.toFixed(2);
    costPerHour = costPerHour.toFixed(2);

    const planRow = document.createElement('tr');
    planRow.innerHTML = `
        <td>${newPlan.rechargeAmountToCompare} Rupees</td>
        <td>${daysDifference} Days</td>
        <td>₹${costPerDay}</td>
        <td>₹${costPerYear}</td>
        <td>₹${costPerHour}</td>
    `;

    resultContainer.appendChild(planRow);
}
function clearComparisonTable() {
    const resultContainer = document.getElementById('planComparison');
    resultContainer.innerHTML = '';
    // Clear the planDataToCompare array
    planDataToCompare.length = 0;
}
