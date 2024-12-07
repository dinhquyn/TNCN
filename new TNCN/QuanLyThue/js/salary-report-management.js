// Dữ liệu giả lập nhân viên
const mockEmployees = [
    {
        id: "NV001",
        name: "Nguyễn Văn An",
        position: "Nhân viên kế toán",
        department: "Kế toán",
        dependents: [
            { name: "Nguyễn Thị B", relationship: "Vợ", taxCode: "8751234568" },
            { name: "Nguyễn Văn C", relationship: "Con", birthYear: 2018 }
        ]
    },
    {
        id: "NV002",
        name: "Trần Thị Bình",
        position: "Nhân viên kế toán",
        department: "Kế toán",
        dependents: [
            { name: "Lê Văn X", relationship: "Chồng", taxCode: "8751234569" },
            { name: "Trần Văn Y", relationship: "Con", birthYear: 2019 },
            { name: "Trần Thị Z", relationship: "Con", birthYear: 2021 }
        ]
    },
    {
        id: "NV003",
        name: "Phạm Văn Cường",
        position: "Nhân viên kế toán",
        department: "Kế toán"
    },
    {
        id: "NV004",
        name: "Lê Thị Dung",
        position: "Nhân viên kế toán",
        department: "Kế toán"
    },
    {
        id: "NV005",
        name: "Hoàng Văn Em",
        position: "Nhân viên kế toán",
        department: "Kế toán"
    }
];

// Dữ liệu giả lập lương
const mockSalaryData = [
    {
        employeeId: "NV001",
        month: 3,
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
        dependentDeduction: 8800000,  // 4.4tr * 2 người phụ thuộc
        personalDeduction: 11000000
    },
    {
        employeeId: "NV002",
        month: 3,
        year: 2024,
        basicSalary: 14000000,
        allowance: 1800000,
        insurance: {
            health: 420000,
            social: 1400000,
            unemployment: 280000
        },
        overtime: 1200000,
        bonus: 800000,
        tax: 1150000,
        dependentDeduction: 8800000,  // 4.4tr * 2 người phụ thuộc
        personalDeduction: 11000000
    },
    {
        employeeId: "NV003",
        month: 3,
        year: 2024,
        basicSalary: 13500000,
        allowance: 1700000,
        insurance: {
            health: 405000,
            social: 1350000,
            unemployment: 270000
        },
        overtime: 900000,
        bonus: 700000,
        tax: 1050000,
        dependentDeduction: 8800000,  // 4.4tr * 2 người phụ thuộc
        personalDeduction: 11000000
    },
    {
        employeeId: "NV004",
        month: 3,
        year: 2024,
        basicSalary: 13000000,
        allowance: 1600000,
        insurance: {
            health: 390000,
            social: 1300000,
            unemployment: 260000
        },
        overtime: 800000,
        bonus: 600000,
        tax: 980000,
        dependentDeduction: 8800000,  // 4.4tr * 2 người phụ thuộc
        personalDeduction: 11000000
    },
    {
        employeeId: "NV005",
        month: 3,
        year: 2024,
        basicSalary: 12500000,
        allowance: 1500000,
        insurance: {
            health: 375000,
            social: 1250000,
            unemployment: 250000
        },
        overtime: 700000,
        bonus: 500000,
        tax: 920000,
        dependentDeduction: 8800000,  // 4.4tr * 2 người phụ thuộc
        personalDeduction: 11000000
    }
];

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    initializeFilters();
    loadSalaryData();

    // Thêm event listeners cho các bộ lọc
    document.getElementById('monthSelect').addEventListener('change', loadSalaryData);
    document.getElementById('yearSelect').addEventListener('change', loadSalaryData);
    document.getElementById('employeeSelect').addEventListener('change', loadSalaryData);
});

// Khởi tạo các bộ lọc
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

    // Khởi tạo select nhân viên
    const employeeSelect = document.getElementById('employeeSelect');
    mockEmployees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = `${emp.id} - ${emp.name}`;
        employeeSelect.appendChild(option);
    });
}

// Load và hiển thị dữ liệu lương
function loadSalaryData() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const employeeId = document.getElementById('employeeSelect').value;

    // Lọc dữ liệu theo điều kiện
    let filteredData = mockSalaryData.filter(salary =>
        salary.month === month &&
        salary.year === year &&
        (employeeId ? salary.employeeId === employeeId : true)
    );

    updateSummary(filteredData);
    updateSalaryTable(filteredData);
}

