// Dữ liệu mẫu cho nhân viên
const mockEmployees = [
    {
        id: 'NV001',
        name: 'Nguyễn Văn An',
        position: 'Trưởng phòng',
        joinDate: '2020-01-15',
        identityNumber: '001089123456',
        phoneNumber: '0901234567',
        email: 'an.nguyen@company.com',
        address: 'Số 123 Đường Lê Lợi, Quận 1, TP.HCM'
    },
    {
        id: 'NV002',
        name: 'Trần Thị Bình',
        position: 'Nhân viên',
        joinDate: '2020-03-20',
        identityNumber: '001089123457',
        phoneNumber: '0901234568',
        email: 'binh.tran@company.com',
        address: 'Số 456 Đường Nguyễn Huệ, Quận 1, TP.HCM'
    },
    { id: 'NV003', name: 'Lê Văn Cường', position: 'Nhân viên', joinDate: '2020-05-10', identityNumber: '001089123458', phoneNumber: '0901234569', email: 'cuong.le@company.com', address: 'Số 789 Đường Lê Lợi, Quận 1, TP.HCM' },
    { id: 'NV004', name: 'Phạm Thị Dung', position: 'Trưởng phòng', joinDate: '2020-07-25', identityNumber: '001089123459', phoneNumber: '0901234570', email: 'dung.pham@company.com', address: 'Số 101 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
    { id: 'NV005', name: 'Hoàng Văn Em', position: 'Nhân viên', joinDate: '2020-09-15', identityNumber: '001089123460', phoneNumber: '0901234571', email: 'em.hoang@company.com', address: 'Số 123 Đường Lê Lợi, Quận 1, TP.HCM' },
    { id: 'NV006', name: 'Nguyễn Thị Phương', position: 'Nhân viên', joinDate: '2020-11-20', identityNumber: '001089123461', phoneNumber: '0901234572', email: 'phuong.nguyen@company.com', address: 'Số 456 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
    { id: 'NV007', name: 'Trần Văn Giỏi', position: 'Trưởng phòng', joinDate: '2021-01-10', identityNumber: '001089123462', phoneNumber: '0901234573', email: 'gi.tran@company.com', address: 'Số 789 Đường Lê Lợi, Quận 1, TP.HCM' },
    { id: 'NV008', name: 'Lê Thị Hương', position: 'Nhân viên', joinDate: '2021-03-25', identityNumber: '001089123463', phoneNumber: '0901234574', email: 'huong.le@company.com', address: 'Số 101 Đường Nguyễn Huệ, Quận 1, TP.HCM' },
    { id: 'NV009', name: 'Phạm Văn Khoa', position: 'Nhân viên', joinDate: '2021-05-15', identityNumber: '001089123464', phoneNumber: '0901234575', email: 'khoa.pham@company.com', address: 'Số 123 Đường Lê Lợi, Quận 1, TP.HCM' },
    { id: 'NV010', name: 'Vũ Thị Lan', position: 'Nhân viên', joinDate: '2021-07-20', identityNumber: '001089123465', phoneNumber: '0901234576', email: 'lan.vu@company.com', address: 'Số 456 Đường Nguyễn Huệ, Quận 1, TP.HCM' }
];

// Dữ liệu mẫu cho phòng ban
const mockDepartments = [
    {
        id: 'PB001',
        name: 'Phòng Kế Toán',
        description: 'Quản lý tài chính và kế toán',
        manager: 'NV001',
        employees: ['NV001', 'NV002', 'NV003'],
        establishedDate: '2020-01-01',
        budget: 500000000,
        location: 'Tầng 3, Tòa nhà A',
        phoneExt: '301'
    },
    {
        id: 'PB002',
        name: 'Phòng Nhân Sự',
        description: 'Quản lý nhân sự và tuyển dụng',
        manager: 'NV004',
        employees: ['NV004', 'NV005', 'NV006'],
        establishedDate: '2020-03-01',
        budget: 300000000,
        location: 'Tầng 2, Tòa nhà B',
        phoneExt: '201'
    },
    {
        id: 'PB003',
        name: 'Phòng Kỹ Thuật',
        description: 'Phát triển và bảo trì hệ thống',
        manager: 'NV007',
        employees: ['NV007', 'NV008', 'NV009', 'NV010'],
        establishedDate: '2020-05-15',
        budget: 400000000,
        location: 'Tầng 4, Tòa nhà C',
        phoneExt: '401'
    }
];

// Dữ liệu mẫu cho lương
const mockSalaryData = [
    // Lương tháng 12/2023 - Phòng Kế Toán
    {
        employeeId: 'NV001',
        month: 12,
        year: 2023,
        basicSalary: 25000000,
        allowance: 3000000,
        bonus: 2000000,
        overtimePay: 1500000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        dependents: 2,
        note: 'Lương tháng 12/2023 + thưởng cuối năm',
        lastModified: '2023-12-25T08:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV004',
        approvedDate: '2023-12-26T10:00:00.000Z'
    },
    {
        employeeId: 'NV002',
        month: 12,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        bonus: 1500000,
        overtimePay: 800000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T09:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-12-26T11:00:00.000Z'
    },
    {
        employeeId: 'NV003',
        month: 12,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        bonus: 1500000,
        overtimePay: 1000000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T10:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-12-26T11:30:00.000Z'
    },

    // Lương tháng 12/2023 - Phòng Nhân Sự
    {
        employeeId: 'NV004',
        month: 12,
        year: 2023,
        basicSalary: 23000000,
        allowance: 3000000,
        bonus: 2000000,
        overtimePay: 0,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T11:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-12-26T13:00:00.000Z'
    },
    {
        employeeId: 'NV005',
        month: 12,
        year: 2023,
        basicSalary: 14000000,
        allowance: 2000000,
        bonus: 1000000,
        overtimePay: 500000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T13:30:00.000Z',
        status: 'submitted',
        submittedDate: '2023-12-25T13:30:00.000Z'
    },
    {
        employeeId: 'NV006',
        month: 12,
        year: 2023,
        basicSalary: 14000000,
        allowance: 2000000,
        bonus: 1000000,
        overtimePay: 700000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T14:30:00.000Z',
        status: 'draft'
    },

    // Lương tháng 12/2023 - Phòng Kỹ Thuật
    {
        employeeId: 'NV007',
        month: 12,
        year: 2023,
        basicSalary: 24000000,
        allowance: 3000000,
        bonus: 2000000,
        overtimePay: 1200000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T15:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-12-26T16:00:00.000Z'
    },
    {
        employeeId: 'NV008',
        month: 12,
        year: 2023,
        basicSalary: 16000000,
        allowance: 2000000,
        bonus: 1500000,
        overtimePay: 900000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T16:30:00.000Z',
        status: 'submitted',
        submittedDate: '2023-12-25T16:30:00.000Z'
    },
    {
        employeeId: 'NV009',
        month: 12,
        year: 2023,
        basicSalary: 16000000,
        allowance: 2000000,
        bonus: 1500000,
        overtimePay: 800000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T17:30:00.000Z',
        status: 'draft'
    },
    {
        employeeId: 'NV010',
        month: 12,
        year: 2023,
        basicSalary: 15000000,
        allowance: 2000000,
        bonus: 1000000,
        overtimePay: 600000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 12/2023',
        lastModified: '2023-12-25T18:30:00.000Z',
        status: 'draft'
    },

    // Lương tháng 11/2023 - Một số nhân viên
    {
        employeeId: 'NV001',
        month: 11,
        year: 2023,
        basicSalary: 25000000,
        allowance: 3000000,
        bonus: 1000000,
        overtimePay: 800000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 11/2023',
        lastModified: '2023-11-25T08:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV004',
        approvedDate: '2023-11-26T10:00:00.000Z'
    },
    {
        employeeId: 'NV004',
        month: 11,
        year: 2023,
        basicSalary: 23000000,
        allowance: 3000000,
        bonus: 1000000,
        overtimePay: 0,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 11/2023',
        lastModified: '2023-11-25T09:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-11-26T11:00:00.000Z'
    },
    {
        employeeId: 'NV007',
        month: 11,
        year: 2023,
        basicSalary: 24000000,
        allowance: 3000000,
        bonus: 1500000,
        overtimePay: 1000000,
        insurance: {
            social: true,
            health: true,
            unemployment: true
        },
        note: 'Lương tháng 11/2023',
        lastModified: '2023-11-25T10:30:00.000Z',
        status: 'approved',
        approvedBy: 'NV001',
        approvedDate: '2023-11-26T12:00:00.000Z'
    }
];

// Dữ liệu mẫu cho thuế
const mockTaxData = [
    {
        employeeId: 'NV001',
        month: 12,
        year: 2023,
        totalIncome: 31500000, // Lương cơ bản + phụ cấp + thưởng + làm thêm
        taxableIncome: 25100000, // Sau khi trừ các khoản giảm trừ
        personalDeduction: 11000000,
        dependentDeduction: 8800000, // 4.4tr × 2 người
        insuranceDeduction: 2800000,
        taxAmount: 2265000,
        calculatedDate: '2023-12-26T11:00:00.000Z',
        status: 'completed',
        details: {
            taxBrackets: [
                { from: 0, to: 5000000, rate: 0.05, tax: 250000 },
                { from: 5000000, to: 10000000, rate: 0.1, tax: 500000 },
                // ... chi tiết các mức thuế
            ]
        }
    },
    // Thêm dữ liệu thuế cho các tháng khác
];

// Dữ liệu mẫu cho quyết toán thuế năm
const mockAnnualTaxData = [
    {
        employeeId: 'NV001',
        year: 2023,
        totalAnnualIncome: 360000000,
        totalDeductions: 270000000,
        taxableIncome: 90000000,
        taxPaid: 25000000,
        finalTax: 27000000,
        additionalTax: 2000000,
        status: 'pending',
        submittedDate: '2024-01-15T09:00:00.000Z',
        documents: [
            { type: 'Chứng từ giảm trừ gia cảnh', submitted: true },
            { type: 'Hóa đơn y tế', submitted: true },
            { type: 'Chứng từ từ thiện', submitted: false }
        ]
    }
];

// Khởi tạo dữ liệu mẫu khi chạy lần đầu
function initializeMockData() {
    // Khởi tạo dữ liệu nhân viên nếu chưa có
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
        console.log('Đã khởi tạo dữ liệu nhân viên mẫu');
    }

    // Khởi tạo dữ liệu phòng ban nếu chưa có
    if (!localStorage.getItem('departments')) {
        localStorage.setItem('departments', JSON.stringify(mockDepartments));
        console.log('Đã khởi tạo dữ liệu phòng ban mẫu');
    }

    // Khởi tạo dữ liệu lương nếu chưa có
    if (!localStorage.getItem('salaryData')) {
        localStorage.setItem('salaryData', JSON.stringify(mockSalaryData));
        console.log('Đã khởi tạo dữ liệu lương mẫu');
    }

    // Khởi tạo dữ liệu thuế nếu chưa có
    if (!localStorage.getItem('taxData')) {
        localStorage.setItem('taxData', JSON.stringify(mockTaxData));
        console.log('Đã khởi tạo dữ liệu thuế mẫu');
    }
}

// Thêm hàm để reset dữ liệu mẫu (có thể dùng để test)
function resetMockData() {
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
    localStorage.setItem('departments', JSON.stringify(mockDepartments));
    localStorage.setItem('salaryData', JSON.stringify(mockSalaryData));
    localStorage.setItem('taxData', JSON.stringify(mockTaxData));
    console.log('Đã reset toàn bộ dữ liệu mẫu');
    location.reload(); // Tải lại trang để cập nhật dữ liệu
}

// Dữ liệu lương của nhân viên
let salaryData = [];

document.addEventListener('DOMContentLoaded', function () {
    try {
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

        // Khởi tạo các select
        initializeMonthYearSelect();
        initializeDepartmentSelect();

        // Load dữ liệu từ localStorage
        loadSalaryData();

        // Thêm event listeners
        document.getElementById('loadEmployees').addEventListener('click', loadEmployeeList);
        document.getElementById('saveSalary').addEventListener('click', saveSalaryInfo);
        document.getElementById('monthSelect').addEventListener('change', loadEmployeeList);
        document.getElementById('yearSelect').addEventListener('change', loadEmployeeList);
        document.getElementById('departmentSelect').addEventListener('change', loadEmployeeList);

        // Load danh sách ban đầu
        loadEmployeeList();

        console.log('Khởi tạo ứng dụng thành công');
    } catch (error) {
        console.error('Lỗi khởi tạo ứng dụng:', error);
        showNotification('Có lỗi xảy ra khi khởi tạo ứng dụng', 'danger');
    }
});

function initializeMonthYearSelect() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const currentDate = new Date();

    // Khởi tạo tháng
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Tháng ${i}`;
        if (i === currentDate.getMonth() + 1) {
            option.selected = true;
        }
        monthSelect.appendChild(option);
    }

    // Khởi tạo năm (từ năm hiện tại trở về 5 năm trước)
    const currentYear = currentDate.getFullYear();
    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `Năm ${year}`;
        yearSelect.appendChild(option);
    }
}

function initializeDepartmentSelect() {
    const departmentSelect = document.getElementById('departmentSelect');
    const departments = JSON.parse(localStorage.getItem('departments')) || mockDepartments;

    departmentSelect.innerHTML = '<option value="">Tất cả phòng ban</option>';
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
}

function loadSalaryData() {
    try {
        const storedData = localStorage.getItem('salaryData');
        if (storedData) {
            salaryData = JSON.parse(storedData);
            console.log('Đã load dữ liệu lương từ localStorage');
        } else {
            // Nếu chưa có dữ liệu, sử dụng dữ liệu mẫu
            salaryData = mockSalaryData;
            localStorage.setItem('salaryData', JSON.stringify(mockSalaryData));
            console.log('Đã khởi tạo dữ liệu lương mẫu');
        }
    } catch (error) {
        console.error('Lỗi khi load dữ liệu lương:', error);
        showNotification('Có lỗi khi tải dữ liệu lương', 'danger');
    }
}

function saveSalaryDataToStorage() {
    localStorage.setItem('salaryData', JSON.stringify(salaryData));
}

function loadEmployeeList() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const departmentId = document.getElementById('departmentSelect').value;

    // Lấy dữ liệu từ localStorage
    const departments = JSON.parse(localStorage.getItem('departments')) || mockDepartments;
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || mockEmployees;
    salaryData = JSON.parse(localStorage.getItem('salaryData')) || mockSalaryData;

    let employees = [];

    try {
        if (departmentId) {
            // Lọc nhân viên theo phòng ban
            const department = departments.find(d => d.id === departmentId);
            if (department) {
                department.employees.forEach(empId => {
                    const employee = allEmployees.find(e => e.id === empId);
                    if (employee) {
                        employees.push({ ...employee, departmentId: department.id });
                    }
                });
            }
        } else {
            // Lấy tất cả nhân viên
            departments.forEach(dept => {
                dept.employees.forEach(empId => {
                    const employee = allEmployees.find(e => e.id === empId);
                    if (employee && !employees.some(e => e.id === employee.id)) {
                        employees.push({ ...employee, departmentId: dept.id });
                    }
                });
            });
        }

        console.log('Loaded employees:', employees); // Debug
        displayEmployeeList(employees, month, year);
    } catch (error) {
        console.error('Lỗi khi tải danh sách nhân viên:', error);
        showNotification('Có lỗi xảy ra khi tải danh sách nhân viên', 'danger');
    }
}

function displayEmployeeList(employees, month, year) {
    const tbody = document.getElementById('employeeList');
    tbody.innerHTML = '';

    if (employees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">Không có nhân viên nào</td>
            </tr>
        `;
        return;
    }

    employees.forEach(emp => {
        const salaryInfo = salaryData.find(s =>
            s.employeeId === emp.id &&
            s.month === parseInt(month) &&
            s.year === parseInt(year)
        );

        const department = JSON.parse(localStorage.getItem('departments'))
            .find(d => d.id === emp.departmentId);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>
                ${emp.name}
                ${emp.position === 'Trưởng phòng' ?
                '<span class="badge badge-info ml-1">Trưởng phòng</span>' :
                ''}
            </td>
            <td>${department ? department.name : 'N/A'}</td>
            <td class="text-right">${salaryInfo ? formatCurrency(salaryInfo.basicSalary) : '-'}</td>
            <td class="text-right">${salaryInfo ? formatCurrency(salaryInfo.allowance || 0) : '-'}</td>
            <td class="text-right">${salaryInfo ? formatCurrency(salaryInfo.bonus || 0) : '-'}</td>
            <td class="text-right">${salaryInfo ? formatCurrency(salaryInfo.overtimePay || 0) : '-'}</td>
            <td class="text-center">
                <span class="salary-status ${getStatusClass(salaryInfo?.status)}">
                    ${getStatusText(salaryInfo?.status)}
                </span>
            </td>
            <td class="text-center">
                <div class="action-buttons">
                    ${generateActionButtons(emp.id, emp.name, salaryInfo)}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Thêm dòng tổng cộng nếu có dữ liệu
    if (employees.length > 0) {
        const totalRow = createTotalRow(employees, month, year);
        tbody.appendChild(totalRow);
    }
}

function createTotalRow(employees, month, year) {
    let totalBasicSalary = 0;
    let totalAllowance = 0;
    let totalBonus = 0;
    let totalOvertimePay = 0;

    employees.forEach(emp => {
        const salaryInfo = salaryData.find(s =>
            s.employeeId === emp.id &&
            s.month === parseInt(month) &&
            s.year === parseInt(year)
        );

        if (salaryInfo) {
            totalBasicSalary += salaryInfo.basicSalary || 0;
            totalAllowance += salaryInfo.allowance || 0;
            totalBonus += salaryInfo.bonus || 0;
            totalOvertimePay += salaryInfo.overtimePay || 0;
        }
    });

    const row = document.createElement('tr');
    row.className = 'table-info font-weight-bold';
    row.innerHTML = `
        <td colspan="3" class="text-right">Tổng cộng:</td>
        <td class="text-right">${formatCurrency(totalBasicSalary)}</td>
        <td class="text-right">${formatCurrency(totalAllowance)}</td>
        <td class="text-right">${formatCurrency(totalBonus)}</td>
        <td class="text-right">${formatCurrency(totalOvertimePay)}</td>
        <td colspan="2"></td>
    `;
    return row;
}

function generateActionButtons(employeeId, employeeName, salaryInfo) {
    if (!salaryInfo) {
        return `
            <button class="btn btn-sm btn-primary" onclick="openSalaryModal('${employeeId}', '${employeeName}')">
                <i class="fas fa-plus"></i> Nhập lương
            </button>
        `;
    }

    let buttons = '';
    switch (salaryInfo.status) {
        case 'draft':
            buttons = `
                <button class="btn btn-sm btn-primary" onclick="openSalaryModal('${employeeId}', '${employeeName}')">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-sm btn-success" onclick="submitSalary('${employeeId}')">
                    <i class="fas fa-check"></i> Nộp
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSalary('${employeeId}')">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            break;
        case 'submitted':
            buttons = `
                <button class="btn btn-sm btn-warning" onclick="recallSalary('${employeeId}')">
                    <i class="fas fa-undo"></i> Thu hồi
                </button>
            `;
            break;
        default:
            buttons = `
                <button class="btn btn-sm btn-info" onclick="viewSalaryDetail('${employeeId}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
            `;
    }
    return buttons;
}

function getStatusClass(status) {
    const statusClasses = {
        'draft': 'bg-secondary',
        'submitted': 'bg-info',
        'approved': 'bg-success',
        'rejected': 'bg-danger'
    };
    return statusClasses[status] || 'bg-secondary';
}

function getStatusText(status) {
    const statusTexts = {
        'draft': 'Bản nháp',
        'submitted': 'Đã nộp',
        'approved': 'Đã duyệt',
        'rejected': 'Từ chối',
        undefined: 'Chưa nhập'
    };
    return statusTexts[status] || 'Chưa nhập';
}

function openSalaryModal(employeeId, employeeName) {
    document.getElementById('employeeId').value = employeeId;
    document.getElementById('employeeName').value = employeeName;

    // Lấy thông tin lương hiện tại nếu có
    const salaryInfo = findCurrentSalaryInfo(employeeId);
    if (salaryInfo) {
        document.getElementById('basicSalary').value = salaryInfo.basicSalary;
        document.getElementById('allowance').value = salaryInfo.allowance || 0;
        document.getElementById('bonus').value = salaryInfo.bonus || 0;
        document.getElementById('overtimePay').value = salaryInfo.overtimePay || 0;
        document.getElementById('note').value = salaryInfo.note || '';

        // Set trạng thái bảo hiểm
        document.getElementById('socialInsurance').checked = salaryInfo.insurance.social;
        document.getElementById('healthInsurance').checked = salaryInfo.insurance.health;
        document.getElementById('unemploymentInsurance').checked = salaryInfo.insurance.unemployment;
    } else {
        // Reset form nếu là nhập mới
        document.getElementById('salaryForm').reset();
    }

    $('#salaryModal').modal('show');
}

function saveSalaryInfo() {
    const employeeId = document.getElementById('employeeId').value;
    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const allowance = parseFloat(document.getElementById('allowance').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const overtimePay = parseFloat(document.getElementById('overtimePay').value) || 0;
    const note = document.getElementById('note').value.trim();
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    // Validate
    if (!validateSalaryInput(basicSalary, allowance, bonus, overtimePay)) return;

    try {
        const salaryInfo = {
            employeeId,
            month,
            year,
            basicSalary,
            allowance,
            bonus,
            overtimePay,
            insurance: {
                social: document.getElementById('socialInsurance').checked,
                health: document.getElementById('healthInsurance').checked,
                unemployment: document.getElementById('unemploymentInsurance').checked
            },
            note,
            status: 'draft',
            lastModified: new Date().toISOString(),
            modifiedBy: JSON.parse(localStorage.getItem('currentUser')).id
        };

        // Cập nhật hoặc thêm mới
        const existingIndex = salaryData.findIndex(s =>
            s.employeeId === employeeId &&
            s.month === month &&
            s.year === year
        );

        if (existingIndex !== -1) {
            // Giữ lại một số thông tin cũ nếu cần
            salaryInfo.createdDate = salaryData[existingIndex].createdDate;
            salaryData[existingIndex] = salaryInfo;
        } else {
            salaryInfo.createdDate = new Date().toISOString();
            salaryData.push(salaryInfo);
        }

        // Lưu vào localStorage
        saveSalaryDataToStorage();
        loadEmployeeList();
        $('#salaryModal').modal('hide');
        showNotification('Đã lưu thông tin lương thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin lương:', error);
        showNotification('Có lỗi xảy ra khi lưu thông tin lương', 'danger');
    }
}

function submitSalary(employeeId) {
    const salaryInfo = findCurrentSalaryInfo(employeeId);
    if (!salaryInfo) return;

    if (confirm('Bạn có chắc chắn muốn nộp thông tin lương này?')) {
        salaryInfo.status = 'submitted';
        salaryInfo.submittedDate = new Date().toISOString();
        saveSalaryDataToStorage();
        loadEmployeeList();
        showNotification('Đã nộp thông tin lương thành công!');
    }
}

function recallSalary(employeeId) {
    const salaryInfo = findCurrentSalaryInfo(employeeId);
    if (!salaryInfo) return;

    if (confirm('Bạn có chắc chắn muốn thu hồi thông tin lương này?')) {
        salaryInfo.status = 'draft';
        delete salaryInfo.submittedDate;
        saveSalaryDataToStorage();
        loadEmployeeList();
        showNotification('Đã thu hồi thông tin lương!');
    }
}

function deleteSalary(employeeId) {
    if (confirm('Bạn có chắc chắn muốn xóa thông tin lương này?')) {
        const month = parseInt(document.getElementById('monthSelect').value);
        const year = parseInt(document.getElementById('yearSelect').value);

        salaryData = salaryData.filter(s =>
            !(s.employeeId === employeeId &&
                s.month === month &&
                s.year === year)
        );

        saveSalaryDataToStorage();
        loadEmployeeList();
        showNotification('Đã xóa thông tin lương!');
    }
}

function findCurrentSalaryInfo(employeeId) {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    return salaryData.find(s =>
        s.employeeId === employeeId &&
        s.month === month &&
        s.year === year
    );
}

function validateSalaryInput(basicSalary, allowance, bonus, overtimePay) {
    let hasError = false;

    if (!basicSalary || basicSalary <= 0) {
        document.getElementById('basicSalaryError').textContent = 'Vui lòng nhập lương cơ bản hợp lệ';
        hasError = true;
    }

    if (allowance < 0) {
        document.getElementById('allowanceError').textContent = 'Phụ cấp không được âm';
        hasError = true;
    }

    if (bonus < 0) {
        document.getElementById('bonusError').textContent = 'Thưởng không được âm';
        hasError = true;
    }

    if (overtimePay < 0) {
        document.getElementById('overtimePayError').textContent = 'Lương làm thêm không được âm';
        hasError = true;
    }

    return !hasError;
}

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