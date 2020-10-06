export enum MEMBER_TYPE {
    host = "Host",
    member = "Member"
}

export enum MEMBER_ROLE {
    developer = "Developer",
    designer = "Designer",
    qa = "Q/A"
}

export enum PROJECT_STATUS {
    active = "Active",
    inactive = "Inactive",
    passed = "Passed"
}

export enum PROJECT_PRIORITY {
    low,
    normal,
    urgent
}

export enum BILLING_TYPE {
    one_time = "One Time",
    hourly = "Hourly",
}

export enum REQUEST_TYPE {
    join,
    timesheet,
    invoice,
    terminate
}

export const CURRENCY = {
    usd: { country: "USA", name: "USD", sign: "$", ratio: 1 },
    inr: { country: "India", name: "INR", sign: "₹", ratio: 70 }
};


export function GETWEEKNUMBER( d: Date ): number {
    var tdt = new Date( d.valueOf() );
    var dayn = (d.getDay() + 6) % 7;
    tdt.setDate( tdt.getDate() - dayn + 3 );
    var firstThursday = tdt.valueOf();
    tdt.setMonth( 0, 1 );
    if ( tdt.getDay() !== 4 ) {
        tdt.setMonth( 0, 1 + ((4 - tdt.getDay()) + 7) % 7 );
    }
    return 1 + Math.ceil( (firstThursday - tdt.valueOf()) / 604800000 );
}

export function GETDATERANGEOFWEEK( weekNo: number ) {
    weekNo++;
    const d1 = new Date();
    const numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate( d1.getDate() - numOfdaysPastSinceLastMonday );
    const weekNoToday = GETWEEKNUMBER( d1 );
    const weeksInTheFuture = weekNo - weekNoToday;
    d1.setDate( d1.getDate() + 7 * weeksInTheFuture );
    const rangeIsFrom = (d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    const monday = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() );
    const tuesday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 1 );
    const wednesday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 2 );
    const thursday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 3 );
    const friday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 4 );
    const saturday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 5 );
    const sunday: Date = new Date( d1.getFullYear(), d1.getMonth(), d1.getDate() + 6 );

    return [ monday,
             tuesday,
             wednesday,
             thursday,
             friday,
             saturday,
             sunday ];
}
