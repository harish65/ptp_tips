var moment = require("moment-timezone")

var getStripeProduct = (plan) => {
    if (plan === 'month') {
        var today = moment().tz('Australia/Sydney').format("YYYY-MM-DD HH:mm:ss")
        var fourteen = moment(today).add(14, 'days')
        var fourteenDays = moment(fourteen).unix()
        return {
            price: 4995,
            title: 'monthly subscription',
            //id: 'price_1HWzoiBw4PJJ3ODnXvp2l4lK'
            id: 'price_1HZElKBw4PJJ3ODnYARkVBvd',
            trial_period: fourteenDays
        }
    } if (plan === 'direct') {
        return {
            price: 4995,
            title: 'month direct',
            //id: 'price_1HWzoiBw4PJJ3ODnXvp2l4lK'
            id: 'price_1HaSBsBw4PJJ3ODnuOtsFdTg',
            trial_period: 'now'
        }
    } else if (plan === '3months') {
        return {
            price: 14900,
            title: '3 Months subscription',
            //id: 'price_1HWzq5Bw4PJJ3ODnGHjz4qGu'
            id: 'price_1HZEljBw4PJJ3ODnfzuuobvl',
            trial_period: 'now'
        }
    }
    else if (plan === '6months') {
        return {
            price: 23900,
            title: '6 Months subscription',
            //id: 'price_1HWzqcBw4PJJ3ODnnEWXBBzm'
            id: 'price_1HZEmBBw4PJJ3ODnbmhtXhNS',
            trial_period: 'now'
        }
    }
    else if (plan === 'year') {
        return {
            price: 33900,
            title: 'yearly subscription',
            //id: 'price_1HWzr4Bw4PJJ3ODn1DNgzxB4'
            id: 'price_1HZEmfBw4PJJ3ODn5YCFnnKu',
            trial_period: 'now'
        }
    }
    else if (plan === 'test') {
        return {
            price: 100,
            title: 'test subscription',
            id: 'price_1HX2rHBw4PJJ3ODnGcbib17V',
            trial_period: 'now'
        }
    }
}

module.exports = getStripeProduct;
