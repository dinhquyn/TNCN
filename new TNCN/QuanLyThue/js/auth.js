// Dữ liệu mẫu cho người dùng
const mockUsers = [
    {
        id: 'NV001',
        username: 'nhanvien01',
        password: '123456a@A',
        fullName: 'Hoàng Trọng Đức',
        role: 'nhan_vien',
        department: 'KT001',
        email: 'nva@company.com'
    },
    {
        id: 'TP001',
        username: 'truongphong01',
        password: '123456a@A',
        fullName: 'Nguyễn Đức Hà',
        role: 'truong_phong',
        department: 'KT001',
        email: 'ttb@company.com'
    },
    {
        id: 'KT001',
        username: 'ketoan01',
        password: '123456a@A',
        fullName: 'Lê Thị C',
        role: 'ke_toan',
        department: 'KT001',
        email: 'ltc@company.com'
    }
];

// Khởi tạo dữ liệu người dùng khi trang web được load
function initializeUserData() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(mockUsers));
    }
}

// Xử lý đăng nhập
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        // Kiểm tra thông tin đăng nhập
        const users = JSON.parse(localStorage.getItem('users')) || mockUsers;
        const user = users.find(u =>
            u.username === username &&
            u.password === password &&
            u.role === role
        );

        if (!user) {
            showError('Thông tin đăng nhập không chính xác');
            return;
        }

        // Lưu thông tin người dùng đã đăng nhập
        const currentUser = {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
            department: user.department,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Chuyển hướng theo vai trò
        redirectByRole(user.role);

    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        showError('Có lỗi xảy ra khi đăng nhập');
    }
});

// Hàm chuyển hướng theo vai trò
function redirectByRole(role) {
    const roleRoutes = {
        'nhan_vien': './pages/nhan-vien/dashboard.html',
        'truong_phong': './pages/truong-phong/dashboard.html',
        'ke_toan': './pages/ke-toan/dashboard.html'
    };

    const route = roleRoutes[role];
    if (route) {
        window.location.href = route;
    } else {
        showError('Vai trò không hợp lệ');
    }
}

// Hàm kiểm tra đăng nhập
function checkAuth(allowedRoles) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        window.location.href = '/index.html';
        return false;
    }
    return true;
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/index.html';
}

// Hiển thị lỗi
function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Khởi tạo dữ liệu khi trang được load
document.addEventListener('DOMContentLoaded', function () {
    initializeUserData();

    // Xóa thông tin người dùng cũ nếu đang ở trang đăng nhập
    if (window.location.pathname.includes('index.html')) {
        localStorage.removeItem('currentUser');
    }
});

// Export các hàm cần thiết
export {
    checkAuth,
    logout,
    showError
};
