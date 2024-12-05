document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập và quyền truy cập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Load dữ liệu dashboard
    loadDashboardData();

    // Xử lý responsive menu
    document.getElementById('toggleMenu')?.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('shifted');
    });
});

function loadDashboardData() {
    // Dữ liệu mẫu
    const mockData = {
        totalEmployees: 150,
        totalDepartments: 8,
        totalSalary: 3500000000,
        totalTax: 350000000,
        recentActivities: [
            {
                type: 'salary',
                description: 'Đã nhập lương tháng 12/2023',
                time: '2 giờ trước'
            },
            {
                type: 'tax',
                description: 'Tính thuế TNCN tháng 12/2023',
                time: '3 giờ trước'
            },
            {
                type: 'department',
                description: 'Cập nhật thông tin Phòng Kỹ thuật',
                time: '1 ngày trước'
            },
            {
                type: 'deduction',
                description: 'Cập nhật mức giảm trừ gia cảnh',
                time: '2 ngày trước'
            },
            {
                type: 'report',
                description: 'Xuất báo cáo thuế tháng 11/2023',
                time: '3 ngày trước'
            }
        ]
    };

    // Cập nhật giao diện
    updateDashboardStats(mockData);
    updateRecentActivities(mockData.recentActivities);
}

function updateDashboardStats(data) {
    document.getElementById('totalEmployees').textContent = data.totalEmployees;
    document.getElementById('totalDepartments').textContent = data.totalDepartments;
    document.getElementById('totalSalary').textContent = formatCurrency(data.totalSalary);
    document.getElementById('totalTax').textContent = formatCurrency(data.totalTax);
}

function updateRecentActivities(activities) {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';

    activities.forEach(activity => {
        const icon = getActivityIcon(activity.type);
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item d-flex align-items-center';
        activityItem.innerHTML = `
            <div class="mr-3">
                <i class="${icon}"></i>
            </div>
            <div>
                <div class="font-weight-bold">${activity.description}</div>
                <small class="text-muted">${activity.time}</small>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function getActivityIcon(type) {
    const icons = {
        salary: 'fas fa-money-bill-wave text-success',
        tax: 'fas fa-file-invoice-dollar text-warning',
        department: 'fas fa-building text-primary',
        deduction: 'fas fa-percentage text-info',
        report: 'fas fa-file-alt text-secondary'
    };
    return icons[type] || 'fas fa-info-circle';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}