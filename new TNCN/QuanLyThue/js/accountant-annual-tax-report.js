// Dữ liệu mô phỏng cho quyết toán thuế năm
const mockAnnualTaxData = {
    employees: [
        {
            id: 'KT001',
            name: 'Lê Thị C',
            department: 'KT001',
            position: 'Kế toán trưởng',
            annualData: {
                2024: {
                    totalIncome: 396000000, // 33tr x 12 tháng
                    totalDeduction: 237600000,
                    totalInsurance: {
                        health: 9000000,
                        social: 21000000,
                        unemployment: 3000000
                    },
                    monthlyData: [
                        {
                            month: 1,
                            totalIncome: 33000000,
                            deductions: 19800000,
                            taxableIncome: 13200000,
                            tax: 1320000
                        },
                        {
                            month: 2,
                            totalIncome: 33000000,
                            deductions: 19800000,
                            taxableIncome: 13200000,
                            tax: 1320000
                        }
                        // Thêm dữ liệu cho các tháng còn lại...
                    ],
                    finalTax: 15840000
                }
            }
        },
        {
            id: 'KT002',
            name: 'Nguyễn Văn D',
            department: 'KT001',
            position: 'Kế toán viên',
            annualData: {
                2024: {
                    totalIncome: 222000000, // 18.5tr x 12 tháng
                    totalDeduction: 184800000,
                    totalInsurance: {
                        health: 5400000,
                        social: 12600000,
                        unemployment: 1800000
                    },
                    monthlyData: [
                        {
                            month: 1,
                            totalIncome: 18500000,
                            deductions: 15400000,
                            taxableIncome: 3100000,
                            tax: 155000
                        },
                        {
                            month: 2,
                            totalIncome: 18500000,
                            deductions: 15400000,
                            taxableIncome: 3100000,
                            tax: 155000
                        }
                        // Thêm dữ liệu cho các tháng còn lại...
                    ],
                    finalTax: 1860000
                }
            }
        }
        // Có thể thêm dữ liệu cho các nhân viên khác...
    ]
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập và quyền truy cập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Khởi tạo dữ liệu mẫu nếu chưa có
    if (!localStorage.getItem('annualTaxReports')) {
        localStorage.setItem('annualTaxReports', JSON.stringify(mockAnnualTaxData));
    }

    initializeSelects();
    addEventListeners();
    generateAnnualReport();
});

// Khởi tạo các select box
function initializeSelects() {
    // Khởi tạo select năm
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i <= currentYear; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    yearSelect.value = currentYear;

    // Khởi tạo select phòng ban từ dữ liệu có sẵn
    const departmentSelect = document.getElementById('departmentSelect');
    const salaryData = JSON.parse(localStorage.getItem('salaryReports')) || mockSalaryData;
    salaryData.departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
}

// Thêm các event listener
function addEventListeners() {
    document.getElementById('generateReportBtn').addEventListener('click', generateAnnualReport);
    document.getElementById('exportReportBtn').addEventListener('click', exportAnnualReport);
    document.getElementById('searchInput').addEventListener('input', filterReport);
    document.getElementById('departmentSelect').addEventListener('change', filterReport);
    document.getElementById('yearSelect').addEventListener('change', generateAnnualReport);
    document.getElementById('printDetailBtn').addEventListener('click', printAnnualDetail);
}

// Tạo báo cáo quyết toán năm
function generateAnnualReport() {
    const year = parseInt(document.getElementById('yearSelect').value);
    if (!year) {
        showNotification('Vui lòng chọn năm quyết toán', 'warning');
        return;
    }

    try {
        const annualData = JSON.parse(localStorage.getItem('annualTaxReports'));
        const yearlyData = calculateAnnualSummary(annualData, year);
        displayAnnualSummary(yearlyData.summary);
        displayAnnualReport(yearlyData.details);
    } catch (error) {
        console.error('Lỗi khi tạo báo cáo:', error);
        showNotification('Có lỗi xảy ra khi tạo báo cáo', 'danger');
    }
}

