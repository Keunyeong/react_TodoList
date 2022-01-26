import { useState } from "react";
import { useDispatch } from "react-redux";
import { listActions } from "../store";

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
    <li key={id}>
      <input type="checkbox" id={id} value={isComplete} onChange={changeList} />
      id : {id} | isComplete : {isComplete ? "true" : "false"} | 내용 :{" "}
      {isInput ? (
        <form onSubmit={changeContent}>
          <input id={id} type="text" defaultValue={content} />
        </form>
      ) : (
        <span onDoubleClick={changeElement}>{content}</span>
      )}
      {isShow && (
        <button id={id} onClick={deleteList}>
          X
        </button>
      )}
    </li>
  );
}
