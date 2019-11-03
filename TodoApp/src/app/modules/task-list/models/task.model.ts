export class Task {
    
    public id: number;
    public userId: number;
    public title: string;
    public description: string;
    public isComplete: boolean;

    constructor(id: number = null, userId: number = null, title: string = null, description: string = null, completed: boolean = null){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.isComplete = completed;
    }

}