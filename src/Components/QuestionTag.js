import React, { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";

export default function QuestionTag() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  function handleInputChange(e,index){
    const{name,value}=e.target;
    const list=[...inputList]
    list[index][name]=value;
    setInputList(list)
  }

  const handleRemoveClick=index=>{
    const list =[...inputList]
    list.splice(index,1)
    setInputList(list)
  }

  const handleAddClick=()=>{
    setInputList([...inputList,{firstName:"",lastName:""}])
  }

  return (
    <div>
      <br />
      <h5>If you want to add a question, please click Add button</h5>
      <br />
      {inputList.map((x, i) => {
        return (
          <div>
            <Input
              style={{ width: "300px", marginBottom: "15px" }}
              name="firstName"
              placeholder="Enter First Name"
              onChange={e=>handleInputChange(e,i)}
              value={x.firstName}
            />
            <Input
              style={{ width: "300px", marginBottom: "15px" }}
              name="lastName"
              placeholder="Enter Last Name"
              onChange={e=>handleInputChange(e,i)}
              value={x.lastName}
            />{" "}
            <div>
              {inputList.length !== 1 && <Button className="question-btn" onClick={()=>handleRemoveClick(i)}>Remove</Button>}
              {inputList.length - 1 === i && <Button className="question-btn2" onClick={handleAddClick}>Add</Button>}
            </div>
          </div>
        );
      })}
  
      <br />
    </div>
  );
}
