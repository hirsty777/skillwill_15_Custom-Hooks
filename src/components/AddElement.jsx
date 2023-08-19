import Done from "./Done";
import ToBeDone from "./ToBeDone";
import addLogo from "../assets/arrow.svg"
import { useCallback, useState } from "react";
import { useRef } from "react";

const AddElement = () => {
    const inputValue = useRef(null);
    const [idNumber, setIdNumber] = useState(0);
    const [toDoList, setToDoList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    // add entered text to toDoList when add button is clicked
    const addToDo = (e) => {
        e.preventDefault();
        //prevent from empty entries
        if(inputValue.current.value.trim().length ===0 )return

        setToDoList((prevState) => [...prevState, {id:idNumber, name:inputValue.current.value}])
        setIdNumber((prevState) => prevState+1)
        //simpe solution tu reset input (timeout becouse  i need async so input reset don`t run before setstate)
        setTimeout(()=>{
            inputValue.current.value = ''
        })
    };
    // when done btn is clicked add thet elemnt to doneList and then remove it from toDoList.
    const changeList = useCallback((id) => {
        setDoneList((prevState) => [...prevState, {id, name:toDoList.filter(el=> el.id === id)[0].name}])
        setToDoList((prevState) => prevState.filter(el=> el.id !== id))
    },[toDoList])
    // when Not Done btn is clicked add thet elemnt to toDoList and then remove it from doneList.
    const returnElement = useCallback((id) => {
        setToDoList((prevState) => [...prevState, {id, name:doneList.filter((el) => el.id === id)[0].name}])
        setDoneList((prevState) => [...prevState.filter((el) => el.id !== id)])
    },[doneList])
    // remove elemnt from state.doneList when remove btn is clicked.
    const removeElement = useCallback((id) => {
        setDoneList((prevState) => [...prevState.filter(el=> el.id !== id)])
    },[])

        return(
            <div className="wrapper">
                <div className="add-wrapper">
                <form onSubmit={addToDo} className="add-box">
                    <input ref={inputValue} type="text" placeholder="Add New Task"/>
                    <button type="submit">
                    <img src={addLogo} alt="logo" />
                    </button>
                </form>
                </div>
                <div className="flex-box">
                    <h3>To Do List</h3>
                    {toDoList.map((el) => (
                       <ToBeDone key={el.id} id={el.id} name={el.name} action={changeList}/>
                    ))}
                </div>
                <div className="flex-box">
                    <h3>Done List</h3>
                    {doneList.map((e) => ( 
                       <Done key={e.id} id={e.id} name={e.name} actionReturn={returnElement} actionRemove={removeElement}/>
                    ))}
                </div>
            </div>
        )
}
export default AddElement