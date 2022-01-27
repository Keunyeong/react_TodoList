import { useState } from "react";
import { useDispatch } from "react-redux";
import { listActions } from "../store";
import styled from "styled-components";

const Li = styled.li`
  list-style: none;
  display: flex;
  align-items: baseline;
  /* justify-content: space-between; */
  border: 1px solid blue;
`;

const CheckInput = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  border: none;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  &:focus {
    border: 1px solid black;
    border-radius: 0;
  }
`;

export default function ListLiComponent({ id, content, isComplete }) {
  const [isInput, setIsInput] = useState(false);
  let isShow = true;
  const dispatch = useDispatch();
  const deleteList = (e) => {
    dispatch(listActions.removeList(e.target.id));
  };
  const changeList = (e) => {
    dispatch(listActions.changeState(e.target.id));
  };
  const changeElement = () => {
    setIsInput(!isInput);
  };
  const changeContent = (e) => {
    e.preventDefault();
    console.log(e.target[0].id);
    console.log(e.target[0].value);
    dispatch(
      listActions.changeContent({
        id: e.target[0].id,
        content: e.target[0].value
      })
    );
    setIsInput(!isInput);
  };
  return (
    <Li key={id}>
      <CheckInput
        type="checkbox"
        id={id}
        value={isComplete}
        onChange={changeList}
      />

      {isInput ? (
        <form onSubmit={changeContent}>
          <Input id={id} type="text" defaultValue={content} />
        </form>
      ) : (
        <span onDoubleClick={changeElement}>{content}</span>
      )}
      {isShow && (
        <Button id={id} onClick={deleteList}>
          X
        </Button>
      )}
    </Li>
  );
}
