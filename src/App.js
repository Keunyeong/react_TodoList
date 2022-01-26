import { useDispatch, useSelector } from "react-redux";
import ListLiComponent from "./component/ListLiComponent";
import { listActions } from "./store";
import "./styles.css";

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
    <div className="App">
      <h1>ToDo LIST</h1>
      <form onSubmit={enteredList}>
        <input type="text" />
      </form>
      <button onClick={allClearBtn}>All Clear</button>
      <button onClick={completedClearBtn}>Completed Clear</button>
      <ul>
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
      </ul>
    </div>
  );
}
