// Dữ liệu mẫu cho phòng ban
let mockDepartments = [
    {
        id: 'PB001',
        name: 'Phòng Kế Toán',
        description: 'Quản lý tài chính và kế toán',
        manager: 'NV001',
        employees: ['NV001', 'NV002', 'NV003']
    },
    {
        id: 'PB002',
        name: 'Phòng Nhân Sự',
        description: 'Quản lý nhân sự và tuyển dụng',
        manager: 'NV004',
        employees: ['NV004', 'NV005']
    }
];

// Dữ liệu mẫu cho nhân viên
const mockEmployees = [
    { id: 'NV001', name: 'Nguyễn Văn An', position: 'Trưởng phòng' },
    { id: 'NV002', name: 'Trần Thị Bình', position: 'Nhân viên' },
    { id: 'NV003', name: 'Lê Văn Cường', position: 'Nhân viên' },
    { id: 'NV004', name: 'Phạm Thị Dung', position: 'Trưởng phòng' },
    { id: 'NV005', name: 'Hoàng Văn Em', position: 'Nhân viên' }
];

// Thêm biến để lưu phòng ban hiện tại đang xem
let currentDepartment = null;

// Thêm hàm lưu và đọc dữ liệu từ localStorage
function saveDepartmentsToStorage() {
    localStorage.setItem('departments', JSON.stringify(mockDepartments));
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
}

function loadDepartmentsFromStorage() {
    const departments = localStorage.getItem('departments');
    const employees = localStorage.getItem('employees');

    if (departments) {
        mockDepartments = JSON.parse(departments);
    }
    if (employees) {
        const storedEmployees = JSON.parse(employees);
        // Gộp với danh sách nhân viên mặc định, tránh trùng lặp
        mockEmployees.push(...storedEmployees.filter(newEmp =>
            !mockEmployees.some(emp => emp.id === newEmp.id)
        ));
    }
}

