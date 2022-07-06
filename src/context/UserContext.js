import React from 'react';

const UserContext = React.createContext({
  userId: '',
  name: '',
  setUserDetails: () =>{},
})

export default UserContext
