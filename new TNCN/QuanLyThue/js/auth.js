// Dữ liệu người dùng mẫu
const users = [
    {
        username: "nhanvien1",
        password: "123456",
        role: "nhan_vien",
        fullName: "Nguyễn Văn A"
    },
    {
        username: "nhom2",
        password: "123456",
        role: "nhan_vien",
        fullName: "Nguyễn Văn A"
    },
    {
        username: "truongphong1",
        password: "123456",
        role: "truong_phong",
        fullName: "Trần Văn B"
    },
    {
        username: "ketoan1",
        password: "123456",
        role: "ke_toan",
        fullName: "Lê Thị C"
    }
];

// Xử lý đăng nhập
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Kiểm tra đăng nhập
    const user = users.find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    if (user) {
        // Lưu thông tin người dùng
        localStorage.setItem('currentUser', JSON.stringify({
            username: user.username,
            role: user.role,
            fullName: user.fullName
        }));

        // Chuyển hướng theo vai trò
        switch (user.role) {
            case 'nhan_vien':
                window.location.href = 'pages/nhan-vien/dashboard.html';
                break;
            case 'truong_phong':
                window.location.href = 'pages/truong-phong/dashboard.html';
                break;
            case 'ke_toan':
                window.location.href = 'pages/ke-toan/dashboard.html';
                break;
        }
    } else {
        alert('Thông tin đăng nhập không chính xác!');
    }
});
