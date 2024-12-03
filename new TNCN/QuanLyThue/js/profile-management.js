document.addEventListener('DOMContentLoaded', function () {
    loadProfile();

    document.getElementById('editBtn').addEventListener('click', function () {
        const inputs = document.querySelectorAll('.profile-form input');
        inputs.forEach(input => {
            if (input.id === 'fullName' || input.id === 'email' || input.id === 'phone') {
                input.readOnly = false;
            }
        });
        this.style.display = 'none';
        document.querySelector('.btn-success').style.display = 'inline-block';
    });

    document.querySelector('.btn-success').addEventListener('click', function () {
        // Lưu thông tin cá nhân
        alert('Thông tin cá nhân đã được lưu.');
        loadProfile(); // Tải lại thông tin cá nhân
    });
});

function loadProfile() {
    // Giả lập dữ liệu thông tin cá nhân
    const profile = {
        fullName: 'Nguyễn Văn A',
        email: 'a@example.com',
        phone: '0123456789',
    };

    document.getElementById('fullName').value = profile.fullName;
    document.getElementById('email').value = profile.email;
    document.getElementById('phone').value = profile.phone;
}
