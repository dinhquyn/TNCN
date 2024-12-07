// Giả lập thông tin nhân viên đăng nhập
const currentEmployee = {
    id: "NV001",
    name: "Hoàng Trọng Đức",
    position: "Nhân viên kế toán",
    department: "Kế toán",
    dependents: [
        { name: "Nguyễn Thị B", relationship: "Vợ", taxCode: "8751234568" },
        { name: "Nguyễn Văn C", relationship: "Con", birthYear: 2018 },
        { name: "Nguyễn Thị D", relationship: "Con", birthYear: 2020 }
    ]
};

// Dữ liệu giả lập lương của nhân viên
const mockSalaryData = [

    {
        month: 1,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1500000,
        bonus: 1000000,
        tax: 1250000,
        dependentDeduction: 4400000,
        personalDeduction: 11000000
    },
    {
        month: 2,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 3,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 4,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 5,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 6,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 7,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 8,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 9,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 10,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 11,
        year: 2024,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 1,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 2,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 3,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 4,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 5,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 6,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    {
        month: 7,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    }, {
        month: 8,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    }, {
        month: 9,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    }, {
        month: 10,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    }, {
        month: 11,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    }, {
        month: 12,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        insurance: {
            health: 450000,
            social: 1500000,
            unemployment: 300000
        },
        overtime: 1800000,
        bonus: 1200000,
        tax: 1300000
    },
    // Thêm dữ liệu các tháng khác tương tự...
];


document.addEventListener('DOMContentLoaded', function () {
    // Hiển thị tên nhân viên
    document.getElementById('employeeName').textContent = currentEmployee.name;

    initializeFilters();
    loadSalaryData();

    // Thêm event listeners cho các bộ lọc
    document.getElementById('monthSelect').addEventListener('change', loadSalaryData);
    document.getElementById('yearSelect').addEventListener('change', loadSalaryData);
});

function initializeFilters() {
    // Khởi tạo select tháng
    const monthSelect = document.getElementById('monthSelect');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tháng ${i}`;
        if (i === new Date().getMonth() + 1) option.selected = true;
        monthSelect.appendChild(option);
    }

    // Khởi tạo select năm
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

function loadSalaryData() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    // Lấy dữ liệu lương của tháng ược chọn
    const salaryData = mockSalaryData.find(s => s.month === month && s.year === year);

    if (salaryData) {
        updateSummary(salaryData);
        updateSalaryDetails(salaryData);
    } else {
        clearSalaryDisplay();
    }

    updateSalaryHistory();
}

function updateSummary(salary) {
    const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
    const totalInsurance =
        salary.insurance.health +
        salary.insurance.social +
        salary.insurance.unemployment;
    const totalDeduction = totalInsurance + salary.tax;
    const netSalary = totalIncome - totalDeduction;

    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalDeduction').textContent = formatCurrency(totalDeduction);
    document.getElementById('netSalary').textContent = formatCurrency(netSalary);
}

function updateSalaryDetails(salary) {
    const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
    const totalInsurance =
        salary.insurance.health +
        salary.insurance.social +
        salary.insurance.unemployment;

    const taxableIncome = totalIncome - totalInsurance - salary.personalDeduction - salary.dependentDeduction;
    const netSalary = totalIncome - (totalInsurance + salary.tax);

    const content = `
        <div class="row mb-4">
            <div class="col-md-6">
                <h5 class="text-primary">Thu nhập</h5>
                <p>Lương cơ bản: ${formatCurrency(salary.basicSalary)}</p>
                <p>Phụ cấp: ${formatCurrency(salary.allowance)}</p>
                <p>Làm thêm giờ: ${formatCurrency(salary.overtime)}</p>
                <p>Thưởng: ${formatCurrency(salary.bonus)}</p>
                <h6>Tổng thu nhập: ${formatCurrency(totalIncome)}</h6>
            </div>
            <div class="col-md-6">
                <h5 class="text-danger">Khấu trừ</h5>
                <p>BHYT (1.5%): ${formatCurrency(salary.insurance.health)}</p>
                <p>BHXH (8%): ${formatCurrency(salary.insurance.social)}</p>
                <p>BHTN (1%): ${formatCurrency(salary.insurance.unemployment)}</p>
                <p>Thuế TNCN: ${formatCurrency(salary.tax)}</p>
                <h6>Tổng khấu trừ: ${formatCurrency(totalInsurance + salary.tax)}</h6>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-md-12">
                <h5 class="text-info">Giảm trừ gia cảnh</h5>
                <div class="table-responsive">
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Đối tượng</th>
                                <th>Mối quan hệ</th>
                                <th>Mã số thuế/Năm sinh</th>
                                <th>Mức giảm trừ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Bản thân</td>
                                <td>-</td>
                                <td>${currentEmployee.id}</td>
                                <td>${formatCurrency(salary.personalDeduction)}</td>
                            </tr>
                            ${currentEmployee.dependents.map(dependent => `
                                <tr>
                                    <td>${dependent.name}</td>
                                    <td>${dependent.relationship}</td>
                                    <td>${dependent.taxCode || dependent.birthYear || '-'}</td>
                                    <td>${formatCurrency(4400000)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="table-info">
                                <td colspan="3"><strong>Tổng giảm trừ gia cảnh:</strong></td>
                                <td><strong>${formatCurrency(salary.personalDeduction + salary.dependentDeduction)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h5>Thu nhập chịu thuế: ${formatCurrency(taxableIncome)}</h5>
            </div>
            <div class="col-md-6">
                <h4 class="text-success">Thực lãnh: ${formatCurrency(netSalary)}</h4>
            </div>
        </div>
    `;

    document.getElementById('salaryDetails').innerHTML = content;
}

function updateSalaryHistory() {
    const tableBody = document.getElementById('salaryHistoryBody');
    tableBody.innerHTML = '';

    mockSalaryData.forEach(salary => {
        const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
        const totalInsurance =
            salary.insurance.health +
            salary.insurance.social +
            salary.insurance.unemployment;
        const netSalary = totalIncome - (totalInsurance + salary.tax);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${salary.month}/${salary.year}</td>
            <td>${formatCurrency(salary.basicSalary)}</td>
            <td>${formatCurrency(salary.allowance)}</td>
            <td>${formatCurrency(totalIncome)}</td>
            <td>${formatCurrency(salary.tax)}</td>
            <td>${formatCurrency(netSalary)}</td>
            <td class="no-print">
                <button class="btn btn-sm btn-info" onclick="showMonthDetails(${salary.month}, ${salary.year})">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showMonthDetails(month, year) {
    document.getElementById('monthSelect').value = month;
    document.getElementById('yearSelect').value = year;
    loadSalaryData();
    window.scrollTo(0, 0);
}

function clearSalaryDisplay() {
    document.getElementById('totalIncome').textContent = formatCurrency(0);
    document.getElementById('totalDeduction').textContent = formatCurrency(0);
    document.getElementById('netSalary').textContent = formatCurrency(0);
    document.getElementById('salaryDetails').innerHTML = '<p class="text-center">Không có dữ liệu lương cho tháng này</p>';
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

// Xử lý đăng xuất
document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = '../../index.html';
}); 