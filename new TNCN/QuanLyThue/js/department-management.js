document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Khởi tạo dữ liệu mẫu nếu chưa có
    initializeMockData();

    // Load danh sách phòng ban
    loadDepartments();

    // Thêm event listeners
    document.getElementById('saveDepartmentBtn').addEventListener('click', saveDepartment);
    document.getElementById('addEmployeeToDepartment').addEventListener('click', addEmployeeToDepartment);
});

// Dữ liệu mô phỏng cho phòng ban
const mockDepartments = [
    {
        id: 'PB001',
        name: 'Phòng Kế Toán',
        description: 'Quản lý tài chính và kế toán',
        manager: 'NV001',
        employees: ['NV001', 'NV002', 'NV003'],
        status: 'active'
    },
    {
        id: 'PB002',
        name: 'Phòng Nhân Sự',
        description: 'Quản lý nhân sự và tuyển dụng',
        manager: 'NV004',
        employees: ['NV004', 'NV005', 'NV006'],
        status: 'active'
    },
    {
        id: 'PB003',
        name: 'Phòng IT',
        description: 'Phát triển và bảo trì hệ thống',
        manager: 'NV007',
        employees: ['NV007', 'NV008'],
        status: 'inactive'
    }
];

// Dữ liệu mô phỏng cho nhân viên
const mockEmployees = [
    { id: 'NV001', name: 'Nguyễn Văn A', position: 'Trưởng phòng' },
    { id: 'NV002', name: 'Trần Thị B', position: 'Nhân viên' },
    { id: 'NV003', name: 'Lê Văn C', position: 'Nhân viên' },
    { id: 'NV004', name: 'Phạm Thị D', position: 'Trưởng phòng' },
    { id: 'NV005', name: 'Hoàng Văn E', position: 'Nhân viên' },
    { id: 'NV006', name: 'Ngô Thị F', position: 'Nhân viên' },
    { id: 'NV007', name: 'Đỗ Văn G', position: 'Trưởng phòng' },
    { id: 'NV008', name: 'Mai Thị H', position: 'Nhân viên' }
];

// Khởi tạo dữ liệu mẫu
function initializeMockData() {
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(mockEmployees));
    }
    if (!localStorage.getItem('departments')) {
        localStorage.setItem('departments', JSON.stringify(mockDepartments));
    }
}

function loadDepartments() {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const departmentList = document.getElementById('departmentList');
    departmentList.innerHTML = '';

    departments.forEach(dept => {
        // Tìm thông tin trưởng phòng
        const manager = employees.find(emp => emp.id === dept.manager);
        const managerName = manager ? manager.name : 'Chưa có';

        const card = document.createElement('div');
        card.className = 'card';

        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        card.innerHTML = `
            <div class="card-body">
                <div class="department-header">
                    <div class="department-flag">
                        <div class="flag flag-active" title="Đang hoạt động"></div>
                        <div class="flag flag-inactive" title="Tạm ngưng"></div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editDepartment('${dept.id}')" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-delete" onclick="deleteDepartment('${dept.id}')" title="Xóa">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="department-info">
                    <p><strong>Mã phòng ban:</strong> ${dept.id}</p>
                    <p><strong>Tên phòng ban:</strong> ${dept.name}</p>
                    <p><strong>Trưởng phòng:</strong> ${managerName} (${dept.manager || 'N/A'})</p>
                    <p><strong>Số nhân viên:</strong> ${dept.employees.length}</p>
                    <p><strong>Mô tả:</strong> ${dept.description || 'Không có mô tả'}</p>
                </div>
                <div class="button-group">
                    <a href="#" class="btn-view-list" onclick="viewEmployees('${dept.id}')">
                        <i class="fas fa-users mr-2"></i>
                        Xem danh sách nhân viên
                    </a>
                    <button class="btn-add-employee" onclick="openAddEmployeeModal('${dept.id}')">
                        <i class="fas fa-user-plus mr-2"></i>
                        Thêm nhân viên
                    </button>
                </div>
            </div>
        `;

        departmentList.appendChild(card);

        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * departments.indexOf(dept));
    });
}

