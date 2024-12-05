// Dữ liệu mẫu cho toàn bộ hệ thống
const mockData = {
    // Dữ liệu phòng ban
    departments: [
        {
            id: 'KT001',
            name: 'Phòng Kế Toán',
            employees: ['KT001', 'KT002', 'KT003']
        },
        {
            id: 'KD001',
            name: 'Phòng Kinh Doanh',
            employees: ['KD001', 'KD002', 'KD003', 'KD004']
        },
        {
            id: 'NS001',
            name: 'Phòng Nhân Sự',
            employees: ['NS001', 'NS002', 'NS003']
        },
        {
            id: 'IT001',
            name: 'Phòng IT',
            employees: ['IT001', 'IT002', 'IT003', 'IT004']
        },
        {
            id: 'MK001',
            name: 'Phòng Marketing',
            employees: ['MK001', 'MK002', 'MK003']
        }
    ],

    // Dữ liệu nhân viên
    employees: [
        // Phòng Kế Toán
        {
            id: 'KT001',
            name: 'Lê Thị C',
            department: 'KT001',
            position: 'Kế toán trưởng',
            dependents: 2,
            basicSalary: 25000000
        },
        {
            id: 'KT002',
            name: 'Nguyễn Văn D',
            department: 'KT001',
            position: 'Kế toán viên',
            dependents: 1,
            basicSalary: 15000000
        },
        {
            id: 'KT003',
            name: 'Trần Thị E',
            department: 'KT001',
            position: 'Kế toán viên',
            dependents: 0,
            basicSalary: 15000000
        },

        // Phòng Kinh Doanh
        {
            id: 'KD001',
            name: 'Phạm Văn F',
            department: 'KD001',
            position: 'Trưởng phòng Kinh doanh',
            dependents: 2,
            basicSalary: 30000000
        },
        {
            id: 'KD002',
            name: 'Hoàng Thị G',
            department: 'KD001',
            position: 'Nhân viên kinh doanh',
            dependents: 1,
            basicSalary: 18000000
        },
        {
            id: 'KD003',
            name: 'Đỗ Văn H',
            department: 'KD001',
            position: 'Nhân viên kinh doanh',
            dependents: 1,
            basicSalary: 18000000
        },
        {
            id: 'KD004',
            name: 'Ngô Thị I',
            department: 'KD001',
            position: 'Nhân viên kinh doanh',
            dependents: 0,
            basicSalary: 18000000
        }
        // Thêm dữ liệu cho các phòng ban khác...
    ],

    // Dữ liệu lương và thuế theo tháng
    salaryData: [
        // Tháng 1/2024
        {
            employeeId: 'KT001',
            month: 1,
            year: 2024,
            basicSalary: 25000000,
            allowance: 5000000,
            bonus: 3000000,
            insurance: {
                health: 750000,
                social: 1750000,
                unemployment: 250000
            },
            dependentDeduction: 8800000, // 4.4tr/người phụ thuộc
            personalDeduction: 11000000,
            taxableIncome: 28000000,
            tax: 4200000,
            netSalary: 23800000
        },
        {
            employeeId: 'KT002',
            month: 1,
            year: 2024,
            basicSalary: 15000000,
            allowance: 2000000,
            bonus: 1500000,
            insurance: {
                health: 450000,
                social: 1050000,
                unemployment: 150000
            },
            dependentDeduction: 4400000,
            personalDeduction: 11000000,
            taxableIncome: 15500000,
            tax: 1550000,
            netSalary: 13950000
        },
        // Tháng 2/2024
        {
            employeeId: 'KT001',
            month: 2,
            year: 2024,
            basicSalary: 25000000,
            allowance: 5000000,
            bonus: 4000000,
            insurance: {
                health: 750000,
                social: 1750000,
                unemployment: 250000
            },
            dependentDeduction: 8800000,
            personalDeduction: 11000000,
            taxableIncome: 29000000,
            tax: 4350000,
            netSalary: 24650000
        },
        {
            employeeId: 'KT002',
            month: 2,
            year: 2024,
            basicSalary: 15000000,
            allowance: 2000000,
            bonus: 2000000,
            insurance: {
                health: 450000,
                social: 1050000,
                unemployment: 150000
            },
            dependentDeduction: 4400000,
            personalDeduction: 11000000,
            taxableIncome: 16000000,
            tax: 1600000,
            netSalary: 14400000
        },

        // Phòng Kinh Doanh - Tháng 1/2024
        {
            employeeId: 'KD001',
            month: 1,
            year: 2024,
            basicSalary: 30000000,
            allowance: 6000000,
            bonus: 5000000,
            insurance: {
                health: 900000,
                social: 2100000,
                unemployment: 300000
            },
            dependentDeduction: 8800000,
            personalDeduction: 11000000,
            taxableIncome: 35000000,
            tax: 5250000,
            netSalary: 29750000
        },
        {
            employeeId: 'KD002',
            month: 1,
            year: 2024,
            basicSalary: 18000000,
            allowance: 3000000,
            bonus: 2500000,
            insurance: {
                health: 540000,
                social: 1260000,
                unemployment: 180000
            },
            dependentDeduction: 4400000,
            personalDeduction: 11000000,
            taxableIncome: 20000000,
            tax: 2000000,
            netSalary: 18000000
        },

        // Phòng Kinh Doanh - Tháng 2/2024
        {
            employeeId: 'KD001',
            month: 2,
            year: 2024,
            basicSalary: 30000000,
            allowance: 6000000,
            bonus: 6000000,
            insurance: {
                health: 900000,
                social: 2100000,
                unemployment: 300000
            },
            dependentDeduction: 8800000,
            personalDeduction: 11000000,
            taxableIncome: 36000000,
            tax: 5400000,
            netSalary: 30600000
        },
        {
            employeeId: 'KD002',
            month: 2,
            year: 2024,
            basicSalary: 18000000,
            allowance: 3000000,
            bonus: 3000000,
            insurance: {
                health: 540000,
                social: 1260000,
                unemployment: 180000
            },
            dependentDeduction: 4400000,
            personalDeduction: 11000000,
            taxableIncome: 20500000,
            tax: 2050000,
            netSalary: 18450000
        }
        // Có thể thêm dữ liệu cho các tháng và nhân viên khác...
    ],

    // Dữ liệu giảm trừ
    deductionRules: {
        personal: 11000000, // Giảm trừ bản thân
        dependent: 4400000, // Giảm trừ người phụ thuộc
        insurance: {
            health: 0.015, // 1.5% lương
            social: 0.08,  // 8% lương
            unemployment: 0.01 // 1% lương
        }
    },

    // Biểu thuế lũy tiến
    taxRates: [
        { from: 0, to: 5000000, rate: 0.05 },
        { from: 5000000, to: 10000000, rate: 0.1 },
        { from: 10000000, to: 18000000, rate: 0.15 },
        { from: 18000000, to: 32000000, rate: 0.2 },
        { from: 32000000, to: 52000000, rate: 0.25 },
        { from: 52000000, to: 80000000, rate: 0.3 },
        { from: 80000000, to: Infinity, rate: 0.35 }
    ],

    // Dữ liệu quyết toán thuế năm
    annualTaxData: {
        2024: {
            // Phòng Kế Toán
            'KT001': {
                totalIncome: 330000000, // Tổng thu nhập cả năm
                totalDeduction: 237600000, // Tổng giảm trừ
                totalInsurance: {
                    health: 9000000,
                    social: 21000000,
                    unemployment: 3000000
                },
                dependents: [
                    { name: 'Lê Văn X', relationship: 'Con', birthYear: 2015 },
                    { name: 'Lê Thị Y', relationship: 'Con', birthYear: 2018 }
                ],
                monthlyTax: [
                    { month: 1, tax: 4200000 },
                    { month: 2, tax: 4350000 }
                    // ... các tháng khác
                ],
                finalTax: 51000000 // Tổng thuế cả năm
            },
            'KT002': {
                totalIncome: 198000000,
                totalDeduction: 184800000,
                totalInsurance: {
                    health: 5400000,
                    social: 12600000,
                    unemployment: 1800000
                },
                dependents: [
                    { name: 'Nguyễn Văn Z', relationship: 'Con', birthYear: 2020 }
                ],
                monthlyTax: [
                    { month: 1, tax: 1550000 },
                    { month: 2, tax: 1600000 }
                    // ... các tháng khác
                ],
                finalTax: 18900000
            },

            // Phòng Kinh Doanh
            'KD001': {
                totalIncome: 420000000,
                totalDeduction: 237600000,
                totalInsurance: {
                    health: 10800000,
                    social: 25200000,
                    unemployment: 3600000
                },
                dependents: [
                    { name: 'Phạm Văn M', relationship: 'Con', birthYear: 2016 },
                    { name: 'Phạm Thị N', relationship: 'Con', birthYear: 2019 }
                ],
                monthlyTax: [
                    { month: 1, tax: 5250000 },
                    { month: 2, tax: 5400000 }
                    // ... các tháng khác
                ],
                finalTax: 64200000
            }
            // Có thể thêm dữ liệu cho các nhân viên khác...
        }
        // Có thể thêm dữ liệu cho các năm khác...
    }
};

// Khởi tạo dữ liệu khi trang web được load
function initializeMockData() {
    if (!localStorage.getItem('salaryReports')) {
        localStorage.setItem('salaryReports', JSON.stringify(mockData));
    }
}

// Hàm tính thuế thu nhập cá nhân
function calculatePersonalIncomeTax(taxableIncome) {
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of mockData.taxRates) {
        const taxableAmount = Math.min(
            remainingIncome,
            bracket.to ? bracket.to - bracket.from : remainingIncome
        );

        if (taxableAmount <= 0) break;

        tax += taxableAmount * bracket.rate;
        remainingIncome -= taxableAmount;
    }

    return tax;
}

// Hàm tính bảo hiểm
function calculateInsurance(basicSalary) {
    const rules = mockData.deductionRules.insurance;
    return {
        health: basicSalary * rules.health,
        social: basicSalary * rules.social,
        unemployment: basicSalary * rules.unemployment
    };
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
} 