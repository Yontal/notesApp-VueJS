<template>
  <div class="home">
    <h1>Notes</h1>
    <AddNoteForm />
    <NotesList />
  </div>
</template>

<script>
// @ is an alias to /src
import AddNoteForm from '@/components/AddNoteForm.vue'
import NotesList from '@/components/NotesList.vue'


export default {
  name: 'Home',
  components: {
    AddNoteForm,
    NotesList,
  }
}
</script>
