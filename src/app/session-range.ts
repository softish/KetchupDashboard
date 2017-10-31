export class SessionRange {
    userId: number;
    endOfRangeDate: string;
    
    constructor(userId: number, endOfRangeDate: string) {
        this.userId = userId;
        this.endOfRangeDate = endOfRangeDate;
    }
}
