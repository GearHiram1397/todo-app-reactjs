
import Header from './components/Header';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import SideBar from './components/SideBar';
import { useState } from 'react'


// In this project we are going to do a Todo List with react and style components

function App() {
  // we set a  state sideBarToogle and setSideBarToogle to update the state to interact with 
  // the sidebar to know if its open or close
/* Setting the state of the sidebar to true and setting the todolist to the array of objects. */
  const [sideBarToogle, setSideBarToogle] = useState(true)
  const todoList = [{
    name: 'Personal',
    color: '#fd76a1',
    icon: 'fas fa-user'
  },
  {
    name: 'Work',
    color: '#70c4be',
    icon: 'fas fa-briefcase'
  },
  {
    name: 'Study',
    color: '#ab6ddf',
    icon: 'fas fa-file-code'
  },
  ]
  return (
    <Wrapper>
      <Header sideBarToogle={sideBarToogle} setSideBarToogle={setSideBarToogle} />
      <Main>
        <SideBar sideBarToogle={sideBarToogle} todoList={todoList} />
        <MainContent style={{ width: `calc(100vw - (${sideBarToogle ? '300px' : '70px'}))` }}>
          <TodoContent>
            <Tittle>DashBoard</Tittle>
            <Greeting>Good Morning, Hiram</Greeting>
            {todoList.map(category => (
              <TodoList
                key={category.name}
                name={category.name}
                color={category.color}
                icon={category.icon} />
            ))}
          </TodoContent>
        </MainContent>
      </Main>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
 background-color: #18181f;
 min-height: 100vh;
 min-width: 100vw;
 color: #eee;
`
const Main = styled.div`
 display: flex;
`
const MainContent = styled.div`
  display: flex;
  justify-content: center;
  transition: 0.3s;
`

const TodoContent = styled.div`
  max-width: 700px;
  width: 100%;
`

const Tittle = styled.div`
  margin: 50px 0;
  font-size: 30px;
  font-weight: 700;
`

const Greeting = styled.div`
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 800;
`