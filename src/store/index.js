import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  count: 0
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList(state, action) {
      state.list.push(action.payload);
      state.count++;
    },
    removeList(state, action) {
      state.list = state.list.filter(
        (item) => Number(item.id) !== Number(action.payload)
      );
    },
    changeState(state, action) {
      state.list = state.list.map((item) => {
        if (Number(item.id) === Number(action.payload)) {
          return {
            id: item.id,
            content: item.content,
            isComplete: !item.isComplete
          };
        } else {
          return item;
        }
      });
    },
    completedClear(state, action) {
      if (action.payload === true) {
        state.list = state.list.filter((item) => !item.isComplete);
      } else {
        state.list = [];
      }
    },
    changeContent(state, action) {
      state.list = state.list.map((item) => {
        if (Number(item.id) === Number(action.payload.id)) {
          return {
            id: item.id,
            content: action.payload.content,
            isComplete: item.isComplete
          };
        } else {
          return item;
        }
      });
    }
  }
});

export const listActions = listSlice.actions;

const store = configureStore({ reducer: { list: listSlice.reducer } });

export default store;
