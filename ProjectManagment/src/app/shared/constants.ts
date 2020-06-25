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
    hourly = "Hourly"
}

export function GETWEEKNUMBER( d: Date ): number {
    // Copy date so don't modify original
    d = new Date( +d );
    d.setHours( 0, 0, 0 );
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate( d.getDate() + 4 - (d.getDay() || 7) );
    // Get first day of year
    var yearStart = new Date( d.getFullYear(), 0, 1 );
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil( (((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7 );
    // Return array of year and week number
    return weekNo;
}
