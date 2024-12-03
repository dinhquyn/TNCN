document.addEventListener('DOMContentLoaded', function () {
    loadProfile();

    document.getElementById('editBtn').addEventListener('click', function () {
        const inputs = document.querySelectorAll('.profile-form input');
        inputs.forEach(input => {
            if (input.id === 'fullName' || input.id === 'email' || input.id === 'phone' || input.id === 'address') {
                input.readOnly = false;
            }
        });
        this.style.display = 'none';
        document.querySelector('.btn-success').style.display = 'inline-block';
    });

    document.querySelector('.btn-success').addEventListener('click', function () {
        if (validateInputs()) {
            alert('Thông tin cá nhân đã được lưu.');
            loadProfile(); // Tải lại thông tin cá nhân
        }
    });
});

function loadProfile() {
    // Giả lập dữ liệu thông tin cá nhân
    const profile = {
        fullName: 'Nguyễn Văn A',
        email: 'a@example.com',
        phone: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM'
    };

    document.getElementById('fullName').value = profile.fullName;
    document.getElementById('email').value = profile.email;
    document.getElementById('phone').value = profile.phone;
    document.getElementById('address').value = profile.address;
}

function validateInputs() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

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

    // Kiểm tra địa chỉ (có thể tùy chỉnh theo yêu cầu)
    if (address.trim() === '') {
        alert('Địa chỉ không được để trống.');
        return false;
    }

    return true;
}