// Thêm hàm hiển thị thông báo
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="close" data-dismiss="alert">
            <span>&times;</span>
        </button>
    `;
    document.body.appendChild(notification);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Load dữ liệu từ localStorage
    loadDepartmentsFromStorage();

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Khởi tạo danh sách phòng ban
    loadDepartments();

    // Khởi tạo danh sách nhân viên cho select
    initializeEmployeeSelect();

    // Thêm event listeners
    document.getElementById('saveDepartment').addEventListener('click', saveDepartment);
    document.getElementById('confirmDelete').addEventListener('click', deleteDepartment);
    document.getElementById('addEmployeeToDepartment').addEventListener('click', addEmployeeToDepartment);
});

function loadDepartments() {
    const departmentList = document.getElementById('departmentList');
    departmentList.innerHTML = '';

    mockDepartments.forEach(dept => {
        const departmentCard = createDepartmentCard(dept);
        departmentList.appendChild(departmentCard);
    });
}

function createDepartmentCard(department) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const manager = mockEmployees.find(emp => emp.id === department.manager);
    const employeeCount = department.employees.length;

    col.innerHTML = `
        <div class="department-card">
            <div class="department-header">
                <h5 class="mb-0">${department.name}</h5>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-info" onclick="editDepartment('${department.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="showDeleteConfirmation('${department.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="department-body">
                <p class="mb-2"><strong>Mã phòng ban:</strong> ${department.id}</p>
                <p class="mb-2"><strong>Trưởng phòng:</strong> ${manager ? manager.name : 'Chưa có'}</p>
                <p class="mb-2"><strong>Số nhân viên:</strong> ${employeeCount}</p>
                <p class="mb-0"><strong>Mô tả:</strong> ${department.description || 'Không có mô tả'}</p>
            </div>
            <div class="department-footer">
                <button class="btn btn-sm btn-outline-primary" onclick="viewEmployees('${department.id}')">
                    <i class="fas fa-users"></i> Xem danh sách nhân viên
                </button>
            </div>
        </div>
    `;

    return col;
}

function initializeEmployeeSelect() {
    const select = document.getElementById('departmentManager');
    select.innerHTML = '<option value="">Chọn trưởng phòng...</option>';

    mockEmployees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = `${emp.name} (${emp.id})`;
        select.appendChild(option);
    });
}

function saveDepartment() {
    const id = document.getElementById('departmentId').value.trim();
    const name = document.getElementById('departmentName').value.trim();
    const description = document.getElementById('departmentDescription').value.trim();
    const managerName = document.getElementById('managerName').value.trim();
    const managerId = document.getElementById('managerId').value.trim();

    // Reset error messages
    document.getElementById('departmentIdError').textContent = '';
    document.getElementById('departmentNameError').textContent = '';
    document.getElementById('managerNameError').textContent = '';
    document.getElementById('managerIdError').textContent = '';

    // Validate
    let hasError = false;

    // Kiểm tra mã phòng ban
    if (!id) {
        document.getElementById('departmentIdError').textContent = 'Vui lòng nhập mã phòng ban';
        hasError = true;
    } else if (!/^PB\d{3}$/.test(id)) {
        document.getElementById('departmentIdError').textContent = 'Mã phòng ban phải có định dạng PBxxx (x là số)';
        hasError = true;
    }

    // Kiểm tra tên phòng ban
    if (!name) {
        document.getElementById('departmentNameError').textContent = 'Vui lòng nhập tên phòng ban';
        hasError = true;
    }

    // Kiểm tra thông tin trưởng phòng (nếu có nhập)
    if (managerName || managerId) {
        if (!managerName) {
            document.getElementById('managerNameError').textContent = 'Vui lòng nhập tên trưởng phòng';
            hasError = true;
        }
        if (!managerId) {
            document.getElementById('managerIdError').textContent = 'Vui lòng nhập mã nhân viên';
            hasError = true;
        } else if (!/^NV\d{3}$/.test(managerId)) {
            document.getElementById('managerIdError').textContent = 'Mã nhân viên phải có định dạng NVxxx (x là số)';
            hasError = true;
        }
    }

    if (hasError) return;

    try {
        // Check if department exists
        const existingDept = mockDepartments.find(d => d.id === id);
        if (existingDept) {
            // Update existing department
            existingDept.name = name;
            existingDept.description = description;

            // Cập nhật thông tin trưởng phòng
            if (managerName && managerId) {
                // Kiểm tra xem nhân viên đã tồn tại chưa
                let manager = mockEmployees.find(emp => emp.id === managerId);
                if (!manager) {
                    // Thêm nhân viên mới vào danh sách
                    manager = {
                        id: managerId,
                        name: managerName,
                        position: 'Trưởng phòng'
                    };
                    mockEmployees.push(manager);
                }
                existingDept.manager = managerId;

                // Thêm vào danh sách nhân viên nếu chưa có
                if (!existingDept.employees.includes(managerId)) {
                    existingDept.employees.push(managerId);
                }
            }
        } else {
            // Kiểm tra xem mã phòng ban đã tồn tại chưa
            if (mockDepartments.some(d => d.id === id)) {
                document.getElementById('departmentIdError').textContent = 'Mã phòng ban đã tồn tại';
                return;
            }

            // Tạo phòng ban mới
            const newDepartment = {
                id,
                name,
                description,
                manager: '',
                employees: []
            };

            // Thêm trưởng phòng nếu có
            if (managerName && managerId) {
                // Kiểm tra xem nhân viên đã tồn tại chưa
                let manager = mockEmployees.find(emp => emp.id === managerId);
                if (!manager) {
                    // Thêm nhân viên mới vào danh sách
                    manager = {
                        id: managerId,
                        name: managerName,
                        position: 'Trưởng phòng'
                    };
                    mockEmployees.push(manager);
                }
                newDepartment.manager = managerId;
                newDepartment.employees.push(managerId);
            }

            mockDepartments.push(newDepartment);
        }

        // Lưu vào localStorage
        saveDepartmentsToStorage();

        // Reload departments and close modal
        loadDepartments();
        $('#addDepartmentModal').modal('hide');

        // Reset form
        document.getElementById('departmentForm').reset();

        // Hiển thị thông báo thành công
        showNotification(existingDept ? 'Cập nhật phòng ban thành công!' : 'Thêm phòng ban mới thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu phòng ban:', error);
        showNotification('Có lỗi xảy ra khi lưu phòng ban. Vui lòng thử lại.', 'danger');
    }
}

function editDepartment(departmentId) {
    const department = mockDepartments.find(d => d.id === departmentId);
    if (!department) return;

    // Fill form
    document.getElementById('departmentId').value = department.id;
    document.getElementById('departmentName').value = department.name;
    document.getElementById('departmentDescription').value = department.description || '';

    // Fill manager info if exists
    if (department.manager) {
        const manager = mockEmployees.find(emp => emp.id === department.manager);
        if (manager) {
            document.getElementById('managerName').value = manager.name;
            document.getElementById('managerId').value = manager.id;
        }
    } else {
        document.getElementById('managerName').value = '';
        document.getElementById('managerId').value = '';
    }

    // Update modal title
    document.querySelector('#addDepartmentModal .modal-title').textContent = 'Sửa Phòng Ban';

    // Show modal
    $('#addDepartmentModal').modal('show');
}

let departmentToDelete = null;

function showDeleteConfirmation(departmentId) {
    departmentToDelete = departmentId;
    $('#deleteDepartmentModal').modal('show');
}

function deleteDepartment() {
    if (!departmentToDelete) return;

    try {
        const departmentIndex = mockDepartments.findIndex(d => d.id === departmentToDelete);
        if (departmentIndex !== -1) {
            const departmentName = mockDepartments[departmentIndex].name;
            mockDepartments.splice(departmentIndex, 1);

            // Lưu vào localStorage
            saveDepartmentsToStorage();

            loadDepartments();
            $('#deleteDepartmentModal').modal('hide');

            showNotification(`Đã xóa phòng ban "${departmentName}"`);
        }
    } catch (error) {
        console.error('Lỗi khi xóa phòng ban:', error);
        showNotification('Có lỗi xảy ra khi xóa phòng ban. Vui lòng thử lại.', 'danger');
    } finally {
        departmentToDelete = null;
    }
}

// Xử lý responsive menu
document.getElementById('toggleMenu')?.addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('shifted');
});

// Thêm hàm xem danh sách nhân viên
function viewEmployees(departmentId) {
    const department = mockDepartments.find(d => d.id === departmentId);
    if (!department) return;

    currentDepartment = department;

    // Cập nhật thông tin phòng ban trong modal
    document.getElementById('modalDepartmentName').textContent = department.name;
    document.getElementById('modalDepartmentInfo').textContent =
        `Mã phòng ban: ${department.id} | ${department.description || 'Không có mô tả'}`;

    // Lấy danh sách nhân viên của phòng ban
    const employeeList = department.employees.map(empId =>
        mockEmployees.find(emp => emp.id === empId)
    ).filter(emp => emp); // Lọc bỏ undefined

    // Hiển thị danh sách nhân viên
    const tbody = document.getElementById('employeeListBody');
    tbody.innerHTML = '';

    employeeList.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeEmployee('${emp.id}')">
                    <i class="fas fa-user-minus"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Cập nhật danh sách nhân viên có thể thêm
    updateEmployeeSelect(department.employees);

    // Hiển thị modal
    $('#employeeListModal').modal('show');
}

// Hàm cập nhật select nhân viên (chỉ hiển thị nhân viên chưa thuộc phòng ban)
function updateEmployeeSelect(currentEmployees) {
    const select = document.getElementById('employeeSelect');
    select.innerHTML = '<option value="">Chọn nhân viên...</option>';

    mockEmployees
        .filter(emp => !currentEmployees.includes(emp.id))
        .forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = `${emp.name} (${emp.id})`;
            select.appendChild(option);
        });
}

// Hàm thêm nhân viên vào phòng ban
function addEmployeeToDepartment() {
    const employeeId = document.getElementById('employeeSelect').value;
    if (!employeeId || !currentDepartment) return;

    try {
        const employee = mockEmployees.find(emp => emp.id === employeeId);
        if (!employee) {
            showNotification('Không tìm thấy thông tin nhân viên', 'danger');
            return;
        }

        // Thêm nhân viên vào phòng ban
        if (!currentDepartment.employees.includes(employeeId)) {
            currentDepartment.employees.push(employeeId);

            // Lưu vào localStorage
            saveDepartmentsToStorage();

            // Cập nhật lại danh sách và đóng modal thêm nhân viên
            viewEmployees(currentDepartment.id);
            $('#addEmployeeModal').modal('hide');

            showNotification(`Đã thêm nhân viên ${employee.name} vào phòng ban`);
        }
    } catch (error) {
        console.error('Lỗi khi thêm nhân viên:', error);
        showNotification('Có lỗi xảy ra khi thêm nhân viên. Vui lòng thử lại.', 'danger');
    }
}

// Hàm xóa nhân viên khỏi phòng ban
function removeEmployee(employeeId) {
    if (!currentDepartment) return;

    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này khỏi phòng ban?')) {
        try {
            const employee = mockEmployees.find(emp => emp.id === employeeId);

            // Xóa nhân viên khỏi phòng ban
            currentDepartment.employees = currentDepartment.employees.filter(id => id !== employeeId);

            // Nếu nhân viên bị xóa là trưởng phòng, cập nhật lại trưởng phòng
            if (currentDepartment.manager === employeeId) {
                currentDepartment.manager = '';
            }

            // Lưu vào localStorage
            saveDepartmentsToStorage();

            // Cập nhật lại danh sách
            viewEmployees(currentDepartment.id);
            loadDepartments(); // Cập nhật lại card phòng ban

            showNotification(`Đã xóa nhân viên ${employee.name} khỏi phòng ban`);
        } catch (error) {
            console.error('Lỗi khi xóa nhân viên:', error);
            showNotification('Có lỗi xảy ra khi xóa nhân viên. Vui lòng thử lại.', 'danger');
        }
    }
} 