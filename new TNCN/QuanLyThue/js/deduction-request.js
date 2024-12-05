// Các trạng thái yêu cầu
const DEDUCTION_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'nhan_vien') {
        window.location.href = '../../index.html';
        return;
    }

    // Khởi tạo
    loadCurrentDeduction();
    loadDeductionHistory();

    // Thêm event listeners
    document.getElementById('addDependentBtn').addEventListener('click', addDependentField);
    document.getElementById('submitDeductionBtn').addEventListener('click', submitDeduction);
    document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);
});

function loadCurrentDeduction() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
    const currentDeduction = deductions.find(d => d.employeeId === currentUser.id);

    updateStatusDisplay(currentDeduction);

    if (currentDeduction && currentDeduction.dependents) {
        currentDeduction.dependents.forEach(dependent => {
            addDependentField(dependent);
        });
        document.getElementById('deductionNote').value = currentDeduction.note || '';
    }
}

function updateStatusDisplay(deduction) {
    const statusDiv = document.getElementById('currentDeductionStatus');
    if (!deduction) {
        statusDiv.className = 'alert alert-info';
        statusDiv.textContent = 'Chưa có yêu cầu giảm trừ';
        return;
    }

    let statusClass, statusText;
    switch (deduction.status) {
        case DEDUCTION_STATUS.DRAFT:
            statusClass = 'alert-secondary';
            statusText = 'Bản nháp';
            break;
        case DEDUCTION_STATUS.PENDING:
            statusClass = 'alert-warning';
            statusText = 'Đang chờ phê duyệt';
            break;
        case DEDUCTION_STATUS.APPROVED:
            statusClass = 'alert-success';
            statusText = 'Đã được phê duyệt';
            break;
        case DEDUCTION_STATUS.REJECTED:
            statusClass = 'alert-danger';
            statusText = `Đã bị từ chối - Lý do: ${deduction.rejectReason || 'Không có lý do'}`;
            break;
        default:
            statusClass = 'alert-info';
            statusText = 'Chưa xác định';
    }

    statusDiv.className = `alert ${statusClass}`;
    statusDiv.textContent = statusText;
}

