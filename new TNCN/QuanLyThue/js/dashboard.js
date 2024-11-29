document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Cập nhật ngày hiện tại
    updateCurrentDate();

    // Load dữ liệu
    loadDashboardData();

    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', logout);
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

function loadDashboardData() {
    // Giả lập dữ liệu - sau này sẽ lấy từ API
    const dashboardData = {
        salary: 15000000,
        tax: 1500000,
        netSalary: 13500000,
        notifications: [
            {
                title: "Bảng lương tháng 3/2024",
                message: "Bảng lương đã được cập nhật. Vui lòng kiểm tra.",
                date: "15/03/2024"
            },
            {
                title: "Cập nhật thông tin BHXH",
                message: "Vui lòng cập nhật thông tin BHXH trước ngày 20/03/2024",
                date: "10/03/2024"
            }
        ]
    };

    // Cập nhật thống kê
    updateStats(dashboardData);

    // Cập nhật thông báo
    updateNotifications(dashboardData.notifications);
}

function updateStats(data) {
    document.getElementById('currentSalary').textContent =
        formatMoney(data.salary) + ' VNĐ';
    document.getElementById('currentTax').textContent =
        formatMoney(data.tax) + ' VNĐ';
    document.getElementById('netSalary').textContent =
        formatMoney(data.netSalary) + ' VNĐ';
}

function updateNotifications(notifications) {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item">
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <span class="date">${notification.date}</span>
        </div>
    `).join('');
}

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../index.html';
}
