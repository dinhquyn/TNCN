// Import các hàm tiện ích và hằng số
import { DEDUCTION_TYPES, getDependentsByEmployeeId, getSalaryDataByEmployeeId, getTaxDataByEmployeeId } from './database.js';
import { formatCurrency, getCurrentUser, logout } from './utils.js';

// Thêm biến để lưu trữ dữ liệu
let allSalaryData = [];
let allTaxData = [];
let dependentData = [];

// Thêm biến để quản lý modal
let currentSalaryData = null;
let currentTaxData = null;

// Định nghĩa showDetails trong global scope
window.showDetails = function (salaryId) {
    const salary = allSalaryData.find(s => s.id === salaryId);
    const date = new Date(salary.date);
    const tax = allTaxData.find(t => {
        const taxDate = new Date(t.date);
        return taxDate.getMonth() === date.getMonth() &&
            taxDate.getFullYear() === date.getFullYear();
    });

    // Chi tiết lương
    document.getElementById('detailBaseSalary').textContent = formatCurrency(salary.baseSalary);
    document.getElementById('detailAllowance').textContent = formatCurrency(salary.allowance);
    document.getElementById('detailOvertimePay').textContent = formatCurrency(salary.overtimePay);
    document.getElementById('detailBonus').textContent = formatCurrency(salary.bonus || 0);

    const totalIncome = salary.baseSalary + salary.allowance +
        salary.overtimePay + (salary.bonus || 0);
    document.getElementById('detailTotalIncome').textContent = formatCurrency(totalIncome);

    // Chi tiết bảo hiểm
    document.getElementById('detailHealthInsurance').textContent =
        formatCurrency(salary.insurance.health);
    document.getElementById('detailSocialInsurance').textContent =
        formatCurrency(salary.insurance.social);
    document.getElementById('detailUnemploymentInsurance').textContent =
        formatCurrency(salary.insurance.unemployment);

    const totalInsurance = salary.insurance.health +
        salary.insurance.social +
        salary.insurance.unemployment;
    document.getElementById('detailTotalInsurance').textContent =
        formatCurrency(totalInsurance);

    if (tax) {
        // Chi tiết thuế
        document.getElementById('detailPersonalDeduction').textContent =
            formatCurrency(tax.deductions.personal);
        document.getElementById('detailDependentDeduction').textContent =
            formatCurrency(tax.deductions.dependent);
        document.getElementById('detailCharityDeduction').textContent =
            formatCurrency(tax.deductions.charity || 0);

        const totalDeductions = Object.values(tax.deductions).reduce((sum, val) => sum + val, 0);
        document.getElementById('detailTotalDeduction').textContent =
            formatCurrency(totalDeductions);

        document.getElementById('detailTaxableIncome').textContent =
            formatCurrency(tax.taxableIncome);
        document.getElementById('detailTaxAmount').textContent =
            formatCurrency(tax.taxAmount);

        // Tính và hiển thị thực lĩnh
        const finalAmount = totalIncome - totalInsurance - tax.taxAmount;
        document.getElementById('detailFinalAmount').textContent =
            formatCurrency(finalAmount);
    }

    // Hiển thị ghi chú
    document.getElementById('detailNote').textContent = salary.note || 'Không có ghi chú';

    // Hiển thị modal
    document.getElementById('detailModal').style.display = 'block';
};

document.addEventListener('DOMContentLoaded', async function () {
    // Hiển thị ngày hiện tại
    const currentDateElement = document.getElementById('currentDate');
    const today = new Date();
    currentDateElement.textContent = today.toLocaleDateString('vi-VN');

    // Lấy thông tin người dùng hiện tại
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = '../../index.html';
        return;
    }

    // Hiển thị tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Thêm xử lý cho bộ lọc
    initializeFilters();

    try {
        // Lấy tất cả dữ liệu cần thiết
        const [salaryData, taxData, dependents] = await Promise.all([
            getSalaryDataByEmployeeId(currentUser.id),
            getTaxDataByEmployeeId(currentUser.id),
            getDependentsByEmployeeId(currentUser.id)
        ]);

        allSalaryData = salaryData;
        allTaxData = taxData;
        dependentData = dependents;

        console.log('Loaded data:', { salaryData, taxData, dependents });
        filterData();
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        alert('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
    }
});

