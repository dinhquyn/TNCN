const mockEmployeeData = {
    // Thông tin nhân viên kế toán
    employees: [
        {
            id: 'KT001',
            name: 'Lê Thị C',
            email: 'lethic@company.com',
            phone: '0987654321',
            birthDate: '1990-05-15',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            position: 'Kế toán viên',
            department: 'KT001',
            joinDate: '2020-01-01',
            role: 'ke_toan'
        }
    ],
    // Thông tin phòng ban
    departments: [
        {
            id: 'KT001',
            name: 'Phòng Kế Toán',
            description: 'Phòng Kế Toán và Tài Chính',
            manager: 'KT001',
            employees: ['KT001']
        }
    ],
    // Thông tin đăng nhập
    users: [
        {
            id: 'KT001',
            username: 'ketoan01',
            password: '123456',
            role: 'ke_toan',
            fullName: 'Lê Thị C',
            email: 'lethic@company.com'
        }
    ]
};

function initializeMockData() {
    // Khởi tạo dữ liệu người dùng nếu chưa có
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(mockEmployeeData.users));
    }

    // Khởi tạo dữ liệu nhân viên nếu chưa có
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(mockEmployeeData.employees));
    }

    // Khởi tạo dữ liệu phòng ban nếu chưa có
    if (!localStorage.getItem('departments')) {
        localStorage.setItem('departments', JSON.stringify(mockEmployeeData.departments));
    }

    // Khởi tạo người dùng hiện tại nếu chưa có
    if (!localStorage.getItem('currentUser')) {
        const defaultUser = {
            id: 'KT001',
            username: 'ketoan01',
            role: 'ke_toan',
            fullName: 'Lê Thị C'
        };
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
}

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

        // Load thông tin cá nhân
        loadUserProfile();

        // Thêm event listeners
        document.getElementById('editProfileBtn').addEventListener('click', enableEditMode);
        document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
        document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
        document.getElementById('changePasswordBtn').addEventListener('click', changePassword);

    } catch (error) {
        console.error('Lỗi khởi tạo:', error);
        showNotification('Có lỗi khi khởi tạo ứng dụng', 'danger');
    }
});

function loadUserProfile() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            throw new Error('Không tìm thấy thông tin đăng nhập');
        }

        // Lấy thông tin nhân viên từ localStorage hoặc dữ liệu mẫu
        let employees = JSON.parse(localStorage.getItem('employees'));
        if (!employees || employees.length === 0) {
            employees = mockEmployeeData.employees;
            localStorage.setItem('employees', JSON.stringify(employees));
        }

        const employee = employees.find(emp => emp.id === currentUser.id);
        if (!employee) {
            throw new Error('Không tìm thấy thông tin nhân viên');
        }

        // Cập nhật thông tin hiển thị trên header
        document.getElementById('fullNameDisplay').textContent = employee.name || 'Lê Thị C';
        document.getElementById('positionDisplay').textContent = employee.position || 'Kế toán viên';
        document.getElementById('departmentDisplay').textContent = getDepartmentName(employee.department) || 'Phòng Kế Toán';

        // Điền thông tin vào form
        document.getElementById('employeeId').value = employee.id || 'KT001';
        document.getElementById('fullName').value = employee.name || 'Lê Thị C';
        document.getElementById('email').value = employee.email || 'lethic@company.com';
        document.getElementById('phone').value = employee.phone || '0987654321';
        document.getElementById('birthDate').value = employee.birthDate || '1990-05-15';
        document.getElementById('address').value = employee.address || '123 Đường ABC, Quận 1, TP.HCM';

        // Cập nhật tên người dùng trên sidebar
        document.getElementById('userName').textContent = employee.name || 'Lê Thị C';

    } catch (error) {
        console.error('Lỗi khi load thông tin:', error);
        showNotification('Có lỗi khi tải thông tin cá nhân', 'danger');
    }
}

function getDepartmentName(departmentId) {
    try {
        let departments = JSON.parse(localStorage.getItem('departments'));
        if (!departments || departments.length === 0) {
            departments = mockEmployeeData.departments;
            localStorage.setItem('departments', JSON.stringify(departments));
        }

        const department = departments.find(d => d.id === departmentId);
        return department ? department.name : 'Phòng Kế Toán';
    } catch (error) {
        console.error('Lỗi khi lấy tên phòng ban:', error);
        return 'Phòng Kế Toán';
    }
}

function enableEditMode() {
    // Enable các trường có thể chỉnh sửa
    document.getElementById('phone').disabled = false;
    document.getElementById('birthDate').disabled = false;
    document.getElementById('address').disabled = false;

    // Hiển thị nút lưu/hủy
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'inline-block';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
}

function cancelEdit() {
    // Disable các trường
    document.getElementById('phone').disabled = true;
    document.getElementById('birthDate').disabled = true;
    document.getElementById('address').disabled = true;

    // Hiển thị lại nút chỉnh sửa
    document.getElementById('editProfileBtn').style.display = 'inline-block';
    document.getElementById('saveProfileBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';

    // Load lại thông tin
    loadUserProfile();
}

async function saveProfile() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        const employeeIndex = employees.findIndex(emp => emp.id === currentUser.id);

        if (employeeIndex === -1) {
            throw new Error('Không tìm thấy thông tin nhân viên');
        }

        // Cập nhật thông tin
        employees[employeeIndex] = {
            ...employees[employeeIndex],
            phone: document.getElementById('phone').value,
            birthDate: document.getElementById('birthDate').value,
            address: document.getElementById('address').value,
            lastModified: new Date().toISOString()
        };

        // Lưu vào localStorage
        localStorage.setItem('employees', JSON.stringify(employees));

        // Disable form và cập nhật giao diện
        cancelEdit();
        loadUserProfile();

        showNotification('Đã cập nhật thông tin thành công!');
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
        showNotification('Có lỗi xảy ra khi cập nhật thông tin', 'danger');
    }
}

async function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    try {
        // Kiểm tra mật khẩu
        if (!currentPassword || !newPassword || !confirmPassword) {
            throw new Error('Vui lòng điền đầy đủ thông tin');
        }

        if (newPassword !== confirmPassword) {
            throw new Error('Mật khẩu mới không khớp');
        }

        if (newPassword.length < 6) {
            throw new Error('Mật khẩu mới phải có ít nhất 6 ký tự');
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex === -1) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        if (users[userIndex].password !== currentPassword) {
            throw new Error('Mật khẩu hiện tại không đúng');
        }

        // Cập nhật mật khẩu
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        // Reset form
        document.getElementById('passwordForm').reset();

        showNotification('Đã đổi mật khẩu thành công!');
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        showNotification(error.message || 'Có lỗi xảy ra khi đổi mật khẩu', 'danger');
    }
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