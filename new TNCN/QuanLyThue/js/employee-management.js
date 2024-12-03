document.addEventListener('DOMContentLoaded', function () {
    loadEmployees();

    document.getElementById('addEmployeeBtn').addEventListener('click', function () {
        // Mở form thêm nhân viên
        const employeeId = prompt("Nhập mã nhân viên:");
        const fullName = prompt("Nhập họ và tên:");
        const email = prompt("Nhập email:");
        const phone = prompt("Nhập số điện thoại:");

        if (employeeId && fullName && email && phone) {
            addEmployee({ employeeId, fullName, email, phone });
        }
    });

    document.getElementById('searchInput').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#employeeTableBody tr');
        rows.forEach(row => {
            const cells = row.getElementsByTagName('td');
            const employeeName = cells[1].textContent.toLowerCase();
            row.style.display = employeeName.includes(searchTerm) ? '' : 'none';
        });
    });
});

function loadEmployees() {
    // Giả lập dữ liệu nhân viên
    const employees = [
        { employeeId: '001', fullName: 'Nguyễn Văn A', email: 'a@example.com', phone: '0123456789' },
        { employeeId: '002', fullName: 'Trần Thị B', email: 'b@example.com', phone: '0987654321' },
    ];

    const tableBody = document.getElementById('employeeTableBody');
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.employeeId}</td>
            <td>${employee.fullName}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>
                <button class="btn btn-warning" onclick="editEmployee('${employee.employeeId}')">Chỉnh sửa</button>
                <button class="btn btn-danger" onclick="deleteEmployee('${employee.employeeId}')">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function addEmployee(employee) {
    // Thêm nhân viên vào cơ sở dữ liệu (giả lập)
    alert(`Đã thêm nhân viên: ${employee.fullName}`);
    loadEmployees(); // Tải lại danh sách nhân viên
}

function editEmployee(employeeId) {
    const newFullName = prompt("Nhập họ và tên mới:");
    const newEmail = prompt("Nhập email mới:");
    const newPhone = prompt("Nhập số điện thoại mới:");

    if (validateEmployeeInputs(newFullName, newEmail, newPhone)) {
        alert(`Đã cập nhật thông tin nhân viên ${employeeId}`);
        loadEmployees(); // Tải lại danh sách nhân viên
    }
}

function validateEmployeeInputs(fullName, email, phone) {
    // Kiểm tra định dạng họ tên
    const nameRegex = /^[a-zA-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐ\s]+$/;
    if (!nameRegex.test(fullName)) {
        alert('Họ tên không hợp lệ. Vui lòng nhập lại.');
        return false;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ. Vui lòng nhập lại.');
        return false;
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^\d{10}$/; // Chỉ cho phép 10 chữ số
    if (!phoneRegex.test(phone)) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
        return false;
    }

    return true;
}

function deleteEmployee(employeeId) {
    // Xóa nhân viên
    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên ${employeeId}?`)) {
        alert(`Đã xóa nhân viên ${employeeId}`);
        loadEmployees(); // Tải lại danh sách nhân viên
    }
}

function sendNotification(employeeId) {
    const message = prompt("Nhập thông điệp để gửi:");
    if (message) {
        alert(`Đã gửi thông báo đến nhân viên ${employeeId}: ${message}`);
    }
}
