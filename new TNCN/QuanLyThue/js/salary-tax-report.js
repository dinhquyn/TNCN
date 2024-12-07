// Dữ liệu mẫu cho báo cáo lương và thuế
const mockSalaryData = {
    departments: [
        {
            id: 'KT001',
            name: 'Phòng Kế Toán',
            employees: ['KT001', 'KT002', 'KT003']
        },
        {
            id: 'KD001',
            name: 'Phòng Kinh Doanh',
            employees: ['KD001', 'KD002', 'KD003', 'KD004']
        },
        {
            id: 'NS001',
            name: 'Phòng Nhân Sự',
            employees: ['NS001', 'NS002', 'NS003']
        },
        {
            id: 'IT001',
            name: 'Phòng IT',
            employees: ['IT001', 'IT002', 'IT003', 'IT004']
        },
        {
            id: 'MK001',
            name: 'Phòng Marketing',
            employees: ['MK001', 'MK002', 'MK003']
        }
    ],
    employees: [
        // Phòng Kế Toán
        {
            id: 'KT001',
            name: 'Lê Thị C',
            department: 'KT001',
            position: 'Kế toán trưởng'
        },
        {
            id: 'KT002',
            name: 'Nguyễn Văn D',
            department: 'KT001',
            position: 'Kế toán viên'
        },
        {
            id: 'KT003',
            name: 'Trần Thị E',
            department: 'KT001',
            position: 'Kế toán viên'
        },

        // Phòng Kinh Doanh
        {
            id: 'KD001',
            name: 'Phạm Văn F',
            department: 'KD001',
            position: 'Trưởng phòng Kinh doanh'
        },
        {
            id: 'KD002',
            name: 'Hoàng Thị G',
            department: 'KD001',
            position: 'Nhân viên kinh doanh'
        },
        {
            id: 'KD003',
            name: 'Đỗ Văn H',
            department: 'KD001',
            position: 'Nhân viên kinh doanh'
        },
        {
            id: 'KD004',
            name: 'Ngô Thị I',
            department: 'KD001',
            position: 'Nhân viên kinh doanh'
        },

        // Phòng Nhân Sự
        {
            id: 'NS001',
            name: 'Vũ Văn K',
            department: 'NS001',
            position: 'Trưởng phòng Nhân sự'
        },
        {
            id: 'NS002',
            name: 'Lý Thị L',
            department: 'NS001',
            position: 'Nhân viên nhân sự'
        },
        {
            id: 'NS003',
            name: 'Bùi Văn M',
            department: 'NS001',
            position: 'Nhân viên nhân sự'
        },

        // Phòng IT
        {
            id: 'IT001',
            name: 'Đinh Văn N',
            department: 'IT001',
            position: 'Trưởng phòng IT'
        },
        {
            id: 'IT002',
            name: 'Trịnh Thị O',
            department: 'IT001',
            position: 'Lập trình viên'
        },
        {
            id: 'IT003',
            name: 'Mai Văn P',
            department: 'IT001',
            position: 'Lập trình viên'
        },
        {
            id: 'IT004',
            name: 'Dương Thị Q',
            department: 'IT001',
            position: 'Kiểm thử viên'
        },

        // Phòng Marketing
        {
            id: 'MK001',
            name: 'Đặng Văn R',
            department: 'MK001',
            position: 'Trưởng phòng Marketing'
        },
        {
            id: 'MK002',
            name: 'Hồ Thị S',
            department: 'MK001',
            position: 'Nhân viên marketing'
        },
        {
            id: 'MK003',
            name: 'Phan Văn T',
            department: 'MK001',
            position: 'Nhân viên marketing'
        }
    ],
    salaryData: [
        // Phòng Kế Toán
        {
            employeeId: 'KT001',
            month: 1,
            year: 2024,
            basicSalary: 25000000,
            allowance: 5000000,
            bonus: 3000000,
            deductions: 5000000,
            taxableIncome: 28000000,
            tax: 4200000,
            netSalary: 23800000
        },
        {
            employeeId: 'KT002',
            month: 1,
            year: 2024,
            basicSalary: 15000000,
            allowance: 2000000,
            bonus: 1500000,
            deductions: 3000000,
            taxableIncome: 15500000,
            tax: 1550000,
            netSalary: 13950000
        },
        {
            employeeId: 'KT003',
            month: 1,
            year: 2024,
            basicSalary: 15000000,
            allowance: 2000000,
            bonus: 1000000,
            deductions: 3000000,
            taxableIncome: 15000000,
            tax: 1500000,
            netSalary: 13500000
        },

        // Phòng Kinh Doanh
        {
            employeeId: 'KD001',
            month: 1,
            year: 2024,
            basicSalary: 30000000,
            allowance: 5000000,
            bonus: 10000000,
            deductions: 6000000,
            taxableIncome: 39000000,
            tax: 7800000,
            netSalary: 31200000
        },
        {
            employeeId: 'KD002',
            month: 1,
            year: 2024,
            basicSalary: 18000000,
            allowance: 3000000,
            bonus: 5000000,
            deductions: 4000000,
            taxableIncome: 22000000,
            tax: 3300000,
            netSalary: 18700000
        },
        {
            employeeId: 'KD003',
            month: 1,
            year: 2024,
            basicSalary: 18000000,
            allowance: 3000000,
            bonus: 4000000,
            deductions: 4000000,
            taxableIncome: 21000000,
            tax: 3150000,
            netSalary: 17850000
        },
        {
            employeeId: 'KD004',
            month: 1,
            year: 2024,
            basicSalary: 18000000,
            allowance: 3000000,
            bonus: 3500000,
            deductions: 4000000,
            taxableIncome: 20500000,
            tax: 3075000,
            netSalary: 17425000
        },

        // Phòng Nhân Sự
        {
            employeeId: 'NS001',
            month: 1,
            year: 2024,
            basicSalary: 28000000,
            allowance: 4000000,
            bonus: 3000000,
            deductions: 5000000,
            taxableIncome: 30000000,
            tax: 6000000,
            netSalary: 24000000
        },
        {
            employeeId: 'NS002',
            month: 1,
            year: 2024,
            basicSalary: 16000000,
            allowance: 2500000,
            bonus: 1500000,
            deductions: 3500000,
            taxableIncome: 16500000,
            tax: 1650000,
            netSalary: 14850000
        },
        {
            employeeId: 'NS003',
            month: 1,
            year: 2024,
            basicSalary: 16000000,
            allowance: 2500000,
            bonus: 1000000,
            deductions: 3500000,
            taxableIncome: 16000000,
            tax: 1600000,
            netSalary: 14400000
        },

        // Phòng IT
        {
            employeeId: 'IT001',
            month: 1,
            year: 2024,
            basicSalary: 35000000,
            allowance: 5000000,
            bonus: 5000000,
            deductions: 6000000,
            taxableIncome: 39000000,
            tax: 7800000,
            netSalary: 31200000
        },
        {
            employeeId: 'IT002',
            month: 1,
            year: 2024,
            basicSalary: 25000000,
            allowance: 3000000,
            bonus: 2000000,
            deductions: 4500000,
            taxableIncome: 25500000,
            tax: 3825000,
            netSalary: 21675000
        },
        {
            employeeId: 'IT003',
            month: 1,
            year: 2024,
            basicSalary: 25000000,
            allowance: 3000000,
            bonus: 2000000,
            deductions: 4500000,
            taxableIncome: 25500000,
            tax: 3825000,
            netSalary: 21675000
        },
        {
            employeeId: 'IT004',
            month: 1,
            year: 2024,
            basicSalary: 20000000,
            allowance: 2500000,
            bonus: 1500000,
            deductions: 4000000,
            taxableIncome: 20000000,
            tax: 3000000,
            netSalary: 17000000
        },

        // Phòng Marketing
        {
            employeeId: 'MK001',
            month: 1,
            year: 2024,
            basicSalary: 28000000,
            allowance: 4000000,
            bonus: 4000000,
            deductions: 5000000,
            taxableIncome: 31000000,
            tax: 6200000,
            netSalary: 24800000
        },
        {
            employeeId: 'MK002',
            month: 1,
            year: 2024,
            basicSalary: 17000000,
            allowance: 2500000,
            bonus: 2000000,
            deductions: 3500000,
            taxableIncome: 18000000,
            tax: 2700000,
            netSalary: 15300000
        },
        {
            employeeId: 'MK003',
            month: 1,
            year: 2024,
            basicSalary: 17000000,
            allowance: 2500000,
            bonus: 1500000,
            deductions: 3500000,
            taxableIncome: 17500000,
            tax: 2625000,
            netSalary: 14875000
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    try {
        // Xóa dữ liệu cũ để test (bỏ dòng này khi chạy thật)
        localStorage.removeItem('salaryReports');
        localStorage.removeItem('departments');
        localStorage.removeItem('employees');

        // Khởi tạo dữ liệu mẫu
        initializeMockData();

        // Kiểm tra đăng nhập
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'ke_toan') {
            window.location.href = '../../index.html';
            return;
        }

        // Cập nhật tên người dùng
        document.getElementById('userName').textContent = currentUser.fullName;

        // Khởi tạo các filter
        initializeFilters();

        // Load dữ liệu báo cáo
        loadReport();

        // Thêm event listeners
        document.getElementById('departmentSelect').addEventListener('change', loadReport);
        document.getElementById('monthSelect').addEventListener('change', loadReport);
        document.getElementById('yearSelect').addEventListener('change', loadReport);
        document.getElementById('searchInput').addEventListener('input', loadReport);
        document.getElementById('exportReportBtn').addEventListener('click', exportReport);

        // Tự động chọn tháng và năm hiện tại
        const now = new Date();
        document.getElementById('monthSelect').value = now.getMonth() + 1;
        document.getElementById('yearSelect').value = now.getFullYear();

        // Load lại báo cáo sau khi đã chọn tháng năm
        loadReport();

    } catch (error) {
        console.error('Lỗi khởi tạo:', error);
        showNotification('Có lỗi khi khởi tạo ứng dụng', 'danger');
    }
});

