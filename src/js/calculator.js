export function initCalculator() {
  const form = document.getElementById('savings-form');
  const resultsDiv = document.getElementById('calculator-results');
  const billInput = document.getElementById('monthly-bill');
  const typeInput = document.getElementById('calc-prop-type');
  
  const sysSizeSpan = document.getElementById('res-system-size');
  const savingsSpan = document.getElementById('res-monthly-savings');
  const paybackSpan = document.getElementById('res-payback');

  if (!form) return;

  // Transparent configuration object with all assumptions
  const calcConfig = {
    tariffGHcPerKwh: 2.5, // Average ECG tariff
    sunHoursPerMonth: 120, // Expected yield in Accra per kWp per month
    systemCostPerKwGHc: 15000, // Estimated cost per kW installed
    offsetTarget: 0.8 // Target to offset 80% of the bill
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const billGHc = parseFloat(billInput.value);
    const propType = typeInput ? typeInput.value : 'house';
    
    if (isNaN(billGHc) || billGHc <= 0) return;

    // 1. Calculate energy consumption in kWh
    const monthlyConsumption = billGHc / calcConfig.tariffGHcPerKwh;
    
    // 2. Recommended system size to cover target offset
    const targetConsumption = monthlyConsumption * calcConfig.offsetTarget;
    let systemSizeKw = targetConsumption / calcConfig.sunHoursPerMonth;
    
    // For business, we might recommend slightly larger or round differently, but formula remains same
    // Round to nearest 0.5 kW, minimum 2kW for business, 1kW for house
    const minSize = propType === 'business' ? 2 : 1;
    systemSizeKw = Math.max(minSize, Math.round(systemSizeKw * 2) / 2);
    
    // 3. Estimated monthly savings (~80% of bill)
    const monthlySavings = billGHc * calcConfig.offsetTarget;
    
    // 4. Payback period = Cost / Annual Savings
    const costGHc = systemSizeKw * calcConfig.systemCostPerKwGHc;
    const annualSavings = monthlySavings * 12;
    const paybackYears = Math.round((costGHc / annualSavings) * 10) / 10;

    // Update DOM with labels indicating estimates
    sysSizeSpan.textContent = `${systemSizeKw} kW (Est.)`;
    savingsSpan.textContent = `GH₵ ${monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} (Est.)`;
    paybackSpan.textContent = `${paybackYears} Years (Est.)`;

    // Show results
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
