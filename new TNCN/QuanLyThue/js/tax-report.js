document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật ngày hiện tại
    updateCurrentDate();

    // Load thông tin quyết toán thuế
    loadTaxReportInfo();

    // Xử lý sự kiện tính thuế
    document.getElementById('calculateTaxBtn').addEventListener('click', calculateTax);
});

function updateCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    document.getElementById('currentDate').textContent =
        currentDate.toLocaleDateString('vi-VN', options);
}

function loadTaxReportInfo() {
    // Giả lập dữ liệu quyết toán thuế - sau này sẽ lấy từ API
    const taxReportData = {
        totalIncome: 180000000, // Tổng thu nhập trong năm
        totalTaxPaid: 18000000, // Tổng thuế đã nộp
        taxDue: 0 // Thuế TNCN phải nộp
    };

    // Cập nhật thông tin quyết toán thuế
    document.getElementById('totalIncome').textContent = formatMoney(taxReportData.totalIncome) + ' VNĐ';
    document.getElementById('totalTaxPaid').textContent = formatMoney(taxReportData.totalTaxPaid) + ' VNĐ';
    document.getElementById('taxDue').textContent = formatMoney(taxReportData.taxDue) + ' VNĐ';
}

function calculateTax() {
    // Giả lập tính thuế - sau này sẽ thay đổi theo quy định
    const totalIncome = 180000000; // Tổng thu nhập trong năm
    let taxDue = 0;

    // Tính thuế TNCN (giả lập)
    if (totalIncome > 120000000) {
        taxDue = (totalIncome - 120000000) * 0.1; // Giả lập thuế 10% cho phần thu nhập trên 120 triệu
    }

    // Cập nhật thuế phải nộp
    document.getElementById('taxDue').textContent = formatMoney(taxDue) + ' VNĐ';
}

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

// QuanLyThue/js/tax-report.js

// Hàm để cập nhật thông tin thuế dựa trên năm đã chọn
function updateTaxReport(year) {
    // Giả lập dữ liệu cho các năm
    const taxData = {
        '2023': {
            totalIncome: 120000000,
            totalTaxPaid: 12000000,
            taxDue: 10000000,
            incomeDetails: [
                'Thu nhập từ lương: 100000000 VNĐ',
                'Thu nhập từ kinh doanh: 20000000 VNĐ',
                'Thu nhập khác: 0 VNĐ'
            ],
            deductionDetails: [
                'Giảm trừ gia cảnh: 5000000 VNĐ',
                'Giảm trừ bảo hiểm: 2000000 VNĐ'
            ]
        },
        '2022': {
            totalIncome: 110000000,
            totalTaxPaid: 11000000,
            taxDue: 9000000,
            incomeDetails: [
                'Thu nhập từ lương: 90000000 VNĐ',
                'Thu nhập từ kinh doanh: 20000000 VNĐ',
                'Thu nhập khác: 0 VNĐ'
            ],
            deductionDetails: [
                'Giảm trừ gia cảnh: 4000000 VNĐ',
                'Giảm trừ bảo hiểm: 1500000 VNĐ'
            ]
        },
        // Thêm dữ liệu cho các năm khác nếu cần
    };

    // Cập nhật thông tin thuế
    const data = taxData[year];
    document.getElementById('totalIncome').textContent = formatMoney(data.totalIncome) + ' VNĐ';
    document.getElementById('totalTaxPaid').textContent = formatMoney(data.totalTaxPaid) + ' VNĐ';
    document.getElementById('taxDue').textContent = formatMoney(data.taxDue) + ' VNĐ';

    // Cập nhật chi tiết thu nhập
    const incomeDetails = document.getElementById('incomeDetails');
    incomeDetails.innerHTML = '';
    data.incomeDetails.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        incomeDetails.appendChild(li);
    });

    // Cập nhật chi tiết giảm trừ
    const deductionDetails = document.getElementById('deductionDetails');
    deductionDetails.innerHTML = '';
    data.deductionDetails.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        deductionDetails.appendChild(li);
    });
}

// Hàm định dạng tiền tệ
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

// Sự kiện khi chọn năm
document.getElementById('yearSelect').addEventListener('change', function () {
    const selectedYear = this.value;
    updateTaxReport(selectedYear);
});

// Gọi hàm để cập nhật thông tin cho năm mặc định
updateTaxReport('2023');

// Hàm hiển thị chi tiết quyết toán
function showDetails(year) {
    const taxData = {
        '2023': {
            totalIncome: 120000000,
            totalTaxPaid: 12000000,
            incomeDetails: [
                'Thu nhập từ lương: 100000000 VNĐ',
                'Thu nhập từ kinh doanh: 20000000 VNĐ',
                'Thu nhập khác: 0 VNĐ'
            ],
            deductionDetails: [
                'Giảm trừ gia cảnh: 5000000 VNĐ',
                'Giảm trừ bảo hiểm: 2000000 VNĐ'
            ]
        },
        '2022': {
            totalIncome: 110000000,
            totalTaxPaid: 11000000,
            incomeDetails: [
                'Thu nhập từ lương: 90000000 VNĐ',
                'Thu nhập từ kinh doanh: 20000000 VNĐ',
                'Thu nhập khác: 0 VNĐ'
            ],
            deductionDetails: [
                'Giảm trừ gia cảnh: 4000000 VNĐ',
                'Giảm trừ bảo hiểm: 1500000 VNĐ'
            ]
        },
    };

    const data = taxData[year];
    document.getElementById('detailYear').textContent = year;
    document.getElementById('detailTotalIncome').textContent = formatMoney(data.totalIncome) + ' VNĐ';
    document.getElementById('detailTotalTaxPaid').textContent = formatMoney(data.totalTaxPaid) + ' VNĐ';

    // Cập nhật chi tiết thu nhập
    const detailIncomeDetails = document.getElementById('detailIncomeDetails');
    detailIncomeDetails.innerHTML = '';
    data.incomeDetails.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailIncomeDetails.appendChild(li);
    });

    // Cập nhật chi tiết giảm trừ
    const detailDeductionDetails = document.getElementById('detailDeductionDetails');
    detailDeductionDetails.innerHTML = '';
    data.deductionDetails.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailDeductionDetails.appendChild(li);
    });

    // Hiển thị modal chi tiết
    document.getElementById('detailsModal').style.display = 'block';
}

// Hàm đóng modal chi tiết
function closeDetails() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Hàm xuất báo cáo ra file Excel
document.getElementById('exportExcelBtn').addEventListener('click', function () {
    // Tạo file Excel (giả lập)
    alert('Xuất báo cáo ra file Excel thành công!');
});
