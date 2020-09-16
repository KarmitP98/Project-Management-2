export class UserModel {
    public uId: string;
    public uName: string;
    public uEmail: string;
    public uPassword: string;
}

export class ClientModel {
    public cId: string;
    public cName: string;
    public cCountry: string;
    public pIds: string[];
    public cEmail: string;
    public cCompany?: string;
}

export class ProjectModel {
    public pId: string;
    public cId: string;
    public pName: string;
    public pDesc: string;
    public pStatus: string;
    public pStartDate: Date;
    public pDeadline: Date;
    public pBillingType: string;
    public pBudget: number;
    public pMembers: MemberModel[];
    public pMemberIds: string[];
    public pHId: string;
}

export class MemberModel {
    public mId: string;
    public mUId: string;
    public mName: string;
    public mType: string;
    public mRole: string;
    public mBillingType: string;
    public mRate: number;
    public mWeekLog: WeeklyWorkLog[];
    public mRequests: RequestModel[];
    public mInvoices: InvoiceModel[];
    public mPaid: number;
    public mEarned: number;
}

export class WeeklyWorkLog {
    public weekNumber: number;
    public mId: string;
    public dailyLog: DailyWorkLog[];
    public approved: boolean;
    public billed: boolean;
    public weeklyBilledHours: number;
    public weeklyUnBilledHours: number;
}

export class DailyWorkLog {
    public date: Date;
    public work: string;
    public dailyHours: number;
}

export class WorkModel {
    public startTime: Date;
    public endTime: Date;
    public hours: number;
    public work: string;
}

export class RequestModel {
    public to: string;
    public from: string;
    public mBillingType: string;
    public mRate: number;
    public requestText: string;
}

export class InvoiceModel {
    public iId: string;
    public iAmount: number;
    public iHours?: number;
}