function initializeMockData() {
    // Kiểm tra xem đã có dữ liệu trong localStorage chưa
    if (!localStorage.getItem('salaryReports')) {
        // Thêm dữ liệu mẫu vào localStorage
        localStorage.setItem('salaryReports', JSON.stringify(mockSalaryData));
    }

    // Cập nhật lại dữ liệu departments nếu chưa có
    if (!localStorage.getItem('departments')) {
        localStorage.setItem('departments', JSON.stringify(mockSalaryData.departments));
    }

    // Cập nhật lại dữ liệu employees nếu chưa có
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(mockSalaryData.employees));
    }
}

function initializeFilters() {
    // Khởi tạo select phòng ban
    const departments = JSON.parse(localStorage.getItem('departments')) || mockSalaryData.departments;
    const departmentSelect = document.getElementById('departmentSelect');
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });

    // Khởi tạo select tháng
    const monthSelect = document.getElementById('monthSelect');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tháng ${i}`;
        monthSelect.appendChild(option);
    }

    // Khởi tạo select năm
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i <= currentYear + 1; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
}

function loadReport() {
    try {
        const departmentId = document.getElementById('departmentSelect').value;
        const month = parseInt(document.getElementById('monthSelect').value);
        const year = parseInt(document.getElementById('yearSelect').value);
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        // Lấy dữ liệu từ localStorage hoặc dữ liệu mẫu
        let reportData = JSON.parse(localStorage.getItem('salaryReports'));

        // Nếu không có dữ liệu trong localStorage, sử dụng dữ liệu mẫu
        if (!reportData) {
            reportData = mockSalaryData;
            localStorage.setItem('salaryReports', JSON.stringify(mockSalaryData));
        }

        let filteredData = [...reportData.salaryData];

        // Áp dụng các bộ lọc
        if (departmentId) {
            const departmentEmployees = reportData.departments
                .find(d => d.id === departmentId)?.employees || [];
            filteredData = filteredData.filter(d => departmentEmployees.includes(d.employeeId));
        }

        if (!isNaN(month)) {
            filteredData = filteredData.filter(d => d.month === month);
        }

        if (!isNaN(year)) {
            filteredData = filteredData.filter(d => d.year === year);
        }

        if (searchTerm) {
            const employees = reportData.employees;
            filteredData = filteredData.filter(d => {
                const employee = employees.find(e => e.id === d.employeeId);
                return employee?.name.toLowerCase().includes(searchTerm) ||
                    employee?.id.toLowerCase().includes(searchTerm);
            });
        }

        // Hiển thị dữ liệu đã lọc
        displayReport(filteredData, reportData.employees, reportData.departments);

    } catch (error) {
        console.error('Lỗi khi tải báo cáo:', error);
        showNotification('Có lỗi khi tải dữ liệu báo cáo', 'danger');
    }
}

function displayReport(data, employees, departments) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="text-center">Không có dữ liệu</td>
            </tr>
        `;
        return;
    }

    // Nhóm dữ liệu theo phòng ban
    const departmentGroups = {};
    data.forEach(item => {
        const employee = employees.find(e => e.id === item.employeeId);
        if (employee) {
            if (!departmentGroups[employee.department]) {
                departmentGroups[employee.department] = [];
            }
            departmentGroups[employee.department].push({
                ...item,
                employee: employee
            });
        }
    });

    // Hiển thị dữ liệu theo từng phòng ban
    Object.entries(departmentGroups).forEach(([deptId, items]) => {
        const department = departments.find(d => d.id === deptId);

        // Header phòng ban
        const deptRow = document.createElement('tr');
        deptRow.className = 'department-header';
        deptRow.innerHTML = `
            <td colspan="11">
                <i class="fas fa-building mr-2"></i>
                ${department?.name || 'Không xác định'}
            </td>
        `;
        tbody.appendChild(deptRow);

        // Dữ liệu nhân viên
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.employee.id}</td>
                <td>
                    ${item.employee.name}
                    <div class="small text-muted">${item.employee.position}</div>
                </td>
                <td class="text-right">${formatCurrency(item.basicSalary)}</td>
                <td class="text-right">${formatCurrency(item.allowance)}</td>
                <td class="text-right">${formatCurrency(item.bonus)}</td>
                <td class="text-right">${formatCurrency(item.basicSalary + item.allowance + item.bonus)}</td>
                <td class="text-right">${formatCurrency(item.deductions)}</td>
                <td class="text-right">${formatCurrency(item.taxableIncome)}</td>
                <td class="text-right">${formatCurrency(item.tax)}</td>
                <td class="text-right">${formatCurrency(item.netSalary)}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewDetail('${item.employeeId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Dòng tổng phòng ban
        const totals = calculateDepartmentTotals(items);
        const totalRow = document.createElement('tr');
        totalRow.className = 'total-row';
        totalRow.innerHTML = `
            <td colspan="2">
                <strong>Tổng ${department?.name || ''}</strong>
            </td>
            <td class="text-right"><strong>${formatCurrency(totals.basicSalary)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.allowance)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.bonus)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.totalIncome)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.deductions)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.taxableIncome)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.tax)}</strong></td>
            <td class="text-right"><strong>${formatCurrency(totals.netSalary)}</strong></td>
            <td></td>
        `;
        tbody.appendChild(totalRow);
    });
}

