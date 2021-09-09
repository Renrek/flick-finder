const contactsSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CONTACTS_SEARCH':
        return action.payload;
      default:
        return state;
    }
  };

export default contactsSearchReducer;
  