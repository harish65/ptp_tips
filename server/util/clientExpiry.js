var moment = require("moment-timezone")

var clientExpiry = (plan) =>{
    let now = moment().tz('Australia/Sydney').format("YYYY-MM-DD HH:mm:ss")
    var endSubscription

    if(plan === '2weeks'){
        endSubscription = moment(now).add(14, 'days').format("YYYY-MM-DD HH:mm:ss")
        return endSubscription
    }
    else if(plan === 'month'){
        endSubscription = moment(now).add(1, 'month').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
    else if(plan === '2months'){
        endSubscription = moment(now).add(2, 'month').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
    else if(plan === '3months'){
        endSubscription = moment(now).add(3, 'month').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
    else if(plan === '6months'){
        endSubscription = moment(now).add(6, 'month').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
    else if(plan === 'year'){
        endSubscription = moment(now).add(1, 'year').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
    else if(plan === 'test'){
        endSubscription = moment(now).add(1, 'day').format("YYYY-MM-DD HH:mm:ss");
        return endSubscription
    }
}

module.exports = clientExpiry; 
