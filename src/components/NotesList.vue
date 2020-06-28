<template>
    <div class="wrapper">
        <Modal v-if="modal" message="Please confirm note deletion" @closeModal="modal = false" @confirm="deleteNote(selectedNote)" />
        <div v-for="(note, key) in notes" :key="key" class="note">
            <h3>{{note.title}}</h3>
            <div class="wrapperTodo">
                <div v-for="(todo, key) in note.todos" :key="key">
                    <div v-if="key < 3" :class="{todoDone: todo.done}"><strong>{{key+1}}.</strong> {{todo.title}}</div>
                    <div v-else-if="key === 3"><strong>...</strong></div>
                </div>
            </div>
            <div class="btnWrapper" >
                <router-link :to="{ name: 'Edit', params: { id: note.id }}" tag="span" class="editBtn" ></router-link>
                <span @click="confirmDeletion(key)" class="deleteBtn"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../store/types';
import Modal from '../components/Modal';

export default {
    components:{
        Modal
    },
    data(){
        return{
            modal: false,
            selectedNote: null
        }
    },
    computed:{
        ...mapGetters({
            notes: types.NOTES
        })
    },
    methods: {
        confirmDeletion(index){
            this.modal = true;
            this.selectedNote = index;
        },
        deleteNote(index){
            this.notes.splice(index, 1);
            this.$store.dispatch(types.UPDATE_NOTES, this.notes);
            this.modal = false;
            this.selectedNote = null;
        }
    },
    created(){
        this.$store.dispatch(types.PULL_NOTES);
    }
}
</script>

<style scoped>
    .wrapper{
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;    
        justify-content: space-around;
        padding: 15px; 
    }
    .wrapperTodo{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .btnWrapper{
       display: flex;
       justify-content: flex-end; 
    }
    .note{
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        width: 300px;
        margin: 15px;
        padding: 15px;
    }
    .todoDone{
        text-decoration: line-through;
        color: grey;
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
    .deleteBtn{
        background: url('../assets/icons/delete-icon.png') no-repeat center;
        display: block;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-size: contain;
        cursor: pointer;
    }
</style>