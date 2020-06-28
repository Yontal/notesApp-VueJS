<template>
    <div class="wrapper">
        <div class="noteTitleWrapper">
            <div>
                <h2 v-if="!editing">{{ note.title }}</h2>
                <input v-else :value="note.title" class="input" />
            </div>
            <div>
                <span v-if="!editing" @click="editing = true" class="editBtn"></span>
                <span v-if="editing" @click="editing = false" class="confirmBtn"></span>
            </div>
        </div>
        <Modal v-if="exitModal" message="Please confirm exit without saving" @closeModal="exitModal = false" @confirm="skipChanges" />
        <div v-for="(todo, key) in note.todos" :key="key">
            <Modal v-if="deleteModal" message="Please confirm todo deletion" @closeModal="deleteModal = false" @confirm="deleteTodo(editingTodoId)" />
            <div class="todoWrapper">
                <div class="todoTitle">
                <input type="checkbox" v-model="todo.done"/>
                <div v-if="editingTodoId !== key" :class="{todoDone: todo.done}">{{ todo.title }}</div><input v-else-if="editingTodoId === key" v-model="todo.title" placeholder="Type your todo here" class="input" />
                </div>
                <div class="btnWrapper" >
                    <span v-if="editingTodoId === key" @click="editingTodoId = null" class="confirmBtn"></span>
                    <span v-else-if="editingTodoId === null" @click="editingTodoId = key" class="editBtn"></span>
                    <span v-if="editingTodoId === null" @click="confirmDeletion(key)" class="deleteBtn"></span>
                </div>
            </div>
        </div>
        <div class="plusBtnWrappr">
            <span @click="addTodo" class="plusBtn"></span><div @click="addTodo">add To-do</div>
        </div>
        <br />
        <div class="btnWrapper">
            <span @click="exitModal = true" class="skipChangesBtn"></span>
            <span @click="saveNote" class="saveBtn"></span>
        </div>
    </div>
</template>

<script>
import Todo from '../models/Todo';
import Modal from '../components/Modal';
import * as types from '../store/types';
import { mapGetters } from 'vuex';

export default {
    components:{
        Modal
    },
    data(){
        return{
            note: null,
            editing: false,
            editingTodoId: null,
            deleteModal: false,
            exitModal: false
        }
    },
    computed:{
        ...mapGetters([
            types.GET_NOTE_BY_ID,
            types.NOTES
        ])
    },
    methods: {
        deleteTodo(index){
            this.note.todos.splice(index, 1);
            this.deleteModal = false;
            this.editingTodoId = null;
        },
        confirmDeletion(index){
            this.deleteModal = true;
            this.editingTodoId = index;
        },
        saveNote(){
            let updNotes = this.NOTES.slice();
            updNotes.map(note => {
                if(note === note.id){
                    note = this.note
                }
            });
            this.$store.dispatch(types.UPDATE_NOTES, updNotes)
            this.editing = !this.editing
            this.$router.push('/')
        },
        skipChanges(){
            this.exitModal = false;
            this.$store.dispatch(types.PULL_NOTES);
            this.$router.push('/');
        },
        addTodo(){
            this.note.todos.push(new Todo())
            this.editingTodoId = this.note.todos.length - 1
        }
    },
    created(){
        this.note = this.GET_NOTE_BY_ID(this.$router.history.current.params.id)
    }
}
</script>

<style scoped>
    .wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;    
        justify-content: space-between;
        padding: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
    }
    .todoWrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 50px;
        width: 450px;
        padding: 5px;
        margin: 5px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
    }
    .noteTitleWrapper{
        display: flex;
        align-items: center;
    }
    .todoTitle{
        text-align: left;
        display: flex;
        align-items: center;
        min-width: 300px;
        margin: 5px;
    }
    .todoDone{
        text-decoration: line-through;
        color: grey;
    }
    .btnWrapper{
        display: flex;
        flex-direction: row;
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
    .editBtn{
        background: url('../assets/icons/edit-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .confirmBtn{
        background: url('../assets/icons/confirm-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .saveBtn{
        background: url('../assets/icons/save-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .skipChangesBtn{
        background: url('../assets/icons/skip-changes-icon.png') no-repeat center;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
    .plusBtnWrappr{
        display: flex;
        align-items: center;
        justify-content: center;
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
    .input{
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        padding: 10px;
        margin: 5px;
    }
</style>