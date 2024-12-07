document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'ke_toan') {
        window.location.href = '../../index.html';
        return;
    }

    // Cập nhật tên người dùng
    document.getElementById('userName').textContent = currentUser.fullName;

    // Khởi tạo
    initializeFilters();
    loadEmployeeList();

    // Thêm event listeners
    document.getElementById('departmentSelect').addEventListener('change', loadEmployeeList);
    document.getElementById('searchEmployee').addEventListener('input', loadEmployeeList);
    document.getElementById('addDependentBtn').addEventListener('click', addDependentField);
    document.getElementById('saveDeductionBtn').addEventListener('click', saveDeductions);
});

function initializeFilters() {
    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const departmentSelect = document.getElementById('departmentSelect');

    departments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
}

function loadEmployeeList() {
    const departmentId = document.getElementById('departmentSelect').value;
    const searchTerm = document.getElementById('searchEmployee').value.toLowerCase();

    const departments = JSON.parse(localStorage.getItem('departments')) || [];
    const allEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];

    let employees = allEmployees;

    // Lọc theo phòng ban
    if (departmentId) {
        const department = departments.find(d => d.id === departmentId);
        if (department) {
            employees = employees.filter(emp => department.employees.includes(emp.id));
        }
    }

    // Lọc theo tìm kiếm
    if (searchTerm) {
        employees = employees.filter(emp =>
            emp.id.toLowerCase().includes(searchTerm) ||
            emp.name.toLowerCase().includes(searchTerm)
        );
    }

    const tbody = document.getElementById('employeeList');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const deduction = deductions.find(d => d.employeeId === emp.id);
        const department = departments.find(d => d.employees.includes(emp.id));

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${department ? department.name : ''}</td>
            <td>${deduction ? deduction.dependents.length : 0}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="openDeductionModal('${emp.id}')">
                    <i class="fas fa-edit"></i> Thiết lập
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openDeductionModal(employeeId) {
    const employee = JSON.parse(localStorage.getItem('employees'))
        .find(emp => emp.id === employeeId);

    if (!employee) return;

    document.getElementById('employeeId').value = employeeId;
    document.getElementById('employeeName').value = employee.name;

    // Load danh sách người phụ thuộc hiện tại
    const deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
    const employeeDeduction = deductions.find(d => d.employeeId === employeeId);

    const dependentsList = document.getElementById('dependentsList');
    dependentsList.innerHTML = '';

    if (employeeDeduction && employeeDeduction.dependents) {
        employeeDeduction.dependents.forEach(dependent => {
            addDependentField(dependent);
        });
    }

    $('#deductionModal').modal('show');
}

function addDependentField(dependent = null) {
    const dependentsList = document.getElementById('dependentsList');
    const dependentDiv = document.createElement('div');
    dependentDiv.className = 'dependent-item';
    dependentDiv.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Họ và tên</label>
                    <input type="text" class="form-control dependent-name" value="${dependent ? dependent.name : ''}">
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Quan hệ</label>
                    <select class="form-control dependent-relationship">
                        <option value="Con" ${dependent && dependent.relationship === 'Con' ? 'selected' : ''}>Con</option>
                        <option value="Vợ/Chồng" ${dependent && dependent.relationship === 'Vợ/Chồng' ? 'selected' : ''}>Vợ/Chồng</option>
                        <option value="Cha/Mẹ" ${dependent && dependent.relationship === 'Cha/Mẹ' ? 'selected' : ''}>Cha/Mẹ</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Năm sinh</label>
                    <input type="number" class="form-control dependent-birthyear" value="${dependent ? dependent.birthYear : ''}" min="1900" max="${new Date().getFullYear()}">
                </div>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-danger remove-dependent" onclick="this.closest('.dependent-item').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    dependentsList.appendChild(dependentDiv);
}

function saveDeductions() {
    const employeeId = document.getElementById('employeeId').value;
    const dependentItems = document.querySelectorAll('.dependent-item');

    const dependents = Array.from(dependentItems).map(item => ({
        name: item.querySelector('.dependent-name').value,
        relationship: item.querySelector('.dependent-relationship').value,
        birthYear: parseInt(item.querySelector('.dependent-birthyear').value)
    })).filter(d => d.name && d.relationship && d.birthYear);

    try {
        let deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
        const existingIndex = deductions.findIndex(d => d.employeeId === employeeId);

        const deductionInfo = {
            employeeId,
            dependentsCount: dependents.length,
            dependents,
            lastModified: new Date().toISOString(),
            modifiedBy: JSON.parse(localStorage.getItem('currentUser')).id
        };

        if (existingIndex !== -1) {
            deductions[existingIndex] = deductionInfo;
        } else {
            deductions.push(deductionInfo);
        }

        localStorage.setItem('employeeDeductions', JSON.stringify(deductions));

        $('#deductionModal').modal('hide');
        loadEmployeeList();
        showNotification('Đã lưu thông tin giảm trừ thành công!');
    } catch (error) {
        console.error('Lỗi khi lưu thông tin giảm trừ:', error);
        showNotification('Có lỗi xảy ra khi lưu thông tin', 'danger');
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