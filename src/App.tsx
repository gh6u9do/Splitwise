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
      // добавляем нового человека в стейт, расширяя предыдущее значение
      setFriendsList((prev) => [...prev, {id: crypto.randomUUID(), name}]);
  }

  function deleteFriend(id: string) {
      // возвращаем в стейт массив без элемента с переданным id
      setFriendsList((prev) => prev.filter((friend) => friend.id !== id));
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