document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật ngày hiện tại
    updateCurrentDate();

    // Xử lý sự kiện tính thuế hàng tháng
    document.getElementById('calculateTaxBtn').addEventListener('click', calculateMonthlyTax);

    // Xử lý sự kiện tính thuế cả năm
    document.getElementById('calculateAnnualTaxBtn').addEventListener('click', calculateAnnualTax);
});

function updateCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('currentDate').textContent =
        currentDate.toLocaleDateString('vi-VN', options);
}

function calculateMonthlyTax() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncomeInput').value);
    const deductions = parseFloat(document.getElementById('deductionsInput').value);

    // Giả lập tính thuế
    let taxableIncome = monthlyIncome - deductions;
    let taxDue = 0;

    if (taxableIncome > 0) {
        taxDue = taxableIncome * 0.1; // Giả lập thuế 10%
    }

    document.getElementById('monthlyTaxResult').textContent = `Thuế TNCN phải nộp hàng tháng: ${formatMoney(taxDue)} VNĐ`;
}

function calculateAnnualTax() {
    const monthlyIncome = parseFloat(document.getElementById('monthlyIncomeInput').value);
    const deductions = parseFloat(document.getElementById('deductionsInput').value);

    // Tính thuế cả năm
    const annualIncome = monthlyIncome * 12;
    const annualDeductions = deductions * 12;
    let taxableIncome = annualIncome - annualDeductions;
    let annualTaxDue = 0;

    if (taxableIncome > 0) {
        annualTaxDue = taxableIncome * 0.1; // Giả lập thuế 10%
    }

    document.getElementById('annualTaxResult').textContent = `Thuế TNCN phải nộp cả năm: ${formatMoney(annualTaxDue)} VNĐ`;
}

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}
