export default class Todo {
    constructor(id = (+new Date()).toString(), title = '', done = false){
        this.id = id;
        this.title = title;
        this.done = done;
    }
}