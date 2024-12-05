document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập và quyền truy cập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'truong_phong') {
        window.location.href = '../../index.html';
        return;
    }

    loadDashboardData();

    // Xử lý responsive menu
    document.getElementById('toggleMenu')?.addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
        document.querySelector('.main-content').classList.toggle('shifted');
    });
});

function loadDashboardData() {
    // Dữ liệu mẫu cho nhân viên (từ salary-report.js)
    const mockEmployees = [
        { id: 'NV001', name: 'Nguyễn Văn An' },
        { id: 'NV002', name: 'Trần Thị Bình' },
        { id: 'NV003', name: 'Lê Văn Cường' },
        { id: 'NV004', name: 'Phạm Thị Dung' },
        { id: 'NV005', name: 'Hoàng Văn Em' }
    ];

    // Dữ liệu mẫu cho lương (từ salary-report.js)
    const mockSalaryData = {
        2023: {
            12: [
                {
                    employeeId: 'NV001',
                    basicSalary: 15000000,
                    overtime: 2000000,
                    bonus: 1000000,
                    tax: 200000
                },
                {
                    employeeId: 'NV002',
                    basicSalary: 18000000,
                    overtime: 1500000,
                    bonus: 2000000,
                    tax: 250000
                },
                {
                    employeeId: 'NV003',
                    basicSalary: 20000000,
                    overtime: 2500000,
                    bonus: 1500000,
                    tax: 300000
                },
                {
                    employeeId: 'NV004',
                    basicSalary: 16000000,
                    overtime: 1800000,
                    bonus: 1200000,
                    tax: 220000
                },
                {
                    employeeId: 'NV005',
                    basicSalary: 17000000,
                    overtime: 2100000,
                    bonus: 1300000,
                    tax: 230000
                }
            ]
        }
    };

    // Tính toán các số liệu tổng hợp
    const currentMonth = mockSalaryData[2023][12];
    let totalSalary = 0;
    let totalTax = 0;

    currentMonth.forEach(salary => {
        totalSalary += salary.basicSalary + salary.overtime + salary.bonus;
        totalTax += salary.tax;
    });

    // Dữ liệu hoạt động gần đây
    const recentActivities = [
        {
            type: 'salary',
            description: 'Đã cập nhật bảng lương tháng 12/2023',
            time: '2 giờ trước'
        },
        {
            type: 'tax',
            description: 'Hoàn thành quyết toán thuế TNCN tháng 12/2023',
            time: '1 ngày trước'
        },
        {
            type: 'employee',
            description: 'Cập nhật thông tin nhân viên NV003',
            time: '2 ngày trước'
        },
        {
            type: 'report',
            description: 'Xuất báo cáo lương tháng 12/2023',
            time: '2 ngày trước'
        },
        {
            type: 'tax',
            description: 'Kiểm tra báo cáo thuế quý 4/2023',
            time: '3 ngày trước'
        }
    ];

    // Cập nhật giao diện
    updateDashboardStats({
        totalEmployees: mockEmployees.length,
        totalSalary: totalSalary,
        totalTax: totalTax,
        completedReports: 15 // Số báo cáo đã hoàn thành (giả định)
    });

    updateRecentActivities(recentActivities);
}

function updateDashboardStats(data) {
    document.getElementById('totalEmployees').textContent = data.totalEmployees;
    document.getElementById('totalSalary').textContent = formatCurrency(data.totalSalary);
    document.getElementById('totalTax').textContent = formatCurrency(data.totalTax);
    document.getElementById('completedReports').textContent = data.completedReports;
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
        employee: 'fas fa-user-plus text-primary',
        tax: 'fas fa-file-invoice-dollar text-warning',
        report: 'fas fa-file-alt text-info'
    };
    return icons[type] || 'fas fa-info-circle';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}
