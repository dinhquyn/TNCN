document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('employeeName').textContent = currentUser.fullName;

    initializeFilters();
    loadAnnualReport();

    // Thêm event listeners
    document.getElementById('yearSelect').addEventListener('change', loadAnnualReport);
});

// Dữ liệu mẫu cho quyết toán thuế
const mockTaxData = {
    2023: {
        employeeId: 'NV001',
        months: {
            1: {
                totalIncome: 18000000,
                totalDeduction: 11000000,
                taxableIncome: 7000000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            2: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            3: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            4: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            6: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            6: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            7: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            8: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            9: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            10: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            11: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            12: {
                totalIncome: 18500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            // Thêm dữ liệu cho các tháng còn lại...
        }
    },
    2022: {
        // Dữ liệu cho năm 2022
        employeeId: 'NV001',
        months: {
            1: {
                totalIncome: 15000000,
                totalDeduction: 11000000,
                taxableIncome: 7000000,
                tax: 150000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            2: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 150000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            3: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            4: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 220000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            6: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            6: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            7: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            8: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            9: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            10: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            11: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            12: {
                totalIncome: 15500000,
                totalDeduction: 11000000,
                taxableIncome: 7500000,
                tax: 200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                dependents: [
                    { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
                ]
            },
            // Thêm dữ liệu cho các tháng còn lại...
        }
    }
};

function initializeFilters() {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();

    for (let i = currentYear - 2; i <= currentYear; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Năm ${i}`;
        if (i === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }
}

function loadAnnualReport() {
    const year = parseInt(document.getElementById('yearSelect').value);
    document.getElementById('selectedYear').textContent = year;

    const yearData = mockTaxData[year];
    if (!yearData) {
        showNoDataMessage();
        return;
    }

    updateAnnualSummary(yearData);
    updateMonthlyTable(yearData);
}

function updateAnnualSummary(yearData) {
    let totalIncome = 0;
    let totalDeduction = 0;
    let totalTaxableIncome = 0;
    let totalTax = 0;

    Object.values(yearData.months).forEach(month => {
        totalIncome += month.totalIncome;
        totalDeduction += month.totalDeduction;
        totalTaxableIncome += month.taxableIncome;
        totalTax += month.tax;
    });

    document.getElementById('totalAnnualIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalAnnualDeduction').textContent = formatCurrency(totalDeduction);
    document.getElementById('taxableIncome').textContent = formatCurrency(totalTaxableIncome);
    document.getElementById('totalAnnualTax').textContent = formatCurrency(totalTax);
}

function updateMonthlyTable(yearData) {
    const tableBody = document.getElementById('monthlyReportTableBody');
    tableBody.innerHTML = '';

    for (let month = 1; month <= 12; month++) {
        const monthData = yearData.months[month];
        if (!monthData) continue;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Tháng ${month}</td>
            <td>${formatCurrency(monthData.totalIncome)}</td>
            <td>${formatCurrency(monthData.totalDeduction)}</td>
            <td>${formatCurrency(monthData.taxableIncome)}</td>
            <td>${formatCurrency(monthData.tax)}</td>
            <td class="no-print">
                <button class="btn btn-sm btn-info" onclick="showMonthDetail(${month})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    }
}

function showMonthDetail(month) {
    const year = document.getElementById('yearSelect').value;
    const monthData = mockTaxData[year].months[month];

    const content = `
        <div class="month-details">
            <h4 class="mb-4">Chi tiết tháng ${month}/${year}</h4>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="text-primary">Thu nhập</h5>
                    <p>Tổng thu nhập: ${formatCurrency(monthData.totalIncome)}</p>
                    <p>Thu nhập tính thuế: ${formatCurrency(monthData.taxableIncome)}</p>
                </div>
                <div class="col-md-6">
                    <h5 class="text-danger">Các khoản giảm trừ</h5>
                    <p>BHYT: ${formatCurrency(monthData.insurance.health)}</p>
                    <p>BHXH: ${formatCurrency(monthData.insurance.social)}</p>
                    <p>BHTN: ${formatCurrency(monthData.insurance.unemployment)}</p>
                </div>
            </div>

            <h5 class="text-info">Người phụ thuộc</h5>
            <div class="table-responsive mb-4">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Mối quan hệ</th>
                            <th>Năm sinh</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${monthData.dependents.map(dep => `
                            <tr>
                                <td>${dep.name}</td>
                                <td>${dep.relationship}</td>
                                <td>${dep.birthYear}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="row">
                <div class="col-12">
                    <h4 class="text-success">Thuế TNCN: ${formatCurrency(monthData.tax)}</h4>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detailModalContent').innerHTML = content;
    $('#detailModal').modal('show');
}

function showNoDataMessage() {
    const tableBody = document.getElementById('monthlyReportTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">Không có dữ liệu cho năm này</td>
        </tr>
    `;

    // Reset các số liệu tổng quan
    document.getElementById('totalAnnualIncome').textContent = formatCurrency(0);
    document.getElementById('totalAnnualDeduction').textContent = formatCurrency(0);
    document.getElementById('taxableIncome').textContent = formatCurrency(0);
    document.getElementById('totalAnnualTax').textContent = formatCurrency(0);
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