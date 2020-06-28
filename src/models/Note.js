export default class Note {
    constructor(id = (+new Date()).toString(), title = '', todos = []){
        this.id = id;
        this.title = title;
        this.todos = todos;
    }
}