function editDepartment(deptId) {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const dept = departments.find(d => d.id === deptId);
    if (!dept) return;

    // Điền thông tin vào modal chỉnh sửa
    document.getElementById('editDeptId').value = dept.id;
    document.getElementById('editDeptName').value = dept.name;
    document.getElementById('editDeptDesc').value = dept.description || '';
    document.getElementById('editDeptManager').value = dept.manager || '';

    // Load danh sách nhân viên cho select trưởng phòng
    loadManagerOptions(dept.id);

    $('#editDepartmentModal').modal('show');
}

function saveDepartment() {
    const deptId = document.getElementById('editDeptId').value;
    const deptName = document.getElementById('editDeptName').value;
    const deptDesc = document.getElementById('editDeptDesc').value;
    const deptManager = document.getElementById('editDeptManager').value;

    if (!validateDepartmentInput(deptId, deptName)) return;

    let departments = JSON.parse(localStorage.getItem('departments')) || [];
    const index = departments.findIndex(d => d.id === deptId);

    if (index !== -1) {
        departments[index] = {
            ...departments[index],
            name: deptName,
            description: deptDesc,
            manager: deptManager
        };

        localStorage.setItem('departments', JSON.stringify(departments));
        $('#editDepartmentModal').modal('hide');
        loadDepartments();
        showNotification('Cập nhật thông tin phòng ban thành công!');
    }
}

function deleteDepartment(deptId) {
    if (confirm('Bạn có chắc chắn muốn xóa phòng ban này?')) {
        let departments = JSON.parse(localStorage.getItem('departments')) || [];
        departments = departments.filter(d => d.id !== deptId);
        localStorage.setItem('departments', JSON.stringify(departments));
        loadDepartments();
        showNotification('Xóa phòng ban thành công!');
    }
}

function viewEmployees(departmentId) {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const department = departments.find(d => d.id === departmentId);

    if (department) {
        document.getElementById('modalDepartmentName').textContent = department.name;

        const tbody = document.getElementById('employeeListBody');
        tbody.innerHTML = '';

        department.employees.forEach(empId => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${empId}</td>
                <td>Nhân viên ${empId}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeEmployee('${empId}', '${departmentId}')">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });

        $('#employeeListModal').modal('show');
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

    setTimeout(() => notification.remove(), 3000);
}

// Load danh sách nhân viên cho modal thêm nhân viên
function loadEmployeeOptions(departmentId) {
    const employees = JSON.parse(localStorage.getItem('employees')) || mockEmployees;
    const departments = JSON.parse(localStorage.getItem('departments')) || mockDepartments;
    const department = departments.find(d => d.id === departmentId);

    const select = document.getElementById('employeeSelect');
    select.innerHTML = '<option value="">Chọn nhân viên...</option>';

    // Lọc nhân viên chưa thuộc phòng ban nào
    const assignedEmployees = departments.reduce((acc, dept) => {
        return acc.concat(dept.employees || []);
    }, []);

    const availableEmployees = employees.filter(emp =>
        !assignedEmployees.includes(emp.id) ||
        (department && department.employees.includes(emp.id))
    );

    availableEmployees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = `${emp.name} (${emp.id})`;
        select.appendChild(option);
    });
}

// Thêm nhân viên vào phòng ban
function addEmployeeToDepartment(deptId, empId) {
    let departments = JSON.parse(localStorage.getItem('departments')) || [];
    const deptIndex = departments.findIndex(d => d.id === deptId);

    if (deptIndex >= 0) {
        departments[deptIndex].employees.push(empId);
        localStorage.setItem('departments', JSON.stringify(departments));
        loadDepartments();
        $('#addEmployeeModal').modal('hide');
        showNotification('Thêm nhân viên vào phòng ban thành công!');
    }
}

// Validate input
function validateDepartmentInput(id, name) {
    if (!id || !name) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'danger');
        return false;
    }
    if (!/^PB\d{3}$/.test(id)) {
        showNotification('Mã phòng ban phải có định dạng PBxxx (x là số)', 'danger');
        return false;
    }
    return true;
}