function initializeFilters() {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();

    // Thêm các năm gần đây vào select
    for (let year = currentYear; year >= currentYear - 5; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Thêm event listeners cho bộ lọc
    document.getElementById('monthSelect').addEventListener('change', filterData);
    yearSelect.addEventListener('change', filterData);
}

function filterData() {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const selectedMonth = monthSelect.value;
    const selectedYear = parseInt(yearSelect.value);
    const tableBody = document.querySelector('#salaryTaxTable tbody');

    tableBody.innerHTML = '';

    // Lọc dữ liệu theo tháng và năm
    allSalaryData.forEach(salary => {
        const date = new Date(salary.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if ((selectedMonth === 'all' || month === parseInt(selectedMonth))
            && year === selectedYear) {
            // Tìm dữ liệu thuế tương ứng
            const taxData = allTaxData.find(tax => {
                const taxDate = new Date(tax.date);
                return taxDate.getMonth() === date.getMonth() &&
                    taxDate.getFullYear() === date.getFullYear();
            });

            const row = createTableRow(salary, taxData);
            tableBody.appendChild(row);
        }
    });
}

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
        <td>${formatCurrency(salary.baseSalary)}</td>
        <td>${formatCurrency(salary.allowance)}</td>
        <td>${formatCurrency(salary.overtimePay)}</td>
        <td>${formatCurrency(salary.bonus || 0)}</td>
        <td>${formatCurrency(totalIncome)}</td>
        <td>${formatCurrency(totalInsurance)}</td>
        <td>${formatCurrency(tax ? tax.taxableIncome : 0)}</td>
        <td>${formatCurrency(tax ? tax.taxAmount : 0)}</td>
        <td>${formatCurrency(finalAmount)}</td>
        <td><span class="status status-${salary.status === 'Đã duyệt' ? 'approved' : 'pending'}">${salary.status}</span></td>
        <td><button class="detail-btn" onclick="showDetails('${salary.id}')">Chi tiết</button></td>
    `;

    return row;
}

function calculateInsuranceDeduction(baseSalary) {
    const { HEALTH, SOCIAL, UNEMPLOYMENT } = DEDUCTION_TYPES.INSURANCE;
    return baseSalary * (HEALTH + SOCIAL + UNEMPLOYMENT);
}

// Thêm event listener cho nút đóng modal
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('detailModal').style.display = 'none';
});

// Đóng modal khi click bên ngoài
window.addEventListener('click', function (event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Thêm hàm hiển thị chi tiết
function showSalaryDetail(month) {
    const year = document.getElementById('yearSelect').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const monthData = mockSalaryData[year]?.[month]?.find(item => item.employeeId === currentUser.employeeId);

    if (!monthData) return;

    const content = `
        <div class="salary-details">
            <h4 class="mb-4">Chi tiết lương tháng ${month}/${year}</h4>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="text-primary">Thu nhập</h5>
                    <table class="table table-sm">
                        <tr>
                            <td>Lương cơ bản:</td>
                            <td class="text-right">${formatCurrency(monthData.basicSalary)}</td>
                        </tr>
                        <tr>
                            <td>Làm thêm giờ:</td>
                            <td class="text-right">${formatCurrency(monthData.overtime)}</td>
                        </tr>
                        <tr>
                            <td>Thưởng:</td>
                            <td class="text-right">${formatCurrency(monthData.bonus)}</td>
                        </tr>
                        <tr class="table-info">
                            <td><strong>Tổng thu nhập:</strong></td>
                            <td class="text-right"><strong>${formatCurrency(monthData.basicSalary + monthData.overtime + monthData.bonus)}</strong></td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h5 class="text-danger">Các khoản giảm trừ</h5>
                    <table class="table table-sm">
                        <tr>
                            <td>BHXH (8%):</td>
                            <td class="text-right">${formatCurrency(monthData.insurance.social)}</td>
                        </tr>
                        <tr>
                            <td>BHYT (1.5%):</td>
                            <td class="text-right">${formatCurrency(monthData.insurance.health)}</td>
                        </tr>
                        <tr>
                            <td>BHTN (1%):</td>
                            <td class="text-right">${formatCurrency(monthData.insurance.unemployment)}</td>
                        </tr>
                        <tr>
                            <td>Thuế TNCN:</td>
                            <td class="text-right">${formatCurrency(monthData.tax)}</td>
                        </tr>
                        <tr class="table-danger">
                            <td><strong>Tổng giảm trừ:</strong></td>
                            <td class="text-right"><strong>${formatCurrency(
        monthData.insurance.social +
        monthData.insurance.health +
        monthData.insurance.unemployment +
        monthData.tax
    )}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="alert alert-success">
                        <h5 class="mb-0">Thực lĩnh: ${formatCurrency(monthData.netSalary)}</h5>
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

    document.getElementById('detailModalContent').innerHTML = content;
    $('#detailModal').modal('show');
}

// Sửa lại phần hiển thị bảng để chỉ hiện nút xem chi tiết
function updateSalaryTable(data) {
    const tableBody = document.getElementById('salaryTableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="5" class="text-center">Không có dữ liệu</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    data.forEach(item => {
        const totalIncome = item.basicSalary + item.overtime + item.bonus;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Tháng ${item.month}</td>
            <td>${formatCurrency(totalIncome)}</td>
            <td>${formatCurrency(item.tax)}</td>
            <td>${formatCurrency(item.netSalary)}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="showSalaryDetail(${item.month})">
                    <i class="fas fa-eye"></i> Chi tiết
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
