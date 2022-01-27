import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListLiComponent from "./component/ListLiComponent";
import { listActions } from "./store";
import "./styles.css";

const Div = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0.2rem;
  border: 1px solid red;
`;
const ButtonBox = styled.div`
  width: 12rem;
  padding: 0;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;
const Input = styled.input`
  width: 11rem;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid #999;
  &:hover {
    color: white;
    background-color: #999;
  }
`;

export default function App() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.list);
  const count = useSelector((state) => state.list.count);

  const enteredList = (e) => {
    e.preventDefault();
    dispatch(
      listActions.addList({
        id: count,
        content: e.target[0].value,
        isComplete: false
      })
    );
    e.target[0].value = "";
  };
  const completedClearBtn = () => {
    dispatch(listActions.completedClear(true));
  };
  const allClearBtn = () => {
    dispatch(listActions.completedClear(false));
  };
  return (
    <Div className="App">
      <h1>ToDo LIST</h1>
      <form onSubmit={enteredList}>
        <Input type="text" />
      </form>
      <ButtonBox>
        <Button onClick={allClearBtn}>All Clear</Button>
        <Button onClick={completedClearBtn}>Completed Clear</Button>
      </ButtonBox>
      <Ul>
        {list.map((l) => {
          return (
            <ListLiComponent
              key={l.id}
              id={l.id}
              content={l.content}
              isComplete={l.isComplete}
            />
          );
        })}
      </Ul>
    </Div>
  );
}
