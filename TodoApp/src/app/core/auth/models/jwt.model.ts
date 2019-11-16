export class JWT {
    public token: string;
    public refreshToken: string;
    
    constructor(token: string = null, refreshToken: string = null) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}