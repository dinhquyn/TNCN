document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Khởi tạo form
    initializeCalculator();
});

// Các mức thuế suất theo bậc thu nhập
const TAX_BRACKETS = [
    { from: 0, to: 5000000, rate: 0.05 },
    { from: 5000000, to: 10000000, rate: 0.10 },
    { from: 10000000, to: 18000000, rate: 0.15 },
    { from: 18000000, to: 32000000, rate: 0.20 },
    { from: 32000000, to: 52000000, rate: 0.25 },
    { from: 52000000, to: 80000000, rate: 0.30 },
    { from: 80000000, to: Infinity, rate: 0.35 }
];

// Các hằng số giảm trừ
const PERSONAL_DEDUCTION = 11000000; // Giảm trừ bản thân
const DEPENDENT_DEDUCTION = 4400000;  // Giảm trừ người phụ thuộc/tháng
const MAX_INSURANCE_SALARY = 20 * 4420000; // Mức lương tối đa đóng BHXH

// Tỷ lệ bảo hiểm
const INSURANCE_RATES = {
    social: 0.08,      // BHXH 8%
    health: 0.015,     // BHYT 1.5%
    unemployment: 0.01  // BHTN 1%
};

function initializeCalculator() {
    const form = document.getElementById('taxCalculatorForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        calculateTax();
    });
}

function validateInputs(basicSalary, bonus, dependentsCount) {
    // Reset tất cả thông báo lỗi
    document.getElementById('basicSalaryError').textContent = '';
    document.getElementById('bonusError').textContent = '';
    document.getElementById('dependentsError').textContent = '';

    let hasError = false;

    // Kiểm tra lương cơ bản
    if (!basicSalary || basicSalary <= 0) {
        document.getElementById('basicSalaryError').textContent = "Lương cơ bản phải lớn hơn 0";
        hasError = true;
    } else if (basicSalary > 999999999999) {
        document.getElementById('basicSalaryError').textContent = "Lương cơ bản không hợp lệ (quá lớn)";
        hasError = true;
    }

    // Kiểm tra phụ cấp và thưởng
    if (bonus < 0) {
        document.getElementById('bonusError').textContent = "Phụ cấp và thưởng không được âm";
        hasError = true;
    } else if (bonus > 999999999999) {
        document.getElementById('bonusError').textContent = "Phụ cấp và thưởng không hợp lệ (quá lớn)";
        hasError = true;
    }

    // Kiểm tra số người phụ thuộc
    if (dependentsCount < 0) {
        document.getElementById('dependentsError').textContent = "Số người phụ thuộc không được âm";
        hasError = true;
    }
    // } else if (dependentsCount > 100) {
    //     document.getElementById('dependentsError').textContent = "Số người phụ thuộc không hợp lệ (tối đa 100 người)";
    //     hasError = true;
    // }

    return hasError;
}

function calculateTax() {
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const dependentsCount = parseInt(document.getElementById('dependentsCount').value) || 0;

    // Kiểm tra các checkbox bảo hiểm
    const hasSocialInsurance = document.getElementById('socialInsuranceCheck').checked;
    const hasHealthInsurance = document.getElementById('healthInsuranceCheck').checked;
    const hasUnemploymentInsurance = document.getElementById('unemploymentInsuranceCheck').checked;

    // Kiểm tra đầu vào
    const hasError = validateInputs(basicSalary, bonus, dependentsCount);
    if (hasError) return;

    // Tính tổng thu nhập
    const totalIncome = basicSalary + bonus;

    // Tính bảo hiểm dựa trên checkbox
    const insuranceBaseSalary = Math.min(totalIncome, MAX_INSURANCE_SALARY);
    const socialInsurance = hasSocialInsurance ? insuranceBaseSalary * INSURANCE_RATES.social : 0;
    const healthInsurance = hasHealthInsurance ? insuranceBaseSalary * INSURANCE_RATES.health : 0;
    const unemploymentInsurance = hasUnemploymentInsurance ? insuranceBaseSalary * INSURANCE_RATES.unemployment : 0;
    const totalInsurance = socialInsurance + healthInsurance + unemploymentInsurance;

    // Tính giảm trừ gia cảnh
    const totalDeduction = PERSONAL_DEDUCTION + (dependentsCount * DEPENDENT_DEDUCTION);

    // Tính thu nhập tính thuế
    const taxableIncome = Math.max(0, totalIncome - totalDeduction - totalInsurance);

    // Tính thuế theo từng bậc
    const { tax, breakdown } = calculateTaxByBrackets(taxableIncome);

    // Tính thực lĩnh
    const netSalary = totalIncome - totalInsurance - tax;

    // Hiển thị kết quả
    displayResults({
        totalIncome,
        totalDeduction,
        taxableIncome,
        tax,
        socialInsurance,
        healthInsurance,
        unemploymentInsurance,
        netSalary,
        breakdown,
        dependentsCount,
        hasSocialInsurance,
        hasHealthInsurance,
        hasUnemploymentInsurance
    });
}