// Cập nhật phần tổng quan
function updateSummary(data) {
    let totalSalary = 0;
    let totalTax = 0;

    data.forEach(item => {
        // Tính tổng thu nhập trước thuế (gross income)
        const grossIncome = item.basicSalary + item.allowance + item.overtime + item.bonus;
        totalSalary += grossIncome;
        totalTax += item.tax;
    });

    document.getElementById('totalSalary').textContent = formatCurrency(totalSalary);
    document.getElementById('totalTax').textContent = formatCurrency(totalTax);
    document.getElementById('employeeCount').textContent = data.length;
}

// Cập nhật bảng lương
function updateSalaryTable(data) {
    const tableBody = document.getElementById('salaryTableBody');
    tableBody.innerHTML = '';

    data.forEach(salary => {
        const employee = mockEmployees.find(emp => emp.id === salary.employeeId);
        const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
        const totalInsurance =
            salary.insurance.health +
            salary.insurance.social +
            salary.insurance.unemployment;

        // Tính thu nhập chịu thuế sau khi trừ các khoản giảm trừ
        const taxableIncome = totalIncome - totalInsurance - salary.personalDeduction - salary.dependentDeduction;
        const netSalary = totalIncome - (totalInsurance + salary.tax);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${salary.employeeId}</td>
            <td>${employee ? employee.name : 'N/A'}</td>
            <td>${formatCurrency(salary.basicSalary)}</td>
            <td>${formatCurrency(salary.allowance)}</td>
            <td>${formatCurrency(totalIncome)}</td>
            <td>${formatCurrency(salary.tax)}</td>
            <td>${formatCurrency(netSalary)}</td>
            <td class="no-print">
                <button class="btn btn-sm btn-info" onclick="showSalaryDetail('${salary.employeeId}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Hiển thị chi tiết lương trong modal
function showSalaryDetail(employeeId) {
    const salary = mockSalaryData.find(s => s.employeeId === employeeId);
    const employee = mockEmployees.find(emp => emp.id === employeeId);

    if (!salary || !employee) return;

    const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
    const totalInsurance =
        salary.insurance.health +
        salary.insurance.social +
        salary.insurance.unemployment;

    const taxableIncome = totalIncome - totalInsurance - salary.personalDeduction - salary.dependentDeduction;
    const netSalary = totalIncome - (totalInsurance + salary.tax);

    const content = `
        <div class="salary-details">
            <h4 class="mb-4">${employee.name} - Tháng ${salary.month}/${salary.year}</h4>
            
            <h5 class="text-primary">Thu nhập</h5>
            <div class="row mb-4">
                <div class="col-md-6">
                    <p>Lương cơ bản: ${formatCurrency(salary.basicSalary)}</p>
                    <p>Phụ cấp: ${formatCurrency(salary.allowance)}</p>
                </div>
                <div class="col-md-6">
                    <p>Làm thêm giờ: ${formatCurrency(salary.overtime)}</p>
                    <p>Thưởng: ${formatCurrency(salary.bonus)}</p>
                </div>
            </div>

            <h5 class="text-danger">Khấu trừ</h5>
            <div class="row mb-4">
                <div class="col-md-6">
                    <p>BHYT (1.5%): ${formatCurrency(salary.insurance.health)}</p>
                    <p>BHXH (8%): ${formatCurrency(salary.insurance.social)}</p>
                </div>
                <div class="col-md-6">
                    <p>BHTN (1%): ${formatCurrency(salary.insurance.unemployment)}</p>
                    <p>Thuế TNCN: ${formatCurrency(salary.tax)}</p>
                </div>
            </div>

            <h5 class="text-info">Giảm trừ gia cảnh</h5>
            <div class="table-responsive mb-4">
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
                            <td>${employee.id}</td>
                            <td>${formatCurrency(salary.personalDeduction)}</td>
                        </tr>
                        ${employee.dependents.map(dependent => `
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

            <div class="row">
                <div class="col-md-6">
                    <h5>Thu nhập chịu thuế: ${formatCurrency(taxableIncome)}</h5>
                    <h5>Tổng thu nhập: ${formatCurrency(totalIncome)}</h5>
                </div>
                <div class="col-md-6">
                    <h5>Tổng khấu trừ: ${formatCurrency(totalInsurance + salary.tax)}</h5>
                    <h4 class="text-success">Thực lãnh: ${formatCurrency(netSalary)}</h4>
                </div>
            </div>
        </div>
    `;

    document.getElementById('salaryDetailContent').innerHTML = content;
    $('#salaryDetailModal').modal('show');
}

// Format tiền tệ
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
