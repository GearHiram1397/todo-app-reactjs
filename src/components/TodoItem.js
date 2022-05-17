import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {db} from '../firebase'
import {doc, updateDoc, deleteDoc} from 'firebase/firestore'
const TodoItem = ({todo, color, name }) => {

    /* Setting the state of the todo item to the title of the todo item. */
    const [editedTodo, setEditedTodo] = useState(todo.title)
  console.log(todo.title)
  /* It's a hook that runs when the component mounts and when the todo state changes. */
    useEffect(() => {
        setEditedTodo(todo.title)
    }, [todo])

   /* Creating a reference to the document in the database. */
    const docRef = doc(db, 'todoCategories', name, 'todos', todo.id)
console.log(docRef)     
    

/**
 * It's an async function that calls the deleteDoc function, which is also an async function. 
 * 
 * The deleteDoc function is defined in the next code block.
 */
    const deleteButtonHandler =  async () => {
            await deleteDoc(docRef)
        }

   /**
    * It takes the value of the input field and updates the document with the new value.
    */
    const saveTodo = async () => {
     
       await updateDoc(docRef,{
           title: editedTodo,
       })
    }
    /**
     * It takes the document reference and the new data to be updated and then updates the document.
     */
    const completeTodo =  async () => {
       await  updateDoc(docRef,{
            completed: !todo.completed
        })
    }

    return (
        <TodoListItem key={todo.id}>
        <Checkbox  className={todo.completed ? 'fas fa-check-circle' : 'far fa-circle'} onClick={completeTodo}  style={{color: color}}/>
        <input 
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            value={editedTodo} 
            onChange={e => setEditedTodo(e.target.value)} />
        {todo.title !== editedTodo && (<SaveTodo className='fas fa-check' onClick={saveTodo} />)}
        <DeleteTodo className='fas fa-trash-alt' onClick={deleteButtonHandler}/>
        </TodoListItem>    
    )
}

export default TodoItem

const TodoListItem = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    transition: 0.3s;

    input{
        flex:1;
        font-size: 20px;
        outline: none;
        background: none;
        border: none;
        color: #eee;
        padding: 10px;
    }
`

const Checkbox = styled.div`
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`

const DeleteTodo = styled.div`
    color: #ff1605;
    padding: 10px 16px;
    margin-left: 14px;
    border-radius: 4px;
    margin-right: -12px;

    &:hover{
        background-color: #7e2601;
        transition: 0.3s;
        cursor: pointer;
    }
`
const SaveTodo = styled.i`
  padding: 10px 16px;
  border-radius: 4px;
  margin-right: -12px;
  color: #42c732;

  &:hover{
      background-color: #2b6127;
      transition: 0.3s;
      cursor: pointer;
  }
`