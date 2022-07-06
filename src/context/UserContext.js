import React from 'react';

const UserContext = React.createContext({
  userId: '',
  username: '',
  setUserDetails: () =>{},
})

export default UserContext
