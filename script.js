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
    let costPerYear = (newPlan.rechargeAmountToCompare * 365) / newPlan.validityPeriodToCompare;
    let costPerMonth = costPerYear / 12;

    if (newPlan.includeGST) {
        costPerDay *= 1.18; // Apply 18% GST
        costPerYear *= 1.18;
        costPerMonth *= 1.18;
    }

    costPerDay = costPerDay.toFixed(2);
    costPerYear = costPerYear.toFixed(2);
    costPerMonth = costPerMonth.toFixed(2);

    const planRow = document.createElement('tr');
    planRow.innerHTML = `
        <td>${newPlan.rechargeAmountToCompare} Rupees</td>
        <td>${daysDifference} Days</td>
        <td>${costPerDay} Rupees</td>
        <td>${costPerMonth} Months</td>
        <td>${costPerYear} Years</td>
    `;

    resultContainer.appendChild(planRow);

    highlightBestPlan();
}

function highlightBestPlan() {
    const rows = document.querySelectorAll('#planComparison tr');
    if (rows.length > 1) {
        const bestPlanIndex = findBestPlanIndex();
        rows.forEach((row, index) => {
            if (index === bestPlanIndex) {
                row.classList.add('best-plan');
            } else {
                row.classList.remove('best-plan');
            }
        });
    }
}

function findBestPlanIndex() {
    let bestPlanIndex = 0;
    let bestCostPerMonth = parseFloat(
        document
            .querySelectorAll('#planComparison tr td:nth-child(4)')[0]
            .textContent.replace(/[^\d.]/g, '')
    );

    for (let i = 1; i < planDataToCompare.length; i++) {
        const costPerMonth = parseFloat(
            document
                .querySelectorAll(`#planComparison tr:nth-child(${i + 1}) td:nth-child(4)`)[0]
                .textContent.replace(/[^\d.]/g, '')
        );

        if (costPerMonth < bestCostPerMonth) {
            bestCostPerMonth = costPerMonth;
            bestPlanIndex = i;
        }
    }

    return bestPlanIndex;
}

function clearComparisonTable() {
    const resultContainer = document.getElementById('planComparison');
    resultContainer.innerHTML = '';
    // Clear the planDataToCompare array
    planDataToCompare.length = 0;
}
