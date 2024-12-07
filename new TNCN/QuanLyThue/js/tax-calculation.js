// Các hằng số thuế
const TAX_BRACKETS = [
    { from: 0, to: 5000000, rate: 0.05 },
    { from: 5000000, to: 10000000, rate: 0.10 },
    { from: 10000000, to: 18000000, rate: 0.15 },
    { from: 18000000, to: 32000000, rate: 0.20 },
    { from: 32000000, to: 52000000, rate: 0.25 },
    { from: 52000000, to: 80000000, rate: 0.30 },
    { from: 80000000, to: Infinity, rate: 0.35 }
];

// Thêm hằng số cho các loại giảm trừ
const DEDUCTION_TYPES = {
    PERSONAL: {
        type: 'personal',
        amount: 11000000,
        name: 'Giảm trừ bản thân'
    },
    DEPENDENT: {
        type: 'dependent',
        amount: 4400000,
        name: 'Giảm trừ người phụ thuộc'
    },
    INSURANCE: {
        type: 'insurance',
        name: 'Bảo hiểm bắt buộc',
        rates: {
            social: 0.08,
            health: 0.015,
            unemployment: 0.01
        }
    },
    CHARITY: {
        type: 'charity',
        name: 'Từ thiện, nhân đạo'
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Khởi tạo các select
    initializeFilters();

    // Load danh sách nhân viên
    loadEmployeeList();

    // Thêm event listeners
    document.getElementById('calculateTaxBtn').addEventListener('click', calculateTax);
    document.getElementById('saveTaxBtn').addEventListener('click', saveTaxCalculation);
    document.getElementById('departmentSelect').addEventListener('change', loadEmployeeList);
    document.getElementById('monthSelect').addEventListener('change', loadEmployeeList);
    document.getElementById('yearSelect').addEventListener('change', loadEmployeeList);
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

    // Khởi tạo select phòng ban
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const departmentSelect = document.getElementById('departmentSelect');
    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
}

function loadEmployeeList() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const departmentId = document.getElementById('departmentSelect').value;

    // Lấy dữ liệu từ localStorage
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const salaryData = JSON.parse(localStorage.getItem('salaryData')) || [];
    const taxData = JSON.parse(localStorage.getItem('taxData')) || [];

    let employees = [];
    if (departmentId) {
        const department = departments.find(d => d.id === departmentId);
        if (department) {
            employees = department.employees
                .map(empId => allEmployees.find(e => e.id === empId))
                .filter(emp => emp);
        }
    } else {
        employees = allEmployees;
    }

    const tbody = document.getElementById('employeeList');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const salary = salaryData.find(s =>
            s.employeeId === emp.id &&
            s.month === month &&
            s.year === year
        );

        const tax = taxData.find(t =>
            t.employeeId === emp.id &&
            t.month === month &&
            t.year === year
        );

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${salary ? formatCurrency(salary.totalIncome) : '0 VNĐ'}</td>
            <td>${tax ? formatCurrency(tax.totalDeductions) : '0 VNĐ'}</td>
            <td>${tax ? formatCurrency(tax.taxableIncome) : '0 VNĐ'}</td>
            <td>${tax ? formatCurrency(tax.tax) : '0 VNĐ'}</td>
            <td>
                ${generateActionButton(emp, salary, tax)}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function generateActionButton(employee, salary, tax) {
    if (!salary) {
        return '<button class="btn btn-sm btn-secondary" disabled>Chưa có lương</button>';
    }

    if (tax) {
        return `
            <div class="btn-group">
                <button class="btn btn-sm btn-info" onclick="viewTaxDetail('${employee.id}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
                <button class="btn btn-sm btn-warning" onclick="openTaxModal('${employee.id}')">
                    <i class="fas fa-calculator"></i> Tính lại
                </button>
            </div>
        `;
    }

    return `
        <button class="btn btn-sm btn-primary" onclick="openTaxModal('${employee.id}')">
            <i class="fas fa-calculator"></i> Tính thuế
        </button>
    `;
}

// Thêm hàm lấy thông tin giảm trừ của nhân viên
function getEmployeeDeductions(employeeId) {
    const deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
    return deductions.find(d => d.employeeId === employeeId) || {
        employeeId,
        dependentsCount: 0,
        dependents: []
    };
}

// Sửa lại hàm mở modal
function openTaxModal(employeeId) {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    const employee = JSON.parse(localStorage.getItem('employees'))
        .find(emp => emp.id === employeeId);

    const salary = JSON.parse(localStorage.getItem('salaryData'))
        .find(s => s.employeeId === employeeId && s.month === month && s.year === year);

    if (!employee || !salary) {
        showNotification('Không tìm thấy thông tin lương', 'danger');
        return;
    }

    // Lấy thông tin giảm trừ
    const deductionInfo = getEmployeeDeductions(employeeId);

    // Điền thông tin vào form
    document.getElementById('employeeId').value = employeeId;
    document.getElementById('employeeName').value = employee.name;
    document.getElementById('totalIncome').value = formatCurrency(salary.totalIncome);
    document.getElementById('dependentsCount').value = deductionInfo.dependentsCount;

    // Reset form và ẩn kết quả
    document.getElementById('taxResultSection').style.display = 'none';
    document.getElementById('saveTaxBtn').style.display = 'none';

    $('#taxCalculationModal').modal('show');
}

// Sửa lại hàm tính tổng giảm trừ
function calculateTotalDeductions(salary, employeeId) {
    let totalDeductions = 0;

    // Giảm trừ bản thân (luôn được áp dụng)
    totalDeductions += DEDUCTION_TYPES.PERSONAL.amount;

    // Lấy thông tin giảm trừ của nhân viên
    const deductionInfo = getEmployeeDeductions(employeeId);

    // Giảm trừ người phụ thuộc (nếu được chọn)
    if (document.getElementById('dependentDeduction').checked) {
        totalDeductions += deductionInfo.dependentsCount * DEDUCTION_TYPES.DEPENDENT.amount;
    }

    // Giảm trừ bảo hiểm (nếu được chọn)
    if (document.getElementById('insuranceDeduction').checked) {
        totalDeductions += calculateInsuranceDeductions(salary);
    }

    return totalDeductions;
}

// Sửa lại hàm tính thuế
function calculateTax() {
    const employeeId = document.getElementById('employeeId').value;
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    try {
        // Lấy thông tin nhân viên và lương
        const employee = JSON.parse(localStorage.getItem('employees'))
            .find(emp => emp.id === employeeId);
        const salary = JSON.parse(localStorage.getItem('salaryData'))
            .find(s => s.employeeId === employeeId && s.month === month && s.year === year);
        const department = JSON.parse(localStorage.getItem('departments'))
            .find(d => d.employees.includes(employeeId));

        if (!employee || !salary || !department) {
            throw new Error('Không tìm thấy thông tin nhân viên hoặc lương');
        }

        // Tính tổng thu nhập
        const totalIncome = salary.basicSalary + salary.allowance + salary.bonus + (salary.overtimePay || 0);

        // Tính các khoản giảm trừ
        const personalDeduction = DEDUCTION_TYPES.PERSONAL.amount;
        const dependentDeduction = document.getElementById('dependentDeduction').checked ?
            (parseInt(document.getElementById('dependentsCount').value) * DEDUCTION_TYPES.DEPENDENT.amount) : 0;
        const insuranceDeduction = document.getElementById('insuranceDeduction').checked ?
            calculateInsuranceDeductions(salary.basicSalary) : 0;

        const totalDeductions = personalDeduction + dependentDeduction + insuranceDeduction;

        // Tính thu nhập tính thuế
        const taxableIncome = Math.max(0, totalIncome - totalDeductions);

        // Tính thuế theo biểu thuế lũy tiến
        const { tax: totalTax, breakdown } = calculateTaxByBrackets(taxableIncome);

        // Tính thực lĩnh
        const netIncome = totalIncome - totalTax;

        // Tạo đối tượng thông tin thuế
        const taxInfo = {
            employeeId: employee.id,
            employeeName: employee.name,
            departmentName: department.name,
            month,
            year,
            basicSalary: salary.basicSalary,
            allowance: salary.allowance,
            bonus: salary.bonus,
            overtimePay: salary.overtimePay || 0,
            totalIncome,
            personalDeduction,
            dependentDeduction,
            insuranceDeduction,
            totalDeduction: totalDeductions,
            taxableIncome,
            totalTax,
            netIncome,
            taxBreakdown: breakdown.map(item => ({
                from: item.from,
                to: item.to,
                taxableAmount: item.income,
                rate: item.rate,
                taxAmount: item.tax
            })),
            calculatedBy: JSON.parse(localStorage.getItem('currentUser')).id,
            calculatedAt: new Date().toISOString()
        };

        // Lưu thông tin thuế
        let taxData = JSON.parse(localStorage.getItem('taxData')) || [];
        const existingIndex = taxData.findIndex(t =>
            t.employeeId === employeeId && t.month === month && t.year === year
        );

        if (existingIndex !== -1) {
            taxData[existingIndex] = taxInfo;
        } else {
            taxData.push(taxInfo);
        }
        localStorage.setItem('taxData', JSON.stringify(taxData));

        // Hiển thị kết quả chi tiết trong modal mới
        showTaxDetail(taxInfo);

        // Đóng modal tính thuế
        $('#taxCalculationModal').modal('hide');

        showNotification('Đã tính thuế thành công!');
    } catch (error) {
        console.error('Lỗi khi tính thuế:', error);
        showNotification(error.message || 'Có lỗi xảy ra khi tính thuế', 'danger');
    }
}

function calculateTaxByBrackets(taxableIncome) {
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    let breakdown = [];

    for (const bracket of TAX_BRACKETS) {
        const bracketIncome = Math.min(
            Math.max(0, remainingIncome),
            bracket.to - bracket.from
        );

        if (bracketIncome > 0) {
            const bracketTax = bracketIncome * bracket.rate;
            totalTax += bracketTax;

            breakdown.push({
                from: bracket.from,
                to: bracket.to,
                income: bracketIncome,
                rate: bracket.rate,
                tax: bracketTax
            });

            remainingIncome -= bracketIncome;
        }

        if (remainingIncome <= 0) break;
    }

    return { tax: totalTax, breakdown };
}

// Hàm hiển thị kết quả chi tiết
function displayDetailedTaxResult(totalIncome, totalDeductions, taxableIncome, tax, breakdown, deductionDetails) {
    const resultSection = document.getElementById('taxResultSection');
    resultSection.innerHTML = `
        <div class="result-section">
            <h5 class="mb-3">Chi tiết tính thuế</h5>
            
            <!-- Thu nhập -->
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">
                    <h6 class="mb-0">A. Tổng thu nhập: ${formatCurrency(totalIncome)}</h6>
                </div>
            </div>

            <!-- Giảm trừ -->
            <div class="card mb-3">
                <div class="card-header bg-info text-white">
                    <h6 class="mb-0">B. Các khoản giảm trừ: ${formatCurrency(totalDeductions)}</h6>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled">
                        <li>1. Giảm trừ bản thân: ${formatCurrency(DEDUCTION_TYPES.PERSONAL.amount)}</li>
                        <li>2. Giảm trừ người phụ thuộc: ${formatCurrency(deductionDetails.dependentDeductions)}</li>
                        <li>3. Bảo hiểm bắt buộc: ${formatCurrency(deductionDetails.insuranceDeductions)}</li>
                        <li>4. Giảm trừ khác: ${formatCurrency(deductionDetails.otherDeductions)}</li>
                    </ul>
                </div>
            </div>

            <!-- Thu nhập tính thuế -->
            <div class="card mb-3">
                <div class="card-header bg-warning">
                    <h6 class="mb-0">C. Thu nhập tính thuế (A - B): ${formatCurrency(taxableIncome)}</h6>
                </div>
            </div>

            <!-- Chi tiết tính thuế -->
            <div class="card">
                <div class="card-header bg-success text-white">
                    <h6 class="mb-0">D. Chi tiết tính thuế theo bậc</h6>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>Bậc thuế</th>
                                <th class="text-right">Thu nhập tính thuế</th>
                                <th class="text-right">Thuế suất</th>
                                <th class="text-right">Tiền thuế</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${breakdown.map(b => `
                                <tr>
                                    <td>${formatCurrency(b.from)} - ${formatCurrency(b.to)}</td>
                                    <td class="text-right">${formatCurrency(b.income)}</td>
                                    <td class="text-right">${(b.rate * 100).toFixed(1)}%</td>
                                    <td class="text-right">${formatCurrency(b.tax)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr class="table-info">
                                <td colspan="3"><strong>Tổng thuế TNCN phải nộp:</strong></td>
                                <td class="text-right"><strong>${formatCurrency(tax)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    `;

    resultSection.style.display = 'block';
    document.getElementById('saveTaxBtn').style.display = 'block';
}

function saveTaxCalculation() {
    const employeeId = document.getElementById('employeeId').value;
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const dependentsCount = parseInt(document.getElementById('dependentsCount').value) || 0;
    const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;
    const note = document.getElementById('taxNote').value;

    try {
        const salary = JSON.parse(localStorage.getItem('salaryData'))
            .find(s => s.employeeId === employeeId && s.month === month && s.year === year);

        if (!salary) throw new Error('Không tìm thấy thông tin lương');

        const totalDeductions = PERSONAL_DEDUCTION +
            (dependentsCount * DEPENDENT_DEDUCTION) +
            otherDeductions;

        const taxableIncome = Math.max(0, salary.totalIncome - totalDeductions);
        const { tax, breakdown } = calculateTaxByBrackets(taxableIncome);

        const taxData = JSON.parse(localStorage.getItem('taxData')) || [];
        const taxInfo = {
            employeeId,
            month,
            year,
            totalIncome: salary.totalIncome,
            totalDeductions,
            taxableIncome,
            tax,
            breakdown,
            dependentsCount,
            otherDeductions,
            note,
            calculatedDate: new Date().toISOString(),
            calculatedBy: JSON.parse(localStorage.getItem('currentUser')).id
        };

        // Cập nhật hoặc thêm mới
        const existingIndex = taxData.findIndex(t =>
            t.employeeId === employeeId &&
            t.month === month &&
            t.year === year
        );

        if (existingIndex !== -1) {
            taxData[existingIndex] = taxInfo;
        } else {
            taxData.push(taxInfo);
        }

        localStorage.setItem('taxData', JSON.stringify(taxData));

        $('#taxCalculationModal').modal('hide');
        loadEmployeeList();
        showNotification('Đã lưu thông tin thuế thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin thuế:', error);
        showNotification('Có lỗi xảy ra khi lưu thông tin thuế', 'danger');
    }
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
       
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Thêm hàm xuất báo cáo
function exportTaxReport() {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);
    const departmentId = document.getElementById('departmentSelect').value;

    const taxData = JSON.parse(localStorage.getItem('taxData')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Lọc dữ liệu theo điều kiện
    let reportData = taxData.filter(t => t.month === month && t.year === year);

    if (departmentId) {
        const department = JSON.parse(localStorage.getItem('departments'))
            .find(d => d.id === departmentId);
        if (department) {
            reportData = reportData.filter(t =>
                department.employees.includes(t.employeeId)
            );
        }
    }

    // Tạo nội dung báo cáo
    const reportContent = generateReportContent(reportData, employees);

    // Xuất file
    const blob = new Blob([reportContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bao-cao-thue-${month}-${year}.csv`;
    link.click();
}

function generateReportContent(taxData, employees) {
    // Tạo header
    let content = "Mã NV,Họ tên,Thu nhập,Giảm trừ,Thu nhập tính thuế,Thuế TNCN\n";

    // Thêm dữ liệu
    taxData.forEach(tax => {
        const employee = employees.find(e => e.id === tax.employeeId);
        if (employee) {
            content += `${employee.id},${employee.name},${tax.totalIncome},${tax.totalDeductions},${tax.taxableIncome},${tax.tax}\n`;
        }
    });

    return content;
}

// Hàm tính bảo hiểm
function calculateInsuranceDeductions(salary) {
    const maxInsuranceSalary = 20 * 4420000; // Mức lương đóng BH tối đa
    const baseSalary = Math.min(salary, maxInsuranceSalary);

    const rates = DEDUCTION_TYPES.INSURANCE.rates;
    return baseSalary * (rates.social + rates.health + rates.unemployment);
}

// Thêm hàm hiển thị chi tiết thuế
function showTaxDetail(taxInfo) {
    const content = `
        <div class="tax-detail">
            <div class="employee-info mb-4">
                <h6>Thông tin nhân viên</h6>
                <p><strong>Họ tên:</strong> ${taxInfo.employeeName}</p>
                <p><strong>Mã nhân viên:</strong> ${taxInfo.employeeId}</p>
                <p><strong>Phòng ban:</strong> ${taxInfo.departmentName}</p>
            </div>

            <div class="income-detail mb-4">
                <h6>Chi tiết thu nhập</h6>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Lương cơ bản</td>
                            <td class="text-right">${formatCurrency(taxInfo.basicSalary)}</td>
                        </tr>
                        <tr>
                            <td>Phụ cấp</td>
                            <td class="text-right">${formatCurrency(taxInfo.allowance)}</td>
                        </tr>
                        <tr>
                            <td>Thưởng</td>
                            <td class="text-right">${formatCurrency(taxInfo.bonus)}</td>
                        </tr>
                        <tr class="table-info">
                            <td><strong>Tổng thu nhập</strong></td>
                            <td class="text-right"><strong>${formatCurrency(taxInfo.totalIncome)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="deduction-detail mb-4">
                <h6>Các khoản giảm trừ</h6>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Giảm trừ bản thân</td>
                            <td class="text-right">${formatCurrency(taxInfo.personalDeduction)}</td>
                        </tr>
                        <tr>
                            <td>Giảm trừ người phụ thuộc</td>
                            <td class="text-right">${formatCurrency(taxInfo.dependentDeduction)}</td>
                        </tr>
                        <tr>
                            <td>Bảo hiểm bắt buộc</td>
                            <td class="text-right">${formatCurrency(taxInfo.insuranceDeduction)}</td>
                        </tr>
                        <tr class="table-info">
                            <td><strong>Tổng giảm trừ</strong></td>
                            <td class="text-right"><strong>${formatCurrency(taxInfo.totalDeduction)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="tax-calculation mb-4">
                <h6>Chi tiết tính thuế</h6>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Mức chịu thuế</th>
                            <th class="text-right">Thu nhập tính thuế</th>
                            <th class="text-right">Thuế suất</th>
                            <th class="text-right">Tiền thuế</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${taxInfo.taxBreakdown.map(item => `
                            <tr>
                                <td>${formatCurrency(item.from)} - ${formatCurrency(item.to)}</td>
                                <td class="text-right">${formatCurrency(item.taxableAmount)}</td>
                                <td class="text-right">${(item.rate * 100).toFixed(1)}%</td>
                                <td class="text-right">${formatCurrency(item.taxAmount)}</td>
                            </tr>
                        `).join('')}
                        <tr class="table-info">
                            <td colspan="3"><strong>Tổng thuế TNCN phải nộp</strong></td>
                            <td class="text-right"><strong>${formatCurrency(taxInfo.totalTax)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="final-result alert alert-success">
                <h6 class="mb-0">Thực lĩnh: ${formatCurrency(taxInfo.netIncome)}</h6>
            </div>
        </div>
    `;

    document.getElementById('taxResultContent').innerHTML = content;
    $('#taxResultModal').modal('show');

    // Thêm event listeners cho các nút
    document.getElementById('sendReportBtn').onclick = () => sendTaxReport(taxInfo);
    document.getElementById('downloadReportBtn').onclick = () => downloadTaxReport(taxInfo);
}

// Hàm gửi báo cáo cho nhân viên
async function sendTaxReport(taxInfo) {
    try {
        // Tạo thông báo cho nhân viên
        const notification = {
            id: `TAX_${Date.now()}`,
            type: 'tax_report',
            employeeId: taxInfo.employeeId,
            title: 'Báo cáo thuế TNCN',
            content: 'Kế toán đã gửi báo cáo thuế TNCN cho bạn',
            data: taxInfo,
            createdAt: new Date().toISOString(),
            isRead: false
        };

        // Lưu thông báo vào localStorage
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.push(notification);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        // Lưu báo cáo thuế
        let taxReports = JSON.parse(localStorage.getItem('taxReports')) || [];
        taxReports.push({
            ...taxInfo,
            reportId: notification.id,
            createdAt: notification.createdAt
        });
        localStorage.setItem('taxReports', JSON.stringify(taxReports));

        showNotification('Đã gửi báo cáo thuế cho nhân viên!');
    } catch (error) {
        console.error('Lỗi khi gửi báo cáo:', error);
        showNotification('Có lỗi xảy ra khi gửi báo cáo', 'danger');
    }
}

// Hàm tải xuống báo cáo
function downloadTaxReport(taxInfo) {
    try {
        // Thêm BOM để Excel nhận diện Unicode
        const BOM = '\uFEFF';

        // Tạo nội dung CSV với BOM
        let csvContent = BOM + 'BÁO CÁO THUẾ THU NHẬP CÁ NHÂN\n\n';

        // Thông tin nhân viên
        csvContent += `Nhân viên:,${taxInfo.employeeName}\n`;
        csvContent += `Mã nhân viên:,${taxInfo.employeeId}\n`;
        csvContent += `Phòng ban:,${taxInfo.departmentName}\n\n`;

        // Chi tiết thu nhập
        csvContent += 'CHI TIẾT THU NHẬP\n';
        csvContent += `Lương cơ bản:,${formatCurrency(taxInfo.basicSalary)}\n`;
        csvContent += `Phụ cấp:,${formatCurrency(taxInfo.allowance)}\n`;
        csvContent += `Thưởng:,${formatCurrency(taxInfo.bonus)}\n`;
        csvContent += `Tổng thu nhập:,${formatCurrency(taxInfo.totalIncome)}\n\n`;

        // Các khoản giảm trừ
        csvContent += 'CÁC KHOẢN GIẢM TRỪ\n';
        csvContent += `Giảm trừ bản thân:,${formatCurrency(taxInfo.personalDeduction)}\n`;
        csvContent += `Giảm trừ người phụ thuộc:,${formatCurrency(taxInfo.dependentDeduction)}\n`;
        csvContent += `Bảo hiểm bắt buộc:,${formatCurrency(taxInfo.insuranceDeduction)}\n`;
        csvContent += `Tổng giảm trừ:,${formatCurrency(taxInfo.totalDeduction)}\n\n`;

        // Chi tiết tính thuế
        csvContent += 'CHI TIẾT TÍNH THUẾ\n';
        csvContent += 'Mức chịu thuế,Thu nhập tính thuế,Thuế suất,Tiền thuế\n';
        taxInfo.taxBreakdown.forEach(item => {
            csvContent += `${formatCurrency(item.from)} - ${formatCurrency(item.to)},`;
            csvContent += `${formatCurrency(item.taxableAmount)},`;
            csvContent += `${(item.rate * 100).toFixed(1)}%,`;
            csvContent += `${formatCurrency(item.taxAmount)}\n`;
        });

        // Kết quả cuối cùng
        csvContent += `\nTổng thuế TNCN:,,,${formatCurrency(taxInfo.totalTax)}\n`;
        csvContent += `Thực lĩnh:,,,${formatCurrency(taxInfo.netIncome)}\n`;

        // Tạo Blob với encoding UTF-8
        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8;'
        });

        // Tạo tên file với timestamp
        const fileName = `Bao_cao_thue_${taxInfo.employeeId}_${formatDate(new Date())}.csv`;

        // Tạo và click link để tải file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        showNotification('Đã tải xuống báo cáo thuế!');
    } catch (error) {
        console.error('Lỗi khi tải báo cáo:', error);
        showNotification('Có lỗi xảy ra khi tải báo cáo', 'danger');
    }
}

// Hàm format ngày tháng
function formatDate(date) {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}${month}${year}`;
}

// Hàm format số tiền
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(amount);
}

// Thêm hàm xem chi tiết thuế đã tính
function viewTaxDetail(employeeId) {
    const month = parseInt(document.getElementById('monthSelect').value);
    const year = parseInt(document.getElementById('yearSelect').value);

    const taxData = JSON.parse(localStorage.getItem('taxData')) || [];
    const taxInfo = taxData.find(t =>
        t.employeeId === employeeId && t.month === month && t.year === year
    );

    if (!taxInfo) {
        showNotification('Không tìm thấy thông tin thuế', 'warning');
        return;
    }

    showTaxDetail(taxInfo);
} 