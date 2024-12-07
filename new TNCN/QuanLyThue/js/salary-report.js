// Dữ liệu mẫu cho nhân viên
const mockEmployees = [
    { id: 'NV001', name: 'Nguyễn Văn An' },
    { id: 'NV002', name: 'Trần Thị Bình' },
    { id: 'NV003', name: 'Lê Văn Cường' },
    { id: 'NV004', name: 'Phạm Thị Dung' },
    { id: 'NV005', name: 'Hoàng Văn Em' }
];

// Dữ liệu mẫu cho lương và thuế
const mockSalaryData = {
    2023: {
        1: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 2000000,
                bonus: 1000000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1500000,
                bonus: 2000000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20620000
            },
            {
                employeeId: 'NV003',
                basicSalary: 20000000,
                overtime: 2500000,
                bonus: 1500000,
                insurance: {
                    health: 200000,
                    social: 400000,
                    unemployment: 100000
                },
                tax: 300000,
                netSalary: 23000000
            },
            {
                employeeId: 'NV004',
                basicSalary: 16000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 160000,
                    social: 320000,
                    unemployment: 80000
                },
                tax: 220000,
                netSalary: 18220000
            },
            {
                employeeId: 'NV005',
                basicSalary: 17000000,
                overtime: 2100000,
                bonus: 1300000,
                insurance: {
                    health: 170000,
                    social: 340000,
                    unemployment: 85000
                },
                tax: 230000,
                netSalary: 19575000
            }
        ],
        2: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        3: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        4: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        5: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        6: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        7: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        8: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        9: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        10: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        11: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        12: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ]
    },
    2024: {
        1: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 2000000,
                bonus: 1000000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1500000,
                bonus: 2000000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20620000
            },
            {
                employeeId: 'NV003',
                basicSalary: 20000000,
                overtime: 2500000,
                bonus: 1500000,
                insurance: {
                    health: 200000,
                    social: 400000,
                    unemployment: 100000
                },
                tax: 300000,
                netSalary: 23000000
            },
            {
                employeeId: 'NV004',
                basicSalary: 16000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 160000,
                    social: 320000,
                    unemployment: 80000
                },
                tax: 220000,
                netSalary: 18220000
            },
            {
                employeeId: 'NV005',
                basicSalary: 17000000,
                overtime: 2100000,
                bonus: 1300000,
                insurance: {
                    health: 170000,
                    social: 340000,
                    unemployment: 85000
                },
                tax: 230000,
                netSalary: 19575000
            }
        ],
        2: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        3: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        4: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        5: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        6: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        7: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        8: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        9: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        10: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ],
        11: [
            {
                employeeId: 'NV001',
                basicSalary: 15000000,
                overtime: 1800000,
                bonus: 1200000,
                insurance: {
                    health: 150000,
                    social: 300000,
                    unemployment: 75000
                },
                tax: 200000,
                netSalary: 17275000
            },
            {
                employeeId: 'NV002',
                basicSalary: 18000000,
                overtime: 1600000,
                bonus: 1800000,
                insurance: {
                    health: 180000,
                    social: 360000,
                    unemployment: 90000
                },
                tax: 250000,
                netSalary: 20520000
            }
        ]
    }

};

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded');
    initializeFilters();
    loadSalaryReport();

    // Thêm event listeners cho các bộ lọc
    document.getElementById('yearSelect').addEventListener('change', loadSalaryReport);
    document.getElementById('monthSelect').addEventListener('change', loadSalaryReport);
    document.getElementById('employeeSelect').addEventListener('change', loadSalaryReport);
    document.getElementById('searchInput').addEventListener('input', loadSalaryReport);
});

