export class User {
    
    public id: number;
    public fullName: string;
    public role: string;

    constructor(id: number = null, fullName: string = null, role: string = null) {
        this.id = id;
        this.fullName = fullName;
        this.role = role;
    }

}