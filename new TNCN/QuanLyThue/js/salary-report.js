document.addEventListener('DOMContentLoaded', function () {
    loadSalaries();
});

function loadSalaries() {
    // Giả lập dữ liệu lương
    const salaries = [
        { employeeId: '001', fullName: 'Nguyễn Văn A', salary: 10000000, tax: 1000000 },
        { employeeId: '002', fullName: 'Trần Thị B', salary: 12000000, tax: 1200000 },
    ];

    const tableBody = document.getElementById('salaryTableBody');
    tableBody.innerHTML = '';

    salaries.forEach(salary => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${salary.employeeId}</td>
            <td>${salary.fullName}</td>
            <td>${salary.salary.toLocaleString()} VNĐ</td>
            <td>${salary.tax.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(row);
    });
}

function exportSalaryReport() {
    // Giả lập xuất báo cáo
    alert('Báo cáo lương đã được xuất thành công!');
}
