document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../../index.html';
        return;
    }

    // Load thông tin nhân viên
    loadEmployeeInfo();

    // Xử lý form cập nhật
    document.getElementById('profileForm').addEventListener('submit', function (e) {
        e.preventDefault();
        updateProfile();
    });
});

function loadEmployeeInfo() {
    // Giả lập dữ liệu nhân viên - sau này sẽ lấy từ API
    const employeeData = {
        employeeId: "NV001",
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
        phone: "0123456789",
        department: "Phòng IT",
        position: "Nhân viên",
        taxCode: "8751234567"
    };

    // Điền thông tin vào form
    document.getElementById('employeeId').value = employeeData.employeeId;
    document.getElementById('fullName').value = employeeData.fullName;
    document.getElementById('email').value = employeeData.email;
    document.getElementById('phone').value = employeeData.phone;
    document.getElementById('department').value = employeeData.department;
    document.getElementById('position').value = employeeData.position;
    document.getElementById('taxCode').value = employeeData.taxCode;
}

function updateProfile() {
    // Lấy thông tin từ form
    const updatedData = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    // Giả lập cập nhật thông tin - sau này sẽ gửi lên API
    console.log('Cập nhật thông tin:', updatedData);

    // Hiển thị thông báo thành công
    alert('Cập nhật thông tin thành công!');
}

// Xử lý đổi ảnh đại diện
document.querySelector('.change-avatar-btn').addEventListener('click', function () {
    // Tạo input file ẩn
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                document.querySelector('.profile-avatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
});