function calculateDepartmentTotals(items) {
    return items.reduce((acc, item) => ({
        basicSalary: acc.basicSalary + item.basicSalary,
        allowance: acc.allowance + item.allowance,
        bonus: acc.bonus + item.bonus,
        totalIncome: acc.totalIncome + (item.basicSalary + item.allowance + item.bonus),
        deductions: acc.deductions + item.deductions,
        taxableIncome: acc.taxableIncome + item.taxableIncome,
        tax: acc.tax + item.tax,
        netSalary: acc.netSalary + item.netSalary
    }), {
        basicSalary: 0,
        allowance: 0,
        bonus: 0,
        totalIncome: 0,
        deductions: 0,
        taxableIncome: 0,
        tax: 0,
        netSalary: 0
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function viewDetail(employeeId) {
    try {
        const reportData = JSON.parse(localStorage.getItem('salaryReports')) || mockSalaryData;
        const employee = reportData.employees.find(e => e.id === employeeId);
        const salaryData = reportData.salaryData.find(s => s.employeeId === employeeId);
        const department = reportData.departments.find(d => d.id === employee?.department);

        if (employee && salaryData) {
            // Cập nhật thông tin nhân viên
            document.getElementById('employeeId').textContent = employee.id;
            document.getElementById('employeeName').textContent = employee.name;
            document.getElementById('employeePosition').textContent = employee.position;
            document.getElementById('departmentName').textContent = department?.name || '';
            document.getElementById('salaryPeriod').textContent = `Tháng ${salaryData.month}/${salaryData.year}`;

            // Cập nhật chi tiết thu nhập
            document.getElementById('basicSalary').textContent = formatCurrency(salaryData.basicSalary);
            document.getElementById('allowance').textContent = formatCurrency(salaryData.allowance);
            document.getElementById('bonus').textContent = formatCurrency(salaryData.bonus);
            document.getElementById('totalIncome').textContent = formatCurrency(
                salaryData.basicSalary + salaryData.allowance + salaryData.bonus
            );

            // Cập nhật chi tiết giảm trừ
            const deductions = calculateDeductions(salaryData.deductions);
            document.getElementById('personalDeduction').textContent = formatCurrency(deductions.personal);
            document.getElementById('dependentDeduction').textContent = formatCurrency(deductions.dependent);
            document.getElementById('insuranceDeduction').textContent = formatCurrency(deductions.insurance);
            document.getElementById('totalDeduction').textContent = formatCurrency(salaryData.deductions);

            // Cập nhật chi tiết thuế
            document.getElementById('taxableIncome').textContent = formatCurrency(salaryData.taxableIncome);
            document.getElementById('taxAmount').textContent = formatCurrency(salaryData.tax);
            document.getElementById('netSalary').textContent = formatCurrency(salaryData.netSalary);

            // Hiển thị modal
            $('#salaryDetailModal').modal('show');

            // Thêm event listener cho nút in
            document.getElementById('printDetailBtn').onclick = () => printSalaryDetail(employee, salaryData, department);
        } else {
            showNotification('Không tìm thấy thông tin lương của nhân viên', 'warning');
        }
    } catch (error) {
        console.error('Lỗi khi xem chi tiết:', error);
        showNotification('Có lỗi khi tải thông tin chi tiết', 'danger');
    }
}

function calculateDeductions(totalDeduction) {
    return {
        personal: 11000000, // Giảm trừ bản thân cố định
        dependent: Math.floor(totalDeduction * 0.3), // 30% là giảm trừ người phụ thuộc
        insurance: Math.floor(totalDeduction * 0.7) // 70% là bảo hiểm
    };
}

function printSalaryDetail(employee, salaryData, department) {
    const printWindow = window.open('', '', 'height=600,width=800');
    const totalIncome = salaryData.basicSalary + salaryData.allowance + salaryData.bonus;
    const deductions = calculateDeductions(salaryData.deductions);

    printWindow.document.write(`
        <html>
            <head>
                <title>Chi tiết lương - ${employee.name}</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        padding: 20px; 
                        line-height: 1.6;
                    }
                    .header { 
                        text-align: center; 
                        margin-bottom: 30px;
                    }
                    .header h1 {
                        color: #1a73e8;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    .info-section {
                        margin-bottom: 30px;
                    }
                    .info-section h2 {
                        color: #2c3e50;
                        font-size: 18px;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #eee;
                        padding-bottom: 5px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        text-align: left;
                    }
                    th {
                        background-color: #f8f9fa;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .total-row {
                        background-color: #e3f2fd;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: right;
                    }
                    @media print {
                        body { 
                            padding: 0;
                            margin: 20px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>PHIẾU CHI TIẾT LƯƠNG & THUẾ</h1>
                    <p>Kỳ lương: Tháng ${salaryData.month}/${salaryData.year}</p>
                </div>

                <div class="info-section">
                    <h2>Thông tin nhân viên</h2>
                    <table>
                        <tr>
                            <td width="30%"><strong>Mã nhân viên:</strong></td>
                            <td>${employee.id}</td>
                            <td width="30%"><strong>Họ và tên:</strong></td>
                            <td>${employee.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Chức vụ:</strong></td>
                            <td>${employee.position}</td>
                            <td><strong>Phòng ban:</strong></td>
                            <td>${department?.name}</td>
                        </tr>
                    </table>
                </div>

                <div class="info-section">
                    <h2>Chi tiết thu nhập</h2>
                    <table>
                        <tr>
                            <td>Lương cơ bản</td>
                            <td class="text-right">${formatCurrency(salaryData.basicSalary)}</td>
                        </tr>
                        <tr>
                            <td>Phụ cấp</td>
                            <td class="text-right">${formatCurrency(salaryData.allowance)}</td>
                        </tr>
                        <tr>
                            <td>Thưởng</td>
                            <td class="text-right">${formatCurrency(salaryData.bonus)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Tổng thu nhập</strong></td>
                            <td class="text-right"><strong>${formatCurrency(totalIncome)}</strong></td>
                        </tr>
                    </table>
                </div>

                <div class="info-section">
                    <h2>Chi tiết giảm trừ</h2>
                    <table>
                        <tr>
                            <td>Giảm trừ gia cảnh bản thân</td>
                            <td class="text-right">${formatCurrency(deductions.personal)}</td>
                        </tr>
                        <tr>
                            <td>Giảm trừ người phụ thuộc</td>
                            <td class="text-right">${formatCurrency(deductions.dependent)}</td>
                        </tr>
                        <tr>
                            <td>Bảo hiểm bắt buộc</td>
                            <td class="text-right">${formatCurrency(deductions.insurance)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Tổng giảm trừ</strong></td>
                            <td class="text-right"><strong>${formatCurrency(salaryData.deductions)}</strong></td>
                        </tr>
                    </table>
                </div>

                <div class="info-section">
                    <h2>Chi tiết thuế</h2>
                    <table>
                        <tr>
                            <td>Thu nhập tính thuế</td>
                            <td class="text-right">${formatCurrency(salaryData.taxableIncome)}</td>
                        </tr>
                        <tr>
                            <td>Thuế TNCN</td>
                            <td class="text-right">${formatCurrency(salaryData.tax)}</td>
                        </tr>
                        <tr class="total-row">
                            <td><strong>Thực lĩnh</strong></td>
                            <td class="text-right"><strong>${formatCurrency(salaryData.netSalary)}</strong></td>
                        </tr>
                    </table>
                </div>

                <div class="footer">
                    <p>Ngày in: ${new Date().toLocaleDateString('vi-VN')}</p>
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

function exportReport() {
    const departmentId = document.getElementById('departmentSelect').value;
    const month = document.getElementById('monthSelect').value;
    const year = document.getElementById('yearSelect').value;

    const reportData = JSON.parse(localStorage.getItem('salaryReports')) || mockSalaryData;
    let data = reportData.salaryData;

    // Áp dụng các bộ lọc
    if (departmentId) {
        const departmentEmployees = reportData.departments
            .find(d => d.id === departmentId)?.employees || [];
        data = data.filter(d => departmentEmployees.includes(d.employeeId));
    }

    if (month) {
        data = data.filter(d => d.month === parseInt(month));
    }

    if (year) {
        data = data.filter(d => d.year === parseInt(year));
    }

    // Tạo nội dung CSV
    let csvContent = 'Mã NV,Họ tên,Chức vụ,Lương cơ bản,Phụ cấp,Thưởng,Tổng thu nhập,Giảm trừ,Thu nhập tính thuế,Thuế TNCN,Thực lĩnh\n';

    data.forEach(item => {
        const employee = reportData.employees.find(e => e.id === item.employeeId);
        if (employee) {
            csvContent += `${employee.id},${employee.name},${employee.position},` +
                `${item.basicSalary},${item.allowance},${item.bonus},` +
                `${item.basicSalary + item.allowance + item.bonus},` +
                `${item.deductions},${item.taxableIncome},${item.tax},${item.netSalary}\n`;
        }
    });

    // Tạo và tải file
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Bao_cao_luong_thue_${month || 'all'}_${year || 'all'}.csv`;
    link.click();
}

// Thêm hàm hiển thị thông báo
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        ${message}
       
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 