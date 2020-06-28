<template>
    <div>
        <div class="addWrapper">
            <input class="input inputNote" v-model="note.title" type="text" placeholder="Type your note here" />
            <div v-for="(todo, key) in note.todos" :key="key" class="todoWrapper">
                <strong>To-do #{{key+1}}</strong> <input class="input" v-model="todo.title" placeholder="Type todo here"/><span @click="deleteTodo(key)" class="deleteBtn"></span>
            </div>
            <div class="plusBtnWrappr">
                <span @click="addTodo" class="plusBtn"></span><div @click="addTodo">add To-do</div>
            </div>
            <br />
            <span @click="saveNote" class="saveBtn"></span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Note from '../models/Note'
import Task from '../models/Todo'
import * as types from '../store/types';

export default {
    data(){
        return{
            note: new Note()
        }
    },
    computed:{
        ...mapGetters({
            notes: types.NOTES
        })
    },
    methods: {
        addTodo(){
            this.note.todos.push(new Task());
        },
        deleteTodo(index){
            this.note.todos.splice(index, 1);
        },
        saveNote(){
            let updatedNotes = this.notes.concat(this.note);
            this.$store.dispatch(types.UPDATE_NOTES, updatedNotes);
            this.note = new Note();
        }
    }
}
</script>

<style scoped>
    .addWrapper{
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 15px;
        position: relative;
        min-height: 60px;
    }
    .plusBtnWrappr{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .todoWrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
    }
    .saveBtn{
        background: url('../assets/icons/save-icon.png') no-repeat center;
        display: block;
        position: absolute;
        right: 20px;
        bottom: 20px;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .plusBtn{
        background: url('../assets/icons/plus-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        
    }
    .deleteBtn{
        background: url('../assets/icons/delete-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .input{
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
        margin: 5px;
    }
    .inputNote{
        width: 80%;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
    }
</style>