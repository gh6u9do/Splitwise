import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/ui/Button/Button';
import { Input } from './components/ui/Input/Input';
import { FriendManager } from './components/FriendManager/FriendManager';

// тип друга
export type TFriend = {
  id: string,
  name: string
}

function App() {
  // массив друзей
  const [friendsList, setFriendsList] = useState<TFriend[]>([]);

  function addFriend(name: string) {
    
  }

  function deleteFriend(id: string) {

  }

  return (
    <>
     <section className={styles.wrapper}>
       <FriendManager
        addFriendAtList={addFriend}
        deleteFriendAtList={deleteFriend}
        friendsList={friendsList}
       />
     </section>
      
    </>
  )
}

export default App