function addDependentField(dependent = null) {
    const dependentsList = document.getElementById('dependentsList');
    const dependentDiv = document.createElement('div');
    dependentDiv.className = 'dependent-item';
    dependentDiv.innerHTML = `
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label>Họ và tên</label>
                    <input type="text" class="form-control dependent-name" value="${dependent ? dependent.name : ''}" required>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>Quan hệ</label>
                    <select class="form-control dependent-relationship" required>
                        <option value="Con" ${dependent && dependent.relationship === 'Con' ? 'selected' : ''}>Con</option>
                        <option value="Vợ/Chồng" ${dependent && dependent.relationship === 'Vợ/Chồng' ? 'selected' : ''}>Vợ/Chồng</option>
                        <option value="Cha/Mẹ" ${dependent && dependent.relationship === 'Cha/Mẹ' ? 'selected' : ''}>Cha/Mẹ</option>
                    </select>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label>Năm sinh</label>
                    <input type="number" class="form-control dependent-birthyear" 
                        value="${dependent ? dependent.birthYear : ''}" 
                        min="1900" max="${new Date().getFullYear()}" required>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Minh chứng</label>
                    <input type="file" class="form-control-file dependent-document" 
                        accept=".pdf,.jpg,.png" ${dependent ? '' : 'required'}>
                    ${dependent && dependent.document ? `
                        <small class="text-success">Đã nộp: ${dependent.document}</small>
                    ` : ''}
                </div>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-danger remove-dependent" 
                    onclick="this.closest('.dependent-item').remove()">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    dependentsList.appendChild(dependentDiv);
}

async function submitDeduction(isDraft = false) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dependentItems = document.querySelectorAll('.dependent-item');
    const note = document.getElementById('deductionNote').value;

    try {
        const dependents = [];
        for (const item of dependentItems) {
            const name = item.querySelector('.dependent-name').value;
            const relationship = item.querySelector('.dependent-relationship').value;
            const birthYear = parseInt(item.querySelector('.dependent-birthyear').value);
            const documentFile = item.querySelector('.dependent-document').files[0];

            if (!isDraft && (!name || !relationship || !birthYear || (!documentFile && !item.querySelector('.text-success')))) {
                throw new Error('Vui lòng điền đầy đủ thông tin và đính kèm minh chứng');
            }

            if (name && relationship && birthYear) {
                let documentName = '';
                if (documentFile) {
                    documentName = `${currentUser.id}_${name}_${Date.now()}.${documentFile.name.split('.').pop()}`;
                    // Xử lý upload file ở đây
                }

                dependents.push({
                    name,
                    relationship,
                    birthYear,
                    document: documentName || (item.querySelector('.text-success')?.textContent.split(': ')[1] || null)
                });
            }
        }

        // Lấy danh sách yêu cầu hiện tại
        let deductionRequests = JSON.parse(localStorage.getItem('deductionRequests')) || [];

        // Tạo yêu cầu mới
        const newRequest = {
            requestId: `REQ_${Date.now()}`,
            employeeId: currentUser.id,
            dependentsCount: dependents.length,
            dependents,
            note,
            status: isDraft ? DEDUCTION_STATUS.DRAFT : DEDUCTION_STATUS.PENDING,
            createdDate: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            modifiedBy: currentUser.id
        };

        // Thêm vào danh sách yêu cầu
        deductionRequests.push(newRequest);
        localStorage.setItem('deductionRequests', JSON.stringify(deductionRequests));

        // Nếu không phải bản nháp, cập nhật employeeDeductions
        if (!isDraft) {
            let employeeDeductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
            const existingIndex = employeeDeductions.findIndex(d => d.employeeId === currentUser.id);

            if (existingIndex !== -1) {
                employeeDeductions[existingIndex] = {
                    ...employeeDeductions[existingIndex],
                    pendingRequest: newRequest.requestId
                };
            } else {
                employeeDeductions.push({
                    employeeId: currentUser.id,
                    pendingRequest: newRequest.requestId
                });
            }

            localStorage.setItem('employeeDeductions', JSON.stringify(employeeDeductions));
        }

        loadCurrentDeduction();
        loadDeductionHistory();
        showNotification(isDraft ? 'Đã lưu bản nháp' : 'Đã gửi yêu cầu giảm trừ thành công!');
    } catch (error) {
        console.error('Lỗi:', error);
        showNotification(error.message || 'Có lỗi xảy ra', 'danger');
    }
}

function saveDraft() {
    submitDeduction(true);
}

function loadDeductionHistory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const deductions = JSON.parse(localStorage.getItem('employeeDeductions')) || [];
    const userDeductions = deductions.filter(d => d.employeeId === currentUser.id);

    const tbody = document.getElementById('deductionHistory');
    tbody.innerHTML = '';

    userDeductions.forEach(deduction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(deduction.createdDate).toLocaleDateString('vi-VN')}</td>
            <td>${deduction.dependentsCount}</td>
            <td>
                <span class="status-badge status-${deduction.status}">
                    ${getStatusText(deduction.status)}
                </span>
            </td>
            <td>${deduction.rejectReason || '-'}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewDeductionDetail('${deduction.createdDate}')">
                    <i class="fas fa-eye"></i> Xem
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getStatusText(status) {
    const statusTexts = {
        [DEDUCTION_STATUS.DRAFT]: 'Bản nháp',
        [DEDUCTION_STATUS.PENDING]: 'Đang chờ duyệt',
        [DEDUCTION_STATUS.APPROVED]: 'Đã duyệt',
        [DEDUCTION_STATUS.REJECTED]: 'Đã từ chối'
    };
    return statusTexts[status] || 'Không xác định';
}

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

    setTimeout(() => {
        notification.remove();
    }, 3000);
} 