// Tính toán tổng hợp quyết toán năm
function calculateAnnualSummary(annualData, year) {
    const summary = {
        totalIncome: 0,
        totalDeduction: 0,
        taxableIncome: 0,
        totalTax: 0
    };

    const details = annualData.employees.map(employee => {
        const yearData = employee.annualData[year];
        if (yearData) {
            summary.totalIncome += yearData.totalIncome;
            summary.totalDeduction += yearData.totalDeduction;
            summary.taxableIncome += yearData.totalIncome - yearData.totalDeduction;
            summary.totalTax += yearData.finalTax;

            return {
                employeeId: employee.id,
                name: employee.name,
                department: employee.department,
                position: employee.position,
                totalIncome: yearData.totalIncome,
                totalDeduction: yearData.totalDeduction,
                taxableIncome: yearData.totalIncome - yearData.totalDeduction,
                totalTax: yearData.finalTax,
                monthlyData: yearData.monthlyData
            };
        }
        return null;
    }).filter(detail => detail !== null);

    return { summary, details };
}

// Hiển thị tổng quan quyết toán
function displayAnnualSummary(summary) {
    document.getElementById('totalIncome').textContent = formatCurrency(summary.totalIncome);
    document.getElementById('totalDeduction').textContent = formatCurrency(summary.totalDeduction);
    document.getElementById('taxableIncome').textContent = formatCurrency(summary.taxableIncome);
    document.getElementById('totalTax').textContent = formatCurrency(summary.totalTax);
}

// Hiển thị chi tiết báo cáo
function displayAnnualReport(details) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    details.forEach(detail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${detail.employeeId}</td>
            <td>${detail.name}</td>
            <td>${detail.department}</td>
            <td class="text-right">${formatCurrency(detail.totalIncome)}</td>
            <td class="text-right">${formatCurrency(detail.totalDeduction)}</td>
            <td class="text-right">${formatCurrency(detail.taxableIncome)}</td>
            <td class="text-right">${formatCurrency(detail.totalTax)}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-info" onclick="viewAnnualDetail('${detail.employeeId}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Xem chi tiết quyết toán của nhân viên
function viewAnnualDetail(employeeId) {
    const year = parseInt(document.getElementById('yearSelect').value);
    const annualData = JSON.parse(localStorage.getItem('annualTaxReports'));
    const employeeDetail = annualData.employees.find(e => e.id === employeeId);
    const department = employeeDetail.department;

    if (employeeDetail) {
        const detailContent = document.getElementById('detailContent');
        detailContent.innerHTML = generateDetailHTML(employeeDetail, department, year);
        $('#detailModal').modal('show');
    }
}

// Tạo HTML cho modal chi tiết
function generateDetailHTML(employee, department, year) {
    const monthlyData = employee.monthlyData.sort((a, b) => a.month - b.month);

    return `
        <div class="tax-detail">
            <div class="employee-info mb-4">
                <h6>Thông tin nhân viên</h6>
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Mã nhân viên:</strong> ${employee.id}</p>
                        <p><strong>Họ và tên:</strong> ${employee.name}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Chức vụ:</strong> ${employee.position}</p>
                        <p><strong>Phòng ban:</strong> ${department}</p>
                    </div>
                </div>
            </div>

            <div class="monthly-detail mb-4">
                <h6>Chi tiết theo tháng năm ${year}</h6>
                <div class="table-responsive">
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
                            ${monthlyData.map(data => `
                                <tr>
                                    <td>Tháng ${data.month}</td>
                                    <td class="text-right">${formatCurrency(data.totalIncome)}</td>
                                    <td class="text-right">${formatCurrency(data.deductions)}</td>
                                    <td class="text-right">${formatCurrency(data.taxableIncome)}</td>
                                    <td class="text-right">${formatCurrency(data.tax)}</td>
                                </tr>
                            `).join('')}
                            <tr class="table-info">
                                <td><strong>Tổng cả năm</strong></td>
                                <td class="text-right"><strong>${formatCurrency(employee.totalIncome)}</strong></td>
                                <td class="text-right"><strong>${formatCurrency(employee.totalDeduction)}</strong></td>
                                <td class="text-right"><strong>${formatCurrency(employee.taxableIncome)}</strong></td>
                                <td class="text-right"><strong>${formatCurrency(employee.totalTax)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Lọc báo cáo
function filterReport() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const departmentId = document.getElementById('departmentSelect').value;
    const rows = document.querySelectorAll('#reportTableBody tr');

    rows.forEach(row => {
        const employeeId = row.cells[0].textContent.toLowerCase();
        const employeeName = row.cells[1].textContent.toLowerCase();
        const departmentName = row.cells[2].textContent;

        const matchesSearch = !searchTerm ||
            employeeId.includes(searchTerm) ||
            employeeName.includes(searchTerm);

        const matchesDepartment = !departmentId ||
            departmentName === document.querySelector(`#departmentSelect option[value="${departmentId}"]`).textContent;

        row.style.display = (matchesSearch && matchesDepartment) ? '' : 'none';
    });

    updateFilteredSummary();
}

