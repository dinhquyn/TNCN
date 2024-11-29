document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../../index.html'; // Chuyển hướng nếu chưa đăng nhập
    }

    // Cập nhật ngày hiện tại
    updateCurrentDate();

    // Giả lập dữ liệu lương và thuế từng tháng
    const salaryTaxData = [
        { month: 'Tháng 1', basicSalary: 15000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 2', basicSalary: 16000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 3', basicSalary: 17000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 4', basicSalary: 18000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 5', basicSalary: 19000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 6', basicSalary: 20000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 7', basicSalary: 21000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 8', basicSalary: 22000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 9', basicSalary: 23000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 10', basicSalary: 24000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 11', basicSalary: 25000000, allowance: 2000000, deductions: 2000000 },
        { month: 'Tháng 12', basicSalary: 26000000, allowance: 2000000, deductions: 2000000 }
    ];

    // Hiển thị dữ liệu lương và thuế từng tháng
    const salaryTaxTableBody = document.querySelector('#salaryTaxTable tbody');
    salaryTaxData.forEach(item => {
        const taxDue = calculateTax(item.basicSalary + item.allowance, item.deductions);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.month}</td>
            <td>${formatMoney(item.basicSalary)} VNĐ</td>
            <td>${formatMoney(item.allowance)} VNĐ</td>
            <td>${formatMoney(item.basicSalary + item.allowance)} VNĐ</td>
            <td>${formatMoney(item.deductions)} VNĐ</td>
            <td>${formatMoney(taxDue)} VNĐ</td>
        `;

        // Thêm sự kiện click để hiển thị chi tiết
        row.addEventListener('click', function () {
            const detailsRow = document.createElement('tr');
            detailsRow.classList.add('details');
            detailsRow.innerHTML = `
                <td colspan="6">
                    <strong>Chi tiết:</strong><br>
                    Lương cơ bản: ${formatMoney(item.basicSalary)} VNĐ<br>
                    Phụ cấp: ${formatMoney(item.allowance)} VNĐ<br>
                    Giảm trừ: ${formatMoney(item.deductions)} VNĐ<br>
                    Thuế TNCN phải nộp: ${formatMoney(taxDue)} VNĐ
                </td>
            `;
            // Kiểm tra nếu hàng chi tiết đã tồn tại
            const existingDetails = row.nextElementSibling;
            if (existingDetails && existingDetails.classList.contains('details')) {
                // Nếu đã có, xóa nó
                row.parentNode.removeChild(existingDetails);
            } else {
                // Nếu chưa có, thêm hàng chi tiết
                row.parentNode.insertBefore(detailsRow, row.nextSibling);
            }
        });

        salaryTaxTableBody.appendChild(row);
    });
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

function calculateTax(totalIncome, deductions) {
    const taxableIncome = totalIncome - deductions;
    let taxDue = 0;

    if (taxableIncome > 0) {
        taxDue = taxableIncome * 0.1; // Giả lập thuế 10%
    }

    return taxDue;
}

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}
