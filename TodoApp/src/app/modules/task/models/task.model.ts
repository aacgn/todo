export class Task {
    
    public id: number;
    public userName: string;
    public title: string;
    public description: string;
    public isComplete: boolean;

    constructor(id: number = null, userName: string = null, title: string = null, description: string = null, completed: boolean = null){
        this.id = id;
        this.userName = userName;
        this.title = title;
        this.description = description;
        this.isComplete = completed;
    }

}