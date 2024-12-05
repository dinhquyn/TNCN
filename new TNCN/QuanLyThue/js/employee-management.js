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
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.address}</td>
            <td>${employee.taxId}</td>
            <td>
                <span class="badge badge-${employee.status ? 'success' : 'danger'}">
                    ${employee.status ? 'Đang làm việc' : 'Đã nghỉ việc'}
                </span>
            </td>
            <td>
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
    const employeeId = document.getElementById('editEmployeeId').value;
    const employeeIndex = mockEmployees.findIndex(emp => emp.employeeId === employeeId);

    if (employeeIndex !== -1) {
        // Cập nhật thông tin trong mảng dữ liệu
        mockEmployees[employeeIndex] = {
            ...mockEmployees[employeeIndex],
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            address: document.getElementById('editAddress').value,
            taxId: document.getElementById('editTaxId').value
        };

        // Đóng modal và cập nhật giao diện
        $('#editEmployeeModal').modal('hide');
        displayEmployees(mockEmployees);
        alert('Cập nhật thông tin nhân viên thành công');
    }
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

// Xử lý thêm nhân viên mới
document.getElementById('addEmployeeBtn').addEventListener('click', function () {
    const newEmployee = {
        employeeId: `NV${String(mockEmployees.length + 1).padStart(3, '0')}`,
        name: "",
        email: "",
        phone: "",
        address: "",
        taxId: "",
        status: true
    };

    mockEmployees.push(newEmployee);
    openEditModal(newEmployee.employeeId);
});