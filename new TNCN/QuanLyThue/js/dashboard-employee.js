// Dữ liệu giả lập cho dashboard
const mockDashboardData = {
    currentMonth: {
        salary: 15000000,
        tax: 1250000,
        dependents: [
            { name: "Nguyễn Thị B", relationship: "Vợ" },
            { name: "Nguyễn Văn C", relationship: "Con" }
        ]
    },
    notifications: [
        {
            id: 1,
            title: "Lương tháng 3/2024 đã được cập nhật",
            content: "Bạn có thể xem chi tiết trong phần báo cáo lương",
            date: "2024-03-25",
            isRead: false
        },
        {
            id: 2,
            title: "Nhắc nhở: Cập nhật thông tin người phụ thuộc",
            content: "Vui lòng cập nhật thông tin người phụ thuộc trước ngày 31/03/2024",
            date: "2024-03-20",
            isRead: true
        },
        {
            id: 3,
            title: "Quyết toán thuế năm 2023",
            content: "Báo cáo quyết toán thuế năm 2023 đã sẵn sàng để xem",
            date: "2024-03-15",
            isRead: true
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    // Load thông tin nhân viên
    document.getElementById('employeeName').textContent = mockEmployeeProfile.fullName;

    // Load thống kê
    loadDashboardStats();

    // Load thông báo
    loadNotifications();

    // Xử lý đăng xuất
    document.getElementById('logoutBtn').addEventListener('click', function () {
        window.location.href = '../../index.html';
    });

    // Xử lý responsive menu
    document.getElementById('toggleMenu')?.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('shifted');
    });
});

function loadDashboardStats() {
    // Hiển thị thống kê
    document.getElementById('totalSalary').textContent = formatCurrency(mockDashboardData.currentMonth.salary);
    document.getElementById('totalTax').textContent = formatCurrency(mockDashboardData.currentMonth.tax);
    document.getElementById('dependentCount').textContent = mockDashboardData.currentMonth.dependents.length;
}

function loadNotifications() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';

    mockDashboardData.notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.isRead ? '' : 'bg-light'}`;
        notificationItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="mb-1">${notification.title}</h6>
                    <p class="mb-1">${notification.content}</p>
                    <small class="date">${formatDate(notification.date)}</small>
                </div>
                ${!notification.isRead ? '<span class="badge badge-primary">Mới</span>' : ''}
            </div>
        `;
        notificationList.appendChild(notificationItem);
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
} 