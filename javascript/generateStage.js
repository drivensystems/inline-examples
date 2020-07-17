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
                amount: -1, // -1 indicates that this stage will be used to break down the remaining amount
                description: 'Monthly Payment', // anything helpful to the customer
                duration: 10, // represents the number of payments
                frequency: 1, // the period frequency, e.g. 1 = every period, 2 = every second period, etc.
                period: 'Month', // Day, Week, Month, Year
                withdrawDay: 'sale', // payments start on agreement date
            }
        ]
    },
    {
        description: 'Single Payment',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1,
                description: 'Full Payment',
                duration: 1,
                frequency: 1,
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
                amount: -1,
                description: 'Weekly Payment',
                duration: 26,
                frequency: 1,
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
                amount: -1,
                description: 'Fortnightly Payment',
                duration: 13,
                frequency: 2,
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
                amount: 500, // We always have a $500 payment upfront
                description: 'Deposit',
                duration: 1,
                frequency: 1,
                period: 'Month',
                withdrawDay: 'sale',
            },
            {
                amount: -1,
                description: 'Monthly Payment',
                duration: 12,
                frequency: 1,
                period: 'Month',
                withdrawDay: 'sale',
            }
        ]
    },
    {
        description: '5 Monthly Payments with balloon',
        amount: purchaseAmount,
        stages: [
            {
                amount: -1,
                description: 'Monthly Payment',
                duration: 12,
                frequency: 1,
                period: 'Month',
                withdrawDay: 'sale',
            },
            {
                amount: 500, // finish up with a final baloon payment
                description: 'Balloon',
                duration: 1,
                frequency: 1,
                period: 'Month',
                withdrawDay: 'sale',
            },
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