function initializeFilters() {
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

    // Khởi tạo select tháng
    const monthSelect = document.getElementById('monthSelect');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tháng ${i}`;
        if (i === new Date().getMonth() + 1) option.selected = true;
        monthSelect.appendChild(option);
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

function loadSalaryReport() {
    console.log('Loading salary report...');
    const year = parseInt(document.getElementById('yearSelect').value);
    const month = parseInt(document.getElementById('monthSelect').value);
    const selectedEmployee = document.getElementById('employeeSelect').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    console.log('Filters:', { year, month, selectedEmployee, searchTerm });

    // Lấy dữ liệu theo năm và tháng
    let data = mockSalaryData[year]?.[month] || [];
    console.log('Initial data:', data);

    // Áp dụng bộ lọc
    if (data.length > 0) {
        // Lọc theo nhân viên được chọn từ dropdown
        if (selectedEmployee) {
            data = data.filter(item => item.employeeId === selectedEmployee);
            console.log('After employee filter:', data);
        }

        // Lọc theo từ khóa tìm kiếm
        if (searchTerm) {
            data = data.filter(item => {
                const employee = mockEmployees.find(emp => emp.id === item.employeeId);
                const employeeName = employee ? employee.name.toLowerCase() : '';
                return item.employeeId.toLowerCase().includes(searchTerm) ||
                    employeeName.includes(searchTerm);
            });
            console.log('After search filter:', data);
        }
    }

    // Cập nhật giao diện
    updateSalaryTable(data);
    updateSummary(data);
}


function updateSalaryTable(data) {
    const tableBody = document.getElementById('salaryReportTableBody');
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }

    tableBody.innerHTML = '';

    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="8" class="text-center">Không có dữ liệu phù hợp</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    data.forEach(item => {
        const employee = mockEmployees.find(emp => emp.id === item.employeeId);
        const totalIncome = item.basicSalary + item.overtime + item.bonus;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.employeeId}</td>
            <td>${employee ? employee.name : 'N/A'}</td>
            <td>${formatCurrency(item.basicSalary)}</td>
            <td>${formatCurrency(item.overtime + item.bonus)}</td>
            <td>${formatCurrency(totalIncome)}</td>
            <td>${formatCurrency(item.tax)}</td>
            <td>${formatCurrency(item.netSalary)}</td>
            <td class="no-print">
                <button class="btn btn-sm btn-info" onclick="showSalaryDetail('${item.employeeId}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateSummary(data) {
    let totalSalary = 0;
    let totalTax = 0;
    let totalNet = 0;

    data.forEach(item => {
        totalSalary += item.basicSalary + item.overtime + item.bonus;
        totalTax += item.tax;
        totalNet += item.netSalary;
    });

    document.getElementById('totalSalary').textContent = formatCurrency(totalSalary);
    document.getElementById('totalTax').textContent = formatCurrency(totalTax);
    document.getElementById('totalNet').textContent = formatCurrency(totalNet);
    document.getElementById('employeeCount').textContent = data.length;

    // Cập nhật thông tin tháng/năm được chọn
    document.getElementById('selectedMonth').textContent = document.getElementById('monthSelect').value;
    document.getElementById('selectedYear').textContent = document.getElementById('yearSelect').value;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function showSalaryDetail(employeeId) {
    // Lấy năm và tháng từ bộ lọc
    const year = parseInt(document.getElementById('yearSelect').value);
    const month = parseInt(document.getElementById('monthSelect').value);

    // Lấy dữ liệu lương cho tháng và năm đã chọn
    const monthData = mockSalaryData[year]?.[month]?.find(item => item.employeeId === employeeId);

    if (!monthData) {
        alert('Không tìm thấy dữ liệu lương cho nhân viên này.');
        return;
    }

    // Tìm nhân viên từ mockEmployees
    const employee = mockEmployees.find(emp => emp.id === employeeId);
    if (!employee) {
        alert('Không tìm thấy thông tin nhân viên.');
        return;
    }

    // Giảm trừ gia cảnh
    const personalDeduction = 4400000; // Giảm trừ bản thân (ví dụ)
    const dependentDeduction = 4400000; // Giảm trừ cho mỗi người phụ thuộc

    // Tổng thu nhập = Lương cơ bản + Thưởng + Phụ cấp
    const totalIncome = monthData.basicSalary + monthData.overtime + monthData.bonus;

    // Tạo nội dung chi tiết lương
    const content = `
        <div class="month-details">
            <h4 class="mb-4">Chi tiết lương tháng ${month}/${year}</h4>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="text-primary">Thu nhập</h5>
                    <p><strong>Lương cơ bản:</strong> ${formatCurrency(monthData.basicSalary)}</p>
                    <p><strong>Thưởng và phụ cấp:</strong> ${formatCurrency(monthData.overtime + monthData.bonus)}</p>
                    <p><strong>Tổng thu nhập:</strong> ${formatCurrency(totalIncome)}</p>
                </div>
                <div class="col-md-6">
                    <h5 class="text-danger">Các khoản giảm trừ</h5>
                    <p><strong>BHYT:</strong> ${formatCurrency(monthData.insurance.health)}</p>
                    <p><strong>BHXH:</strong> ${formatCurrency(monthData.insurance.social)}</p>
                    <p><strong>BHTN:</strong> ${formatCurrency(monthData.insurance.unemployment)}</p>
                    <p><strong>Thuế thu nhập cá nhân:</strong> ${formatCurrency(monthData.tax)}</p>
                </div>
            </div>

            <!-- Hiển thị đối tượng giảm trừ gia cảnh (người phụ thuộc) -->
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
                        <!-- Giảm trừ bản thân -->
                        <tr>
                            <td>Bản thân</td>
                            <td>-</td>
                            <td>${employee.id}</td>
                            <td>${formatCurrency(personalDeduction)}</td>
                        </tr>
                        <!-- Giảm trừ cho các người phụ thuộc -->
                        ${employee.dependents && employee.dependents.length > 0 ?
            employee.dependents.map(dependent => `
                            <tr>
                                <td>${dependent.name}</td>
                                <td>${dependent.relationship}</td>
                                <td>${dependent.taxCode || dependent.birthYear || '-'}</td>
                                <td>${formatCurrency(dependentDeduction)}</td>
                            </tr>
                        `).join('') :
            `<tr><td colspan="4" class="text-center">Không có người phụ thuộc</td></tr>`}
                    </tbody>
                    <tfoot>
                        <tr class="table-info">
                            <td colspan="3"><strong>Tổng giảm trừ gia cảnh:</strong></td>
                            <td><strong>${formatCurrency(personalDeduction + (employee.dependents ? employee.dependents.length * dependentDeduction : 0))}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <h5 class="text-info">Lương thực nhận</h5>
                    <p><strong>Lương thực nhận:</strong> ${formatCurrency(monthData.netSalary)}</p>
                </div>
            </div>
        </div>
    `;

    // Cập nhật nội dung modal
    document.getElementById('salaryDetailContent').innerHTML = content;

    // Hiển thị modal
    const modal = new bootstrap.Modal(document.getElementById('salaryDetailModal'));
    modal.show();
}

