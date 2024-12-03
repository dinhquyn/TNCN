document.addEventListener('DOMContentLoaded', function () {
    loadTaxReports();
});

function loadTaxReports() {
    // Giả lập dữ liệu quyết toán thuế
    const taxReports = [
        { department: 'Phòng Kinh Doanh', totalTax: 5000000 },
        { department: 'Phòng Kỹ Thuật', totalTax: 3000000 },
    ];

    const tableBody = document.getElementById('taxReportTableBody');
    tableBody.innerHTML = '';

    taxReports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.department}</td>
            <td>${report.totalTax.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(row);
    });
}
