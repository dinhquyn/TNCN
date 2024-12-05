// Thêm vào file database.js

// Dữ liệu lương giả lập
const mockSalaryData = {
    'NV001': [
        {
            id: 'S001',
            employeeId: 'NV001',
            date: '2024-01-15',
            baseSalary: 15000000,
            allowance: 2000000,
            overtimePay: 1000000,
            bonus: 1500000,
            insurance: {
                health: 225000,    // 1.5% BHYT
                social: 1200000,   // 8% BHXH
                unemployment: 150000 // 1% BHTN
            },
            status: 'Đã duyệt',
            note: 'Lương tháng 1/2024'
        },
        {
            id: 'S002',
            employeeId: 'NV001',
            date: '2024-02-15',
            baseSalary: 15000000,
            allowance: 2000000,
            overtimePay: 1800000,
            bonus: 0,
            insurance: {
                health: 225000,
                social: 1200000,
                unemployment: 150000
            },
            status: 'Đã duyệt',
            note: 'Lương tháng 2/2024'
        },
        {
            id: 'S003',
            employeeId: 'NV001',
            date: '2024-03-15',
            baseSalary: 15000000,
            allowance: 2000000,
            overtimePay: 1200000,
            bonus: 2000000,
            insurance: {
                health: 225000,
                social: 1200000,
                unemployment: 150000
            },
            status: 'Đã duyệt',
            note: 'Lương tháng 3/2024'
        }
    ],
    'NV002': [
        // Dữ liệu cho nhân viên khác...
    ]
};

// Dữ liệu thuế giả lập
const mockTaxData = {
    'NV001': [
        {
            id: 'T001',
            employeeId: 'NV001',
            date: '2024-01-15',
            totalIncome: 19500000, // Lương + phụ cấp + làm thêm + thưởng
            deductions: {
                personal: 11000000,
                dependent: 4400000,
                insurance: 1575000,
                charity: 1000000
            },
            taxableIncome: 1525000,
            taxAmount: 76250, // 5% của thu nhập tính thuế
            status: 'Đã nộp',
            note: 'Thuế TNCN tháng 1/2024'
        },
        {
            id: 'T002',
            employeeId: 'NV001',
            date: '2024-02-15',
            totalIncome: 18800000,
            deductions: {
                personal: 11000000,
                dependent: 4400000,
                insurance: 1575000,
                charity: 500000
            },
            taxableIncome: 1325000,
            taxAmount: 66250,
            status: 'Đã nộp',
            note: 'Thuế TNCN tháng 2/2024'
        },
        {
            id: 'T003',
            employeeId: 'NV001',
            date: '2024-03-15',
            totalIncome: 20200000,
            deductions: {
                personal: 11000000,
                dependent: 4400000,
                insurance: 1575000,
                charity: 1500000
            },
            taxableIncome: 1725000,
            taxAmount: 86250,
            status: 'Đã nộp',
            note: 'Thuế TNCN tháng 3/2024'
        }
    ],
    'NV002': [
        // Dữ liệu cho nhân viên khác...
    ]
};

// Thêm dữ liệu người phụ thuộc
const mockDependentData = {
    'NV001': [
        {
            id: 'D001',
            employeeId: 'NV001',
            fullName: 'Nguyễn Văn B',
            relationship: 'Con',
            taxCode: null,
            birthDate: '2015-05-20',
            startDate: '2024-01-01',
            status: 'Đang phụ thuộc'
        }
    ]
};

// Hàm lấy dữ liệu lương theo ID nhân viên
export async function getSalaryDataByEmployeeId(employeeId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const salaryData = mockSalaryData[employeeId] || [];
            resolve(salaryData);
        }, 300); // Giả lập độ trễ mạng
    });
}

// Hàm lấy dữ liệu thuế theo ID nhân viên
export async function getTaxDataByEmployeeId(employeeId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const taxData = mockTaxData[employeeId] || [];
            resolve(taxData);
        }, 300);
    });
}

