<template>
  <v-layout align-center column>
      <v-card
        max-width="640px"
        width="80%">
        <div class="adding">
           <v-layout>
             <v-flex md9>
               <v-text-field
                             v-model="todoText"
                             :counter="50"
                             label="What to do?"
               ></v-text-field>
             </v-flex>
             <v-flex md3>
               <v-btn class="add" @click="addToDo" color="green">Добавить</v-btn>
             </v-flex>
           </v-layout>
        </div>
        <v-divider></v-divider>
        <div class="viewing">
          <v-layout>
            <v-flex md4>
              <div v-if="this.shown === 'all'" class="but shown">Все задачи</div>
              <div v-else class="but" @click="showAll">Все задачи</div>
            </v-flex>
            <v-flex md4>
              <div v-if="this.shown === 'done'" class="but shown">Выполненные задачи</div>
              <div v-else class="but" @click="showDone">Выполненные задачи</div>
            </v-flex>
            <v-flex md4>
              <div v-if="this.shown === 'undone'" class="but shown">Невыыполненные задачи</div>
              <div v-else class="but" @click="showUndone">Невыполненные задачи</div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-list v-for="(todo, index) in todos">
            <div v-if="todo.done" class="todo done">
              <v-layout>
                <v-flex md10 @click="todo.done = false">
                  <div class="doneText text">{{todo.text}}</div>
                </v-flex>
                <v-flex offset-md1>
                  <v-icon @click="deleteToDo(index)" class="delete"></v-icon>
                </v-flex>
              </v-layout>
            </div>
            <div v-else class="todo">
              <v-layout>
                <v-flex md10 @click="todo.done = true">
                  <div class="text">{{todo.text}}</div>
                </v-flex>
                <v-flex offset-md1>
                  <v-icon @click="deleteToDo(index)" class="delete"></v-icon>
                </v-flex>
              </v-layout>
            </div>
          </v-list>
        </div>
      </v-card>
  </v-layout>
</template>

<script>
    export default {
        name: "ToDoList",
      data() {
          return {
            todos: [],
            todoText: '',
            shown: 'all'
          }
      },
      methods: {
          addToDo() {
           const todo = {
              id: this.todos.length,
              text: this.todoText,
              done: false
            }
            this.$store.dispatch('addToDo', todo)
            this.todoText = ''
            console.log('added')
          },
        deleteToDo(todo) {
            this.$store.dispatch('deleteToDo', todo)
        },
        showAll() {
            this.shown = 'all'
            this.todos = this.$store.getters.TODOS
        },
        showDone() {
          this.shown = 'done'
          this.todos = this.$store.getters.DONE_TODOS
        },
        showUndone() {
          this.shown = 'undone'
          this.todos = this.$store.getters.UNDONE_TODOS
        }
      },
      mounted() {
          this.todos = this.$store.getters.TODOS
      }
    }
</script>

<style scoped>
  .adding {
    margin: 20px;
  }
  .add {
    margin-top: 17px;
    margin-left: 20px;
  }
  .delete {
    margin: 12px;
    margin-right: 10px;
    color: red;
  }
  .todo {
    margin: 0 10px;
    border: 1px solid gray;
    font-size: xx-large;
  }
  .done {
    background-color: lightgreen;
  }
  .doneText {
    text-decoration: line-through;
  }
  .text {
    text-align: left;
    margin-left: 15px;
  }
  .but {
    font-family: cursive;
    max-width: 200px;
    font-size: larger;
    color: blue;
    cursor: pointer;
  }
  .shown {
    color: gray;
    cursor: default;
  }

</style>
