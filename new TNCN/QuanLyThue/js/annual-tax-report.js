document.addEventListener('DOMContentLoaded', function () {
    loadAnnualTaxReports();
});

function loadAnnualTaxReports() {
    // Giả lập dữ liệu quyết toán thuế cuối năm
    const annualTaxReports = [
        { department: 'Phòng Kinh Doanh', totalAnnualTax: 60000000 },
        { department: 'Phòng Kỹ Thuật', totalAnnualTax: 40000000 },
    ];

    const tableBody = document.getElementById('annualTaxReportTableBody');
    tableBody.innerHTML = '';

    annualTaxReports.forEach(report => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${report.department}</td>
            <td>${report.totalAnnualTax.toLocaleString()} VNĐ</td>
        `;
        tableBody.appendChild(row);
    });
}
