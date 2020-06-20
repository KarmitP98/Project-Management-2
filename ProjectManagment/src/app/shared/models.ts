export class UserModel {
    constructor(
        public uId: string,
        public uName: string,
        public uEmail: string,
        public uPassword: string
    ) {}
}

export class ClientModel {

    constructor(
        public cId: string,
        public cName: string,
        public cCountry: string,
        public pIds: string[],
        public cCompany?: string
    ) {}
}

export class ProjectModel {
    constructor(
        public pId: string,
        public cId: string,
        public pName: string,
        public pDesc: string,
        public pStatus: string,
        public pStartDate: Date,
        public pDeadline: Date,
        public pBillingType: string,
        public pBudget: number,
        public pMembers: MemberModel[],
        public pMemberIds: string[]
    ) {}
}

export class MemberModel {
    constructor(
        public mId: string,
        public mUId: string,
        public mName: string,
        public mType: string,
        public mRole: string,
        public mBillingType: string,
        public mRate: number,
        public mRequests?: { to: string, from: string, content: string, seen: boolean, accepted: boolean }
    ) {}
}
