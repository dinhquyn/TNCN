const mockEmployees = [
    { id: 'NV001', name: 'Nguyễn Văn An' },
    { id: 'NV002', name: 'Trần Thị Bình' },
    { id: 'NV003', name: 'Lê Văn Cường' },
    { id: 'NV004', name: 'Phạm Thị Dung' },
    { id: 'NV005', name: 'Hoàng Văn Em' },

];

const mockAnnualData = {
    2023: [
        {
            employeeId: 'NV001',
            totalIncome: 180000000,
            totalDeduction: 132000000,
            totalTax: 2400000,
            totalInsurance: {
                health: 1800000,
                social: 3600000,
                unemployment: 900000
            },
            dependents: [
                { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' },
                { name: 'Nguyễn Văn Y', relationship: 'Con', birthYear: '2018' }
            ]
        },
        {
            employeeId: 'NV002',
            totalIncome: 240000000,
            totalDeduction: 184800000,
            totalTax: 4800000,
            totalInsurance: {
                health: 2400000,
                social: 4800000,
                unemployment: 1200000
            },
            dependents: [
                { name: 'Trần Văn M', relationship: 'Con', birthYear: '2016' }
            ]
        },
        {
            employeeId: 'NV003',
            totalIncome: 300000000,
            totalDeduction: 237600000,
            totalTax: 6000000,
            totalInsurance: {
                health: 3000000,
                social: 6000000,
                unemployment: 1500000
            },
            dependents: [
                { name: 'Lê Thị N', relationship: 'Vợ', birthYear: '1990' },
                { name: 'Lê Văn P', relationship: 'Con', birthYear: '2019' }
            ]
        },
        {
            employeeId: 'NV004',
            totalIncome: 156000000,
            totalDeduction: 132000000,
            totalTax: 1200000,
            totalInsurance: {
                health: 1560000,
                social: 3120000,
                unemployment: 780000
            },
            dependents: []
        },
        {
            employeeId: 'NV005',
            totalIncome: 420000000,
            totalDeduction: 290400000,
            totalTax: 12000000,
            totalInsurance: {
                health: 4200000,
                social: 8400000,
                unemployment: 2100000
            },
            dependents: [
                { name: 'Hoàng Thị Q', relationship: 'Vợ', birthYear: '1992' },
                { name: 'Hoàng Văn R', relationship: 'Con', birthYear: '2017' },
                { name: 'Hoàng Thị S', relationship: 'Con', birthYear: '2020' }
            ]
        }
    ],
    2022: [
        // Thêm dữ liệu tương tự cho năm 2022
        {
            employeeId: 'NV001',
            totalIncome: 160000000,
            totalDeduction: 132000000,
            totalTax: 1800000,
            totalInsurance: {
                health: 1600000,
                social: 3200000,
                unemployment: 800000
            },
            dependents: [
                { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
            ]
        },
        {
            employeeId: 'NV002',
            totalIncome: 220000000,
            totalDeduction: 184800000,
            totalTax: 4200000,
            totalInsurance: {
                health: 2200000,
                social: 4400000,
                unemployment: 1100000
            },
            dependents: [
                { name: 'Trần Văn M', relationship: 'Con', birthYear: '2016' }
            ]
        }
    ],
    2021: [
        // Thêm dữ liệu tương tự cho năm 2021
        {
            employeeId: 'NV001',
            totalIncome: 150000000,
            totalDeduction: 132000000,
            totalTax: 1500000,
            totalInsurance: {
                health: 1500000,
                social: 3000000,
                unemployment: 750000
            },
            dependents: [
                { name: 'Nguyễn Thị X', relationship: 'Con', birthYear: '2015' }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded'); // Kiểm tra xem script có được chạy không
    console.log('mockEmployees:', mockEmployees); // Kiểm tra dữ liệu nhân viên
    console.log('mockAnnualData:', mockAnnualData); // Kiểm tra dữ liệu quyết toán

    initializeFilters();
    loadAnnualReport();

    // Thêm event listeners
    document.getElementById('yearSelect').addEventListener('change', loadAnnualReport);
    document.getElementById('employeeSelect').addEventListener('change', loadAnnualReport);

    // Thêm xử lý tìm kiếm
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const tableBody = document.getElementById('annualReportTableBody');
        const rows = tableBody.getElementsByTagName('tr');

        for (let row of rows) {
            const employeeId = row.cells[0].textContent.toLowerCase();
            const employeeName = row.cells[1].textContent.toLowerCase();

            if (employeeId.includes(searchTerm) || employeeName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }

        updateSummaryBasedOnVisibleRows();
    });

    function updateSummaryBasedOnVisibleRows() {
        const tableBody = document.getElementById('annualReportTableBody');
        const visibleRows = Array.from(tableBody.getElementsByTagName('tr'))
            .filter(row => row.style.display !== 'none');

        let totalIncome = 0;
        let totalDeduction = 0;
        let totalTax = 0;

        visibleRows.forEach(row => {
            totalIncome += parseFloat(row.cells[2].textContent.replace(/[^\d.-]/g, ''));
            totalDeduction += parseFloat(row.cells[3].textContent.replace(/[^\d.-]/g, ''));
            totalTax += parseFloat(row.cells[5].textContent.replace(/[^\d.-]/g, ''));
        });

        document.getElementById('totalAnnualIncome').textContent = formatCurrency(totalIncome);
        document.getElementById('totalAnnualDeduction').textContent = formatCurrency(totalDeduction);
        document.getElementById('totalAnnualTax').textContent = formatCurrency(totalTax);
        document.getElementById('employeeCount').textContent = visibleRows.length;
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
});

function initializeFilters() {
    // Khởi tạo select năm
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i <= currentYear; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Năm ${i}`;
        if (i === currentYear) option.selected = true;
        yearSelect.appendChild(option);
    }

    // Khởi tạo select nhân viên
    const employeeSelect = document.getElementById('employeeSelect');
    mockEmployees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = `${emp.id} - ${emp.name}`;
        employeeSelect.appendChild(option);
    });
}

function loadAnnualReport() {
    const year = parseInt(document.getElementById('yearSelect').value);
    const employeeId = document.getElementById('employeeSelect').value;
    document.getElementById('selectedYear').textContent = year;

    let yearData = mockAnnualData[year] || [];
    console.log('Year Data:', yearData); // Thêm log để kiểm tra dữ liệu

    if (employeeId) {
        yearData = yearData.filter(data => data.employeeId === employeeId);
    }
    console.log('Filtered Data:', yearData); // Thêm log để kiểm tra dữ liệu sau khi lọc

    updateSummary(yearData);
    updateReportTable(yearData);
}

function updateSummary(data) {
    const totalIncome = data.reduce((sum, item) => sum + item.totalIncome, 0);
    const totalDeduction = data.reduce((sum, item) => sum + item.totalDeduction, 0);
    const totalTax = data.reduce((sum, item) => sum + item.totalTax, 0);

    document.getElementById('totalAnnualIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalAnnualDeduction').textContent = formatCurrency(totalDeduction);
    document.getElementById('totalAnnualTax').textContent = formatCurrency(totalTax);
    document.getElementById('employeeCount').textContent = data.length;
}

function updateReportTable(data) {
    console.log('Updating table with data:', data); // Thêm log để kiểm tra
    const tableBody = document.getElementById('annualReportTableBody');
    if (!tableBody) {
        console.error('Table body element not found!'); // Kiểm tra xem có tìm thấy element không
        return;
    }
    tableBody.innerHTML = '';

    data.forEach(item => {
        const employee = mockEmployees.find(emp => emp.id === item.employeeId);
        console.log('Processing employee:', employee); // Thêm log để kiểm tra từng nhân viên

        const totalInsurance = item.totalInsurance.health +
            item.totalInsurance.social +
            item.totalInsurance.unemployment;
        const taxableIncome = item.totalIncome - totalInsurance - item.totalDeduction;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.employeeId}</td>
            <td>${employee ? employee.name : 'N/A'}</td>
            <td>${formatCurrency(item.totalIncome)}</td>
            <td>${formatCurrency(item.totalDeduction)}</td>
            <td>${formatCurrency(taxableIncome)}</td>
            <td>${formatCurrency(item.totalTax)}</td>
            <td class="no-print">
                <button class="btn btn-sm btn-info" onclick="showAnnualDetail('${item.employeeId}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function showAnnualDetail(employeeId) {
    const year = document.getElementById('yearSelect').value;
    const yearData = mockAnnualData[year];
    const employeeData = yearData.find(data => data.employeeId === employeeId);
    const employee = mockEmployees.find(emp => emp.id === employeeId);

    if (!employeeData || !employee) return;

    const totalInsurance = employeeData.totalInsurance.health +
        employeeData.totalInsurance.social +
        employeeData.totalInsurance.unemployment;
    const taxableIncome = employeeData.totalIncome - totalInsurance - employeeData.totalDeduction;

    const content = `
        <div class="annual-details">
            <h4 class="mb-4">${employee.name} - Quyết toán năm ${year}</h4>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <h5 class="text-primary">Thu nhập cả năm</h5>
                    <p>Tổng thu nhập: ${formatCurrency(employeeData.totalIncome)}</p>
                    <p>Thu nhập tính thuế: ${formatCurrency(taxableIncome)}</p>
                </div>
                <div class="col-md-6">
                    <h5 class="text-danger">Tổng các khoản giảm trừ</h5>
                    <p>BHYT: ${formatCurrency(employeeData.totalInsurance.health)}</p>
                    <p>BHXH: ${formatCurrency(employeeData.totalInsurance.social)}</p>
                    <p>BHTN: ${formatCurrency(employeeData.totalInsurance.unemployment)}</p>
                </div>
            </div>

            <h5 class="text-info">Giảm trừ gia cảnh</h5>
            <div class="table-responsive mb-4">
                <table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>Đối tượng</th>
                            <th>Mối quan hệ</th>
                            <th>Mã số thuế/Năm sinh</th>
                            <th>Mức giảm trừ/năm</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bản thân</td>
                            <td>-</td>
                            <td>${employeeId}</td>
                            <td>${formatCurrency(132000000)}</td>
                        </tr>
                        ${employeeData.dependents.map(dependent => `
                            <tr>
                                <td>${dependent.name}</td>
                                <td>${dependent.relationship}</td>
                                <td>${dependent.taxCode || dependent.birthYear || '-'}</td>
                                <td>${formatCurrency(52800000)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr class="table-info">
                            <td colspan="3"><strong>Tổng giảm trừ gia cảnh:</strong></td>
                            <td><strong>${formatCurrency(employeeData.totalDeduction)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="row">
                <div class="col-12">
                    <h4 class="text-success">Tổng thuế TNCN phải nộp: ${formatCurrency(employeeData.totalTax)}</h4>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detailModalContent').innerHTML = content;
    $('#detailModal').modal('show');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Xử lý responsive menu
document.getElementById('toggleMenu')?.addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.main-content').classList.toggle('shifted');
});
