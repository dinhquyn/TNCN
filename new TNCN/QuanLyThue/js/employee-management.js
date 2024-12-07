// Dữ liệu giả lập
const mockEmployees = [
    {
        employeeId: "NV001",
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        phone: "0901234567",
        address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
        taxId: "8751234567",
        status: true
    },
    {
        employeeId: "NV002",
        name: "Trần Thị Bình",
        email: "tranthibinh@gmail.com",
        phone: "0912345678",
        address: "456 Lê Lợi, Quận 1, TP.HCM",
        taxId: "8767891234",
        status: true
    },
    {
        employeeId: "NV003",
        name: "Phạm Văn Cường",
        email: "phamvancuong@gmail.com",
        phone: "0923456789",
        address: "789 Điện Biên Phủ, Quận 3, TP.HCM",
        taxId: "8789123456",
        status: false
    }
];

// Kiểm tra đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', function () {
    // Load danh sách nhân viên khi trang được tải
    displayEmployees(mockEmployees);
});

// Hiển thị danh sách nhân viên trong bảng
function displayEmployees(employees) {
    const tableBody = document.getElementById('employeeTableBody');
    if (!tableBody) {
        console.error('Không tìm thấy bảng danh sách nhân viên');
        return;
    }

    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name || ''}</td>
            <td>${employee.email || ''}</td>
            <td>${employee.phone || ''}</td>
            <td>${employee.address || ''}</td>
            <td>${employee.taxId || ''}</td>
            <td>
                <span class="badge badge-${employee.status ? 'success' : 'danger'}">
                    ${employee.status ? 'Đang làm việc' : 'Đã nghỉ việc'}
                </span>
            </td>
            <td class="text-center">
                <button class="btn btn-sm btn-primary edit-btn" data-id="${employee.employeeId}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${employee.employeeId}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Thêm event listeners cho các nút
    addButtonEventListeners();
}

// Thêm các event listeners cho các nút
function addButtonEventListeners() {
    // Event listeners cho nút chỉnh sửa
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const employeeId = this.getAttribute('data-id');
            openEditModal(employeeId);
        });
    });

    // Event listeners cho nút xóa
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const employeeId = this.getAttribute('data-id');
            confirmDelete(employeeId);
        });
    });
}

// Mở modal chỉnh sửa và điền thông tin nhân viên
function openEditModal(employeeId) {
    const employee = mockEmployees.find(emp => emp.employeeId === employeeId);
    if (employee) {
        // Điền thông tin vào form
        document.getElementById('editEmployeeId').value = employee.employeeId;
        document.getElementById('editName').value = employee.name;
        document.getElementById('editEmail').value = employee.email;
        document.getElementById('editPhone').value = employee.phone;
        document.getElementById('editAddress').value = employee.address;
        document.getElementById('editTaxId').value = employee.taxId;

        // Hiển thị modal
        $('#editEmployeeModal').modal('show');
    }
}

// Xử lý sự kiện lưu thay đổi
document.getElementById('saveEditBtn').addEventListener('click', function () {
    if (!validateEmployeeForm()) {
        return;
    }

    const employeeId = document.getElementById('editEmployeeId').value;
    const employeeIndex = mockEmployees.findIndex(emp => emp.employeeId === employeeId);

    const employeeData = {
        employeeId: employeeId,
        name: document.getElementById('editName').value.trim(),
        email: document.getElementById('editEmail').value.trim(),
        phone: document.getElementById('editPhone').value.trim(),
        address: document.getElementById('editAddress').value.trim(),
        taxId: document.getElementById('editTaxId').value.trim(),
        status: true
    };

    if (employeeIndex !== -1) {
        // Cập nhật nhân viên hiện có
        mockEmployees[employeeIndex] = {
            ...mockEmployees[employeeIndex],
            ...employeeData
        };
    } else {
        // Thêm nhân viên mới
        mockEmployees.push(employeeData);
    }

    $('#editEmployeeModal').modal('hide');
    displayEmployees(mockEmployees);
    showNotification(employeeIndex !== -1 ?
        'Cập nhật thông tin nhân viên thành công' :
        'Thêm nhân viên mới thành công',
        'success'
    );
});

// Xác nhận và xóa nhân viên
function confirmDelete(employeeId) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
        deleteEmployee(employeeId);
    }
}

// Hàm xóa nhân viên
function deleteEmployee(employeeId) {
    const employeeIndex = mockEmployees.findIndex(emp => emp.employeeId === employeeId);
    if (employeeIndex !== -1) {
        mockEmployees.splice(employeeIndex, 1);
        displayEmployees(mockEmployees);
        alert('Xóa nhân viên thành công');
    }
}

// Xử lý đăng xuất
document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = '../../index.html';
});

// Sửa lại hàm xử lý thêm nhân viên mới
document.getElementById('addEmployeeBtn').addEventListener('click', function () {
    // Reset form trước khi mở modal
    document.getElementById('editEmployeeForm').reset();

    // Tạo mã nhân viên mới
    const newEmployeeId = generateNewEmployeeId();

    // Điền mã nhân viên mới vào form
    document.getElementById('editEmployeeId').value = newEmployeeId;

    // Mở modal
    $('#editEmployeeModal').modal('show');
});

// Thêm hàm tạo mã nhân viên mới
function generateNewEmployeeId() {
    const lastEmployee = mockEmployees[mockEmployees.length - 1];
    if (!lastEmployee) return 'NV001';

    const lastId = parseInt(lastEmployee.employeeId.replace('NV', ''));
    return `NV${String(lastId + 1).padStart(3, '0')}`;
}

// Sửa lại hàm validate
function validateEmployeeForm() {
    let isValid = true;
    const errors = {
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: ''
    };

    // Reset all error messages
    Object.keys(errors).forEach(key => {
        document.getElementById(`${key}Error`).textContent = '';
    });

    // Validate name
    const name = document.getElementById('editName').value.trim();
    if (!name) {
        errors.name = 'Họ tên không được để trống';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('editEmail').value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
        errors.email = 'Email không được để trống';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errors.email = 'Email không đúng định dạng (ví dụ: example@domain.com)';
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('editPhone').value.trim();
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phone) {
        errors.phone = 'Số điện thoại không được để trống';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        errors.phone = 'Số điện thoại không đúng định dạng (10 số, bắt đầu bằng 03, 05, 07, 08, 09)';
        isValid = false;
    }

    // Hiển thị lỗi
    Object.keys(errors).forEach(key => {
        if (errors[key]) {
            document.getElementById(`${key}Error`).textContent = errors[key];
        }
    });

    return isValid;
}

// Thêm hàm hiển thị thông báo
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