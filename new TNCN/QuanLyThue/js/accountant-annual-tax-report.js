// Dữ liệu mô phỏng cho kế toán
const mockAccountantTaxData = {
    KT001: {  // ID của kế toán viên
        personalInfo: {
            id: 'KT001',
            name: 'Lê Thị C',
            department: 'Phòng Kế Toán',
            position: 'Kế toán viên',
            taxCode: '8751234567'
        },
        annualData: {
            2024: {
                totalIncome: 396000000, // 33tr x 12 tháng
                totalDeduction: 237600000,
                totalInsurance: {
                    health: 9000000,
                    social: 21000000,
                    unemployment: 3000000
                },
                dependents: [
                    { name: 'Lê Văn D', relationship: 'Con', birthYear: 2018 },
                    { name: 'Lê Thị E', relationship: 'Con', birthYear: 2020 }
                ],
                monthlyData: [
                    {
                        month: 1,
                        income: {
                            salary: 33000000,
                            bonus: 5000000,
                            allowance: 2000000
                        },
                        deductions: {
                            personal: 11000000,
                            dependent: 8800000,
                            insurance: 2750000
                        },
                        taxableIncome: 17450000,
                        tax: 1617500
                    },
                    // Thêm dữ liệu cho các tháng còn lại...
                ]
            },
            2023: {
                // Dữ liệu tương tự cho năm 2023
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    initializeFilters();
    loadAnnualReport();

    // Event listeners
    document.getElementById('yearSelect').addEventListener('change', loadAnnualReport);
    document.getElementById('printDetailBtn').addEventListener('click', printTaxReport);
});

function initializeFilters() {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();

    // Hiển thị 3 năm gần nhất
    for (let i = currentYear; i >= currentYear - 2; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Năm ${i}`;
        yearSelect.appendChild(option);
    }
}

function loadAnnualReport() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const year = document.getElementById('yearSelect').value;
    const userData = mockAccountantTaxData[currentUser.id];

    if (userData && userData.annualData[year]) {
        const yearData = userData.annualData[year];
        updateSummarySection(yearData);
        updateDetailTable(userData.personalInfo, yearData);
    } else {
        showNoDataMessage();
    }
}

function updateSummarySection(yearData) {
    document.getElementById('totalIncome').textContent = formatCurrency(yearData.totalIncome);
    document.getElementById('totalDeduction').textContent = formatCurrency(yearData.totalDeduction);
    document.getElementById('taxableIncome').textContent =
        formatCurrency(yearData.totalIncome - yearData.totalDeduction);

    const totalTax = yearData.monthlyData.reduce((sum, month) => sum + month.tax, 0);
    document.getElementById('totalTax').textContent = formatCurrency(totalTax);
}

function updateDetailTable(personalInfo, yearData) {
    const tableBody = document.getElementById('reportTableBody');
    tableBody.innerHTML = '';

    const row = document.createElement('tr');
    const taxableIncome = yearData.totalIncome - yearData.totalDeduction;
    const totalTax = yearData.monthlyData.reduce((sum, month) => sum + month.tax, 0);

    row.innerHTML = `
        <td>${personalInfo.id}</td>
        <td>${personalInfo.name}</td>
        <td>${personalInfo.department}</td>
        <td class="text-right">${formatCurrency(yearData.totalIncome)}</td>
        <td class="text-right">${formatCurrency(yearData.totalDeduction)}</td>
        <td class="text-right">${formatCurrency(taxableIncome)}</td>
        <td class="text-right">${formatCurrency(totalTax)}</td>
        <td class="text-center">
            <button class="btn btn-sm btn-info" onclick="showTaxDetail()">
                <i class="fas fa-eye"></i> Chi tiết
            </button>
        </td>
    `;
    tableBody.appendChild(row);
}

function showTaxDetail() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const year = document.getElementById('yearSelect').value;
    const userData = mockAccountantTaxData[currentUser.id];
    const yearData = userData.annualData[year];

    const content = generateDetailContent(userData.personalInfo, yearData, year);
    document.getElementById('detailContent').innerHTML = content;
    $('#detailModal').modal('show');
}

function generateDetailContent(personalInfo, yearData, year) {
    return `
        <div class="tax-detail">
            <div class="employee-info mb-4">
                <h6>Thông tin cá nhân</h6>
                <p><strong>Mã nhân viên:</strong> ${personalInfo.id}</p>
                <p><strong>Họ và tên:</strong> ${personalInfo.name}</p>
                <p><strong>Phòng ban:</strong> ${personalInfo.department}</p>
                <p><strong>Mã số thuế:</strong> ${personalInfo.taxCode}</p>
            </div>

            <div class="annual-summary mb-4">
                <h6>Tổng hợp năm ${year}</h6>
                <table class="table table-bordered">
                    <tr>
                        <td>Tổng thu nhập:</td>
                        <td class="text-right">${formatCurrency(yearData.totalIncome)}</td>
                    </tr>
                    <tr>
                        <td>Tổng giảm trừ:</td>
                        <td class="text-right">${formatCurrency(yearData.totalDeduction)}</td>
                    </tr>
                    <tr>
                        <td>Bảo hiểm đã đóng:</td>
                        <td class="text-right">
                            BHXH: ${formatCurrency(yearData.totalInsurance.social)}<br>
                            BHYT: ${formatCurrency(yearData.totalInsurance.health)}<br>
                            BHTN: ${formatCurrency(yearData.totalInsurance.unemployment)}
                        </td>
                    </tr>
                    <tr>
                        <td>Người phụ thuộc:</td>
                        <td>
                            ${yearData.dependents.map(d =>
        `${d.name} (${d.relationship}, ${d.birthYear})`
    ).join('<br>')}
                        </td>
                    </tr>
                </table>
            </div>

            <div class="monthly-detail">
                <h6>Chi tiết theo tháng</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tháng</th>
                            <th class="text-right">Thu nhập</th>
                            <th class="text-right">Giảm trừ</th>
                            <th class="text-right">Thu nhập tính thuế</th>
                            <th class="text-right">Thuế TNCN</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateMonthlyRows(yearData.monthlyData)}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function generateMonthlyRows(monthlyData) {
    return monthlyData.map(data => `
        <tr>
            <td>${data.month}</td>
            <td class="text-right">${formatCurrency(data.income.salary + data.income.bonus + data.income.allowance)}</td>
            <td class="text-right">${formatCurrency(data.deductions.personal + data.deductions.dependent + data.deductions.insurance)}</td>
            <td class="text-right">${formatCurrency(data.taxableIncome)}</td>
            <td class="text-right">${formatCurrency(data.tax)}</td>
        </tr>
    `).join('');
}

function printTaxReport() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const year = document.getElementById('yearSelect').value;
    const userData = mockAccountantTaxData[currentUser.id];
    const yearData = userData.annualData[year];

    const content = generateDetailContent(userData.personalInfo, yearData, year);
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Báo Cáo Quyết Toán Thuế ${year}</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <style>
                body { padding: 20px; }
                .tax-detail { margin-bottom: 30px; }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h4 class="text-center mb-4">BÁO CÁO QUYẾT TOÁN THUẾ THU NHẬP CÁ NHÂN NĂM ${year}</h4>
            ${content}
            <div class="text-right mt-4">
                <p>Ngày in: ${new Date().toLocaleDateString('vi-VN')}</p>
                <p>Người nộp thuế</p>
                <br><br>
                <p>${userData.personalInfo.name}</p>
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
}

function showNoDataMessage() {
    const tableBody = document.getElementById('reportTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">Không có dữ liệu quyết toán thuế cho năm này</td>
        </tr>
    `;

    // Reset các số liệu tổng quan
    document.getElementById('totalIncome').textContent = formatCurrency(0);
    document.getElementById('totalDeduction').textContent = formatCurrency(0);
    document.getElementById('taxableIncome').textContent = formatCurrency(0);
    document.getElementById('totalTax').textContent = formatCurrency(0);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
} 