function calculateTaxByBrackets(income) {
    let remainingIncome = income;
    let totalTax = 0;
    let breakdown = [];

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
        const bracket = TAX_BRACKETS[i];
        const nextBracket = TAX_BRACKETS[i + 1];

        // Xác định phạm vi của bậc thuế hiện tại
        const bracketFrom = bracket.from;
        const bracketTo = bracket.to;

        // Tính thu nhập trong bậc này
        let bracketIncome = 0;
        if (remainingIncome > 0) {
            if (remainingIncome > (bracketTo - bracketFrom)) {
                bracketIncome = bracketTo - bracketFrom;
            } else {
                bracketIncome = remainingIncome;
            }

            const bracketTax = bracketIncome * bracket.rate;
            totalTax += bracketTax;

            // Lưu chi tiết tính thuế của bậc này
            if (bracketIncome > 0) {
                breakdown.push({
                    from: bracketFrom,
                    to: bracketTo,
                    income: bracketIncome,
                    rate: bracket.rate,
                    tax: bracketTax
                });
            }

            remainingIncome -= bracketIncome;
        }
    }

    return { tax: totalTax, breakdown };
}

function displayResults(results) {
    document.getElementById('resultSection').style.display = 'block';

    // Hiển thị kết quả tổng quan
    document.getElementById('totalIncome').textContent = formatCurrency(results.totalIncome);

    // Hiển thị chi tiết giảm trừ
    const deductionDetails = [
        `Bản thân: ${formatCurrency(PERSONAL_DEDUCTION)}`,
        `${results.dependentsCount} người phụ thuộc: ${formatCurrency(results.dependentsCount * DEPENDENT_DEDUCTION)}`
    ];

    if (results.hasSocialInsurance || results.hasHealthInsurance || results.hasUnemploymentInsurance) {
        deductionDetails.push('Bảo hiểm:');
        if (results.hasSocialInsurance) {
            deductionDetails.push(`- BHXH: ${formatCurrency(results.socialInsurance)}`);
        }
        if (results.hasHealthInsurance) {
            deductionDetails.push(`- BHYT: ${formatCurrency(results.healthInsurance)}`);
        }
        if (results.hasUnemploymentInsurance) {
            deductionDetails.push(`- BHTN: ${formatCurrency(results.unemploymentInsurance)}`);
        }
    }

    document.getElementById('totalDeduction').innerHTML = deductionDetails.join('<br>');
    document.getElementById('taxableIncome').textContent = formatCurrency(results.taxableIncome);
    document.getElementById('taxAmount').textContent = formatCurrency(results.tax);
    document.getElementById('netSalary').textContent = formatCurrency(results.netSalary);

    // Hiển thị chi tiết tính thuế theo từng bậc
    const breakdownHtml = results.breakdown.map(bracket => `
        <div class="row mb-2">
            <div class="col-md-6">
                Thu nhập từ ${formatCurrency(bracket.from)} đến ${formatCurrency(bracket.to)}:
            </div>
            <div class="col-md-6">
                ${formatCurrency(bracket.income)} x ${(bracket.rate * 100).toFixed(1)}% = ${formatCurrency(bracket.tax)}
            </div>
        </div>
    `).join('');

    document.getElementById('taxBreakdown').innerHTML = breakdownHtml ||
        '<div class="text-center">Không phải nộp thuế TNCN</div>';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Xử lý responsive menu
document.getElementById('toggleMenu')?.addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('shifted');
});

// Thêm sự kiện để xóa thông báo lỗi khi người dùng bắt đầu nhập lại
document.addEventListener('DOMContentLoaded', function () {
    // ... code khởi tạo khác ...

    // Thêm sự kiện input cho các trường nhập liệu
    document.getElementById('basicSalary').addEventListener('input', function () {
        document.getElementById('basicSalaryError').textContent = '';
    });

    document.getElementById('bonus').addEventListener('input', function () {
        document.getElementById('bonusError').textContent = '';
    });

    document.getElementById('dependentsCount').addEventListener('input', function () {
        document.getElementById('dependentsError').textContent = '';
    });
});

// Thêm event listeners cho các checkbox bảo hiểm
document.addEventListener('DOMContentLoaded', function () {
    // ... code khởi tạo khác ...

    const insuranceCheckboxes = [
        'socialInsuranceCheck',
        'healthInsuranceCheck',
        'unemploymentInsuranceCheck'
    ];

    insuranceCheckboxes.forEach(id => {
        document.getElementById(id).addEventListener('change', function () {
            if (document.getElementById('basicSalary').value) {
                calculateTax();
            }
        });
    });
});
