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

    // Khởi tạo các thành phần
    initializeFilters();
    initializeModal();

    // Thêm event listeners cho các bộ lọc
    document.getElementById('monthSelect').addEventListener('change', function () {
        loadSalaryData(true); // true = hiển thị chi tiết khi chọn tháng
    });

    document.getElementById('yearSelect').addEventListener('change', function () {
        loadSalaryData(false); // false = không hiển thị chi tiết khi chọn năm
        updateSalaryHistory();
    });

    // Xử lý responsive menu
    document.getElementById('toggleMenu')?.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('shifted');
    });

    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', function () {
        window.location.href = '../../index.html';
    });

    // Load dữ liệu ban đầu
    loadSalaryData(false);
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

function loadSalaryData(showDetail = false) {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    // Lấy dữ liệu lương của tháng được chọn
    const salaryData = mockSalaryData.find(s => s.month === month && s.year === year);

    if (salaryData) {
        updateSummary(salaryData);
        // Chỉ hiển thị chi tiết nếu showDetail = true (khi chọn tháng)
        if (showDetail) {
            showSalaryDetail(month, year);
        }
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
    const netSalary = totalIncome - (totalInsurance + salary.tax);

    const content = `
        <div class="row">
            <div class="col-12 text-right mb-3">
                <button class="btn btn-info" onclick="showSalaryDetail('${salary.month}', '${salary.year}')">
                    <i class="fas fa-eye"></i> Xem chi tiết
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h6>Tổng thu nhập: ${formatCurrency(totalIncome)}</h6>
            </div>
            <div class="col-md-4">
                <h6>Tổng khấu trừ: ${formatCurrency(totalInsurance + salary.tax)}</h6>
            </div>
            <div class="col-md-4">
                <h6>Thực lĩnh: ${formatCurrency(netSalary)}</h6>
            </div>
        </div>
    `;

    document.getElementById('salaryDetails').innerHTML = content;
}

function updateSalaryHistory() {
    const tableBody = document.getElementById('salaryHistoryBody');
    const selectedYear = parseInt(document.getElementById('yearSelect').value);
    tableBody.innerHTML = '';

    // Lọc dữ liệu theo năm được chọn
    const filteredData = mockSalaryData.filter(salary => salary.year === selectedYear);

    // Sắp xếp theo tháng giảm dần (mới nhất lên đầu)
    filteredData.sort((a, b) => b.month - a.month);

    if (filteredData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="text-center">Không có dữ liệu lương cho năm ${selectedYear}</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    filteredData.forEach(salary => {
        const totalIncome = salary.basicSalary + salary.allowance + salary.overtime + salary.bonus;
        const totalInsurance =
            salary.insurance.health +
            salary.insurance.social +
            salary.insurance.unemployment;
        const netSalary = totalIncome - (totalInsurance + salary.tax);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Tháng ${salary.month}/${salary.year}</td>
            <td>${formatCurrency(salary.basicSalary)}</td>
            <td>${formatCurrency(salary.allowance)}</td>
            <td>${formatCurrency(totalIncome)}</td>
            <td>${formatCurrency(salary.tax)}</td>
            <td>${formatCurrency(netSalary)}</td>
            <td class="no-print">
                <button type="button" class="btn btn-sm btn-info" 
                    onclick="showSalaryDetail('${salary.month}', '${salary.year}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showMonthDetails(month, year) {
    const salaryData = mockSalaryData.find(s => s.month === month && s.year === year);
    if (salaryData) {
        showSalaryDetail(salaryData);
    }
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

// Thêm hàm hiển thị chi tiết
function showSalaryDetail(month, year) {
    const salaryData = mockSalaryData.find(s =>
        s.month === parseInt(month) && s.year === parseInt(year)
    );

    if (!salaryData) return;

    const totalIncome = salaryData.basicSalary + salaryData.allowance +
        salaryData.overtime + salaryData.bonus;
    const totalInsurance = salaryData.insurance.health +
        salaryData.insurance.social +
        salaryData.insurance.unemployment;
    const netSalary = totalIncome - totalInsurance - salaryData.tax;

    const content = `
        <div class="salary-details">
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="text-primary">Thu nhập</h5>
                    <table class="table table-sm">
                        <tr>
                            <td>Lương cơ bản:</td>
                            <td class="text-right">${formatCurrency(salaryData.basicSalary)}</td>
                        </tr>
                        <tr>
                            <td>Phụ cấp:</td>
                            <td class="text-right">${formatCurrency(salaryData.allowance)}</td>
                        </tr>
                        <tr>
                            <td>Làm thêm giờ:</td>
                            <td class="text-right">${formatCurrency(salaryData.overtime)}</td>
                        </tr>
                        <tr>
                            <td>Thưởng:</td>
                            <td class="text-right">${formatCurrency(salaryData.bonus)}</td>
                        </tr>
                        <tr class="table-info">
                            <td><strong>Tổng thu nhập:</strong></td>
                            <td class="text-right"><strong>${formatCurrency(totalIncome)}</strong></td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h5 class="text-danger">Các khoản giảm trừ</h5>
                    <table class="table table-sm">
                        <tr>
                            <td>BHXH (8%):</td>
                            <td class="text-right">${formatCurrency(salaryData.insurance.social)}</td>
                        </tr>
                        <tr>
                            <td>BHYT (1.5%):</td>
                            <td class="text-right">${formatCurrency(salaryData.insurance.health)}</td>
                        </tr>
                        <tr>
                            <td>BHTN (1%):</td>
                            <td class="text-right">${formatCurrency(salaryData.insurance.unemployment)}</td>
                        </tr>
                        <tr>
                            <td>Thuế TNCN:</td>
                            <td class="text-right">${formatCurrency(salaryData.tax)}</td>
                        </tr>
                        <tr class="table-danger">
                            <td><strong>Tổng giảm trừ:</strong></td>
                            <td class="text-right"><strong>${formatCurrency(totalInsurance + salaryData.tax)}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="alert alert-success">
                        <h5 class="mb-0">Thực lĩnh: ${formatCurrency(netSalary)}</h5>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <h5 class="text-info">Ghi chú</h5>
                <ul>
                    <li>Mức lương tối đa đóng BHXH: 20 x ${formatCurrency(4420000)} = ${formatCurrency(20 * 4420000)}</li>
                    <li>Giảm trừ gia cảnh bản thân: ${formatCurrency(11000000)}</li>
                    <li>Giảm trừ mỗi người phụ thuộc: ${formatCurrency(4400000)}</li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('salaryDetailContent').innerHTML = content;

    // Hiển thị modal
    $('#salaryDetailModal').modal({
        backdrop: 'static', // Ngăn đóng modal khi click bên ngoài
        keyboard: true,     // Cho phép đóng bằng phím ESC
        focus: true,
        show: true
    });
}

// Sửa lại hàm createTableRow để thêm nút xem chi tiết
function createTableRow(salary, tax) {
    const row = document.createElement('tr');
    const date = new Date(salary.date);

    const totalIncome = salary.baseSalary + salary.allowance +
        salary.overtimePay + (salary.bonus || 0);

    const totalInsurance = salary.insurance.health +
        salary.insurance.social +
        salary.insurance.unemployment;

    const finalAmount = totalIncome - totalInsurance - (tax ? tax.taxAmount : 0);

    row.innerHTML = `
        <td>${date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}</td>
        <td>${formatCurrency(totalIncome)}</td>
        <td>${formatCurrency(tax ? tax.taxAmount : 0)}</td>
        <td>${formatCurrency(finalAmount)}</td>
        <td>
            <button class="btn btn-sm btn-info" onclick="showSalaryDetail(${JSON.stringify(salary)})">
                <i class="fas fa-eye"></i> Chi tiết
            </button>
        </td>
    `;

    return row;
}

// Đảm bảo modal được khởi tạo đúng cách
$(document).ready(function () {
    // Xử lý modal
    const modal = $('#salaryDetailModal');

    // Xử lý nút đóng
    $('.modal .btn-secondary').click(function () {
        modal.modal('hide');
    });

    // Xử lý khi modal mở
    modal.on('show.bs.modal', function () {
        setTimeout(function () {
            document.body.style.overflow = 'auto';
        }, 0);
    });

    // Xử lý khi modal đóng
    modal.on('hidden.bs.modal', function () {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
    });
});

// Thêm vào cuối file
window.showSalaryDetail = showSalaryDetail;

// Cập nhật CSS cho modal
function initializeModal() {
    const modal = $('#salaryDetailModal');

    modal.on('show.bs.modal', function () {
        // Không cần thay đổi overflow của body
        $(this).css('display', 'block');
    });

    modal.on('shown.bs.modal', function () {
        // Đảm bảo có thể scroll cả modal và trang
        $(this).find('.modal-body').css('max-height', 'calc(100vh - 200px)');
    });

    modal.on('hidden.bs.modal', function () {
        $(this).css('display', 'none');
    });

    // Xử lý nút đóng
    $('.modal .btn-secondary').click(function () {
        modal.modal('hide');
    });
} 