// Hàm lấy dữ liệu người phụ thuộc theo ID nhân viên
export async function getDependentsByEmployeeId(employeeId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const dependentData = mockDependentData[employeeId] || [];
            resolve(dependentData);
        }, 300);
    });
}

// Hàm tạo dữ liệu lương mới
export async function createSalaryData(salaryData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const employeeId = salaryData.employeeId;
            if (!mockSalaryData[employeeId]) {
                mockSalaryData[employeeId] = [];
            }

            const newSalary = {
                id: `S${Date.now()}`,
                ...salaryData,
                status: 'Chờ duyệt'
            };

            mockSalaryData[employeeId].push(newSalary);
            resolve(newSalary);
        }, 300);
    });
}

// Hàm tạo dữ liệu thuế mới
export async function createTaxData(taxData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const employeeId = taxData.employeeId;
            if (!mockTaxData[employeeId]) {
                mockTaxData[employeeId] = [];
            }

            const newTax = {
                id: `T${Date.now()}`,
                ...taxData,
                status: 'Chờ duyệt'
            };

            mockTaxData[employeeId].push(newTax);
            resolve(newTax);
        }, 300);
    });
}

// Hàm cập nhật trạng thái lương
export async function updateSalaryStatus(employeeId, salaryId, newStatus) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const salaryList = mockSalaryData[employeeId];
            const salaryIndex = salaryList.findIndex(s => s.id === salaryId);

            if (salaryIndex === -1) {
                reject(new Error('Không tìm thấy dữ liệu lương'));
                return;
            }

            salaryList[salaryIndex].status = newStatus;
            resolve(salaryList[salaryIndex]);
        }, 300);
    });
}

// Hàm cập nhật trạng thái thuế
export async function updateTaxStatus(employeeId, taxId, newStatus) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const taxList = mockTaxData[employeeId];
            const taxIndex = taxList.findIndex(t => t.id === taxId);

            if (taxIndex === -1) {
                reject(new Error('Không tìm thấy dữ liệu thuế'));
                return;
            }

            taxList[taxIndex].status = newStatus;
            resolve(taxList[taxIndex]);
        }, 300);
    });
}

// Thêm các hằng số cho các loại giảm trừ
export const DEDUCTION_TYPES = {
    PERSONAL: 11000000, // Giảm trừ bản thân
    DEPENDENT: 4400000,  // Giảm trừ người phụ thuộc
    INSURANCE: {
        HEALTH: 0.015,    // 1.5% BHYT
        SOCIAL: 0.08,     // 8% BHXH
        UNEMPLOYMENT: 0.01 // 1% BHTN
    }
};

// Thêm các hằng số cho thuế suất theo bậc thu nhập
export const TAX_RATES = [
    { from: 0, to: 5000000, rate: 0.05 },
    { from: 5000000, to: 10000000, rate: 0.10 },
    { from: 10000000, to: 18000000, rate: 0.15 },
    { from: 18000000, to: 32000000, rate: 0.20 },
    { from: 32000000, to: 52000000, rate: 0.25 },
    { from: 52000000, to: 80000000, rate: 0.30 },
    { from: 80000000, to: Infinity, rate: 0.35 }
];

// Thêm các hàm tính toán thuế và bảo hiểm
export function calculateInsurance(baseSalary) {
    return {
        health: baseSalary * DEDUCTION_TYPES.INSURANCE.HEALTH,
        social: baseSalary * DEDUCTION_TYPES.INSURANCE.SOCIAL,
        unemployment: baseSalary * DEDUCTION_TYPES.INSURANCE.UNEMPLOYMENT
    };
}

export function calculateTaxableIncome(totalIncome, totalDeductions) {
    return Math.max(0, totalIncome - totalDeductions);
}

export function calculateTax(taxableIncome) {
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of TAX_RATES) {
        if (remainingIncome <= 0) break;

        const taxableAmount = Math.min(remainingIncome, bracket.to - bracket.from);
        tax += taxableAmount * bracket.rate;
        remainingIncome -= taxableAmount;
    }

    return tax;
}
