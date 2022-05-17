import React, {useState, useEffect} from 'react'
import TodoItem from './TodoItem'
import styled from 'styled-components'
import {db} from '../firebase'
import { collection, orderBy , onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore'
const TodoList = ({name,color,icon}) => {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    // template literal
    
   /* Fetching data from firestore and setting it to the state. */
    useEffect(() => {
       /* Creating a query to fetch data from firestore. */
        const todoListQuery = query(
            collection(db, 'todoCategories', name, 'todos'), 
            orderBy("createdAt", 'desc')
        )

        const unsub = onSnapshot(
           /* A callback function that is called when the query is executed. */
            todoListQuery, querySnapshot => {
                var todoItems = []

                /* Iterating over the querySnapshot and pushing the data to the todoItems array. */
                querySnapshot.forEach(doc => {
                    todoItems.push({
                        ...doc.data(),
                        id: doc.id,
                    })
                })

                /* Setting the state of todos to the todoItems array. */
                setTodos(todoItems)
            }
        )
       /* Returning the unsubscribe function. */
        return unsub
        
    }, [name])

   /**
    * It creates a new document in the todos collection, with the title of the todo, a completed status
    * of false, and a timestamp of when it was created.
    * @param event - the event object that is passed to the function
    */
    const addButtonHandler =  async (event) => {
        event.preventDefault()
      const  collectionRef =  collection(db, 'todoCategories', name, 'todos') 
      
      await addDoc(collectionRef, {
          title: todo, 
          completed: false,
          createdAt: serverTimestamp()
      })

      setTodo('')
    }
    return (
        <Wrapper>
            <TodoCategoryHeader >
                <CategoryIcon style={{backgroundColor: color }}>
                    <i className={icon} />
                </CategoryIcon>
                    <Title>{name}</Title>
                    <TodoInput value={todo} onChange={e => setTodo(e.target.value)} />
                    <AddTodo className='fas fa-plus' onClick={event => addButtonHandler(event)}  />
            </TodoCategoryHeader>
           {todos.map((todo, index) => (<TodoItem
            key={index}
            todo={todo}
            color={color} 
            name={name}
            />))} 
        </Wrapper>
    )
}

export default TodoList

const Wrapper = styled.div`
 background-color: #20212d;
 margin-bottom: 30px;
 border-radius: 20px;
 overflow: hidden;
`

const TodoCategoryHeader = styled.div`
 background-color: #272833;
 height: 50px;
 display: flex;
 align-items: center;
 padding: 15px 20px;

`

const CategoryIcon = styled.div`
  height: 30px ;
  width: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`
const Title = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
`

const TodoInput = styled.input`
    height: 30px;
    font-size: 18px;
    outline: none;
    border: none;
    background-color: #20212d;
    border-radius: 4px;
    color: #eee;
    padding: 4px 10px;
    margin-right: 4px;
`

const AddTodo = styled.i`
 

 &:hover{
     background-color: #20212d;
     transition: 0.3s;
     cursor: pointer;
 }

`