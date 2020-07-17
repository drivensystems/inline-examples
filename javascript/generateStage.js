const recurrenceCalculate =  require('./recurrenceCalculate')

const fullAmount = stages => Math.round(stages.reduce((carry, stage) => carry + (stage.amount * stage.duration), 0) * 100) / 100
const getRandom = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100


const purchaseAmount = getRandom(700, 5000) // random $ value, must be > 500 to pass last example
const examples = [
    {
        description: '10 Simple monthly payments',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1, // -1 is used in the calc function to breakdown
                description: 'Monthly Payment', // anything helpful to the customer
                duration: 10, // how many payments?
                frequency: 1, // how many of the period types to apply
                period: 'Month',
                withdrawDay: 'sale',
            }
        ]
    },
    {
        description: 'Single Payment',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1, // -1 is used in the calc function to breakdown
                description: 'Full Payment', // anything helpful to the customer
                duration: 1, // how many payments?
                frequency: 1, // how many of the period types to apply
                period: 'Day',
                withdrawDay: 'sale',
            }
        ]
    },
    {
        description: '26 Weekly Payments',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1, // -1 is used in the calc function to breakdown
                description: 'Weekly Payment', // anything helpful to the customer
                duration: 26, // how many payments?
                frequency: 1, // how many of the period types to apply
                period: 'Week',
                withdrawDay: 'sale',
            }
        ]
    },
    {
        description: '13 Fortnightly Payments',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1, // -1 is used in the calc function to breakdown
                description: 'Fortnightly Payment', // anything helpful to the customer
                duration: 13, // how many payments?
                frequency: 2, // how many of the period types to apply
                period: 'Week',
                withdrawDay: 'sale',
            }
        ]
    },
    {
        description: '500 upfront then 5 monthly Payments',
        amount: purchaseAmount,
        stages: [
            {
                amount: 500, // -1 is used in the calc function to breakdown
                description: 'Deposit', // anything helpful to the customer
                duration: 1, // how many payments?
                frequency: 1, // how many of the period types to apply
                period: 'Month',
                withdrawDay: 'sale',
            },
            {
                amount: -1, // -1 is used in the calc function to breakdown
                description: 'Monthly Payment', // anything helpful to the customer
                duration: 12, // how many payments?
                frequency: 1, // how many of the period types to apply
                period: 'Month',
                withdrawDay: 'sale',
            }
        ]
    }
]

examples.forEach(({ description, amount, stages }) => {
    console.log("\n\n", description)
    const result = recurrenceCalculate(stages, amount)
    const total = fullAmount(result)
    console.log(result)
    console.log(total)
    console.log('Valid:', total === amount)
})