// Load danh sách nhân viên cho select trưởng phòng
function loadManagerOptions(currentDeptId) {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const select = document.getElementById('editDeptManager');
    select.innerHTML = '<option value="">Chọn trưởng phòng...</option>';

    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = `${emp.name} (${emp.id})`;
        select.appendChild(option);
    });
}

// Thêm nhân viên vào phòng ban
function openAddEmployeeModal(deptId) {
    currentDeptId = deptId; // Lưu ID phòng ban hiện tại
    loadEmployeeOptions(deptId);
    $('#addEmployeeModal').modal('show');
}

// Xử lý thêm nhân viên
document.getElementById('addEmployeeToDepartment').addEventListener('click', function () {
    const empId = document.getElementById('employeeSelect').value;
    if (!empId) {
        showNotification('Vui lòng chọn nhân viên', 'danger');
        return;
    }

    let departments = JSON.parse(localStorage.getItem('departments')) || [];
    const deptIndex = departments.findIndex(d => d.id === currentDeptId);

    if (deptIndex !== -1) {
        // Kiểm tra xem nhân viên đã thuộc phòng ban này chưa
        if (!departments[deptIndex].employees) {
            departments[deptIndex].employees = [];
        }

        if (!departments[deptIndex].employees.includes(empId)) {
            departments[deptIndex].employees.push(empId);
            localStorage.setItem('departments', JSON.stringify(departments));
            $('#addEmployeeModal').modal('hide');
            loadDepartments();
            showNotification('Thêm nhân viên vào phòng ban thành công!');
        } else {
            showNotification('Nhân viên đã thuộc phòng ban này!', 'warning');
        }
    }
});

// Xóa nhân viên khỏi phòng ban
function removeEmployee(empId, deptId) {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này khỏi phòng ban?')) {
        let departments = JSON.parse(localStorage.getItem('departments')) || [];
        const deptIndex = departments.findIndex(d => d.id === deptId);

        if (deptIndex !== -1) {
            departments[deptIndex].employees = departments[deptIndex].employees.filter(id => id !== empId);
            localStorage.setItem('departments', JSON.stringify(departments));
            viewEmployees(deptId); // Refresh danh sách nhân viên
            loadDepartments(); // Refresh danh sách phòng ban
            showNotification('Đã xóa nhân viên khỏi phòng ban!');
        }
    }
}

// Thêm biến để lưu ID phòng ban hiện tại
let currentDeptId = null;

// Thêm hàm xử lý thêm mới phòng ban
function addDepartment() {
    const id = document.getElementById('departmentId').value;
    const name = document.getElementById('departmentName').value;
    const description = document.getElementById('departmentDesc').value;
    const manager = document.getElementById('departmentManager').value;

    if (!validateDepartmentInput(id, name)) return;

    // Kiểm tra mã phòng ban đã tồn tại chưa
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    if (departments.some(dept => dept.id === id)) {
        showNotification('Mã phòng ban đã tồn tại!', 'danger');
        return;
    }

    const newDepartment = {
        id,
        name,
        description,
        manager,
        employees: manager ? [manager] : [],
        status: 'active'
    };

    departments.push(newDepartment);
    localStorage.setItem('departments', JSON.stringify(departments));

    $('#addDepartmentModal').modal('hide');
    document.getElementById('departmentForm').reset();
    loadDepartments();
    showNotification('Thêm phòng ban thành công!');
}

// Thêm event listener cho nút thêm phòng ban
document.addEventListener('DOMContentLoaded', function () {
    initializeMockData();
    loadDepartments();

    // Load danh sách nhân viên cho select trưởng phòng trong modal thêm mới
    const employees = JSON.parse(localStorage.getItem('employees')) || mockEmployees;
    const managerSelect = document.getElementById('departmentManager');
    if (managerSelect) {
        managerSelect.innerHTML = '<option value="">Chọn trưởng phòng...</option>';
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = `${emp.name} (${emp.id})`;
            managerSelect.appendChild(option);
        });
    }

    // Thêm event listener cho nút lưu trong modal thêm mới
    const saveDepartmentBtn = document.getElementById('saveDepartmentBtn');
    if (saveDepartmentBtn) {
        saveDepartmentBtn.addEventListener('click', addDepartment);
    }
});