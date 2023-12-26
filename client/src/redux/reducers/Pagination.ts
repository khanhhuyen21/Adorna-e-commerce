const initialState: number = 0;
export const paginationReducer = (
  state: number = initialState,
  action: any
) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return (state = action.payload);
    default:
      return (state = 1);
  }
};