// Cập nhật tổng số sau khi lọc
function updateFilteredSummary() {
    const visibleRows = Array.from(document.querySelectorAll('#reportTableBody tr'))
        .filter(row => row.style.display !== 'none');

    const summary = visibleRows.reduce((acc, row) => ({
        totalIncome: acc.totalIncome + parseCurrency(row.cells[3].textContent),
        totalDeduction: acc.totalDeduction + parseCurrency(row.cells[4].textContent),
        taxableIncome: acc.taxableIncome + parseCurrency(row.cells[5].textContent),
        totalTax: acc.totalTax + parseCurrency(row.cells[6].textContent)
    }), {
        totalIncome: 0,
        totalDeduction: 0,
        taxableIncome: 0,
        totalTax: 0
    });

    displayAnnualSummary(summary);
}

// Xuất báo cáo
function exportAnnualReport() {
    const year = document.getElementById('yearSelect').value;
    if (!year) {
        showNotification('Vui lòng chọn năm để xuất báo cáo', 'warning');
        return;
    }

    try {
        const rows = Array.from(document.querySelectorAll('#reportTableBody tr'))
            .filter(row => row.style.display !== 'none');

        let csvContent = 'Mã NV,Họ tên,Phòng ban,Tổng thu nhập,Tổng giảm trừ,Thu nhập tính thuế,Thuế TNCN\n';

        rows.forEach(row => {
            const cells = Array.from(row.cells).slice(0, -1); // Bỏ cột thao tác
            csvContent += cells.map(cell => cell.textContent.trim()).join(',') + '\n';
        });

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Quyet_toan_thue_nam_${year}.csv`;
        link.click();

        showNotification('Đã xuất báo cáo thành công', 'success');
    } catch (error) {
        console.error('Lỗi khi xuất báo cáo:', error);
        showNotification('Có lỗi xảy ra khi xuất báo cáo', 'danger');
    }
}

// Hàm tiện ích
function parseCurrency(value) {
    return parseInt(value.replace(/[^\d]/g, '')) || 0;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Thêm hàm mới để in chi tiết
function printAnnualDetail() {
    const content = document.getElementById('detailContent').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>Chi tiết quyết toán thuế</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <style>
                    body { padding: 20px; }
                    .tax-detail { margin-bottom: 30px; }
                    @media print {
                        body { padding: 0; }
                        .table { width: 100%; }
                    }
                </style>
            </head>
            <body>
                ${content}
                <div class="text-right mt-4">
                    <p>Ngày in: ${new Date().toLocaleDateString('vi-VN')}</p>
                    <p>Người lập báo cáo: ${JSON.parse(localStorage.getItem('currentUser')).name}</p>
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