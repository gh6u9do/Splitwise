import { useState } from 'react';
import styles from './App.module.css';
import { FriendManager } from './components/FriendManager/FriendManager';
import { ExpenseForm, type TExpense } from './components/ExpenseForm/ExpenseForm';

// тип друга
export type TFriend = {
  id: string,
  name: string
}

function App() {
  // стейт друзей
  const [friendsList, setFriendsList] = useState<TFriend[]>([]);

  // стейт трат
  const [expenseList, setExpenseList] = useState<TExpense[]>([]);

  // функция добавления друга в стейт
  function addFriend(name: string) {
      // добавляем нового человека в стейт, расширяя предыдущее значение
      setFriendsList((prev) => [...prev, {id: crypto.randomUUID(), name}]);
  }

  // функция удаления друга из стейта
  function deleteFriend(id: string) {
      // возвращаем в стейт массив без элемента с переданным id
      setFriendsList((prev) => prev.filter((friend) => friend.id !== id));
  }


  // функция добавления траты в стейт
  function addExpense(expense: TExpense) {
    setExpenseList((prev) => [...prev, expense]);
  }

  // функция убрает трату из стейта
  function deleteExpense(id: string) {
    setExpenseList((prev) => prev.filter((expense) => expense.id !== id));
  }

  return (
    <>
     <section className={styles.wrapper}>
        <div className={styles['wrapper__friendList']}>
          <FriendManager
            addFriendAtList={addFriend}
            deleteFriendAtList={deleteFriend}
            friendsList={friendsList}
          />
        </div>
        {/* если людей в списке нет - не показываем форму */}
        {friendsList.length > 0 ? (
          <div className={styles['wrapper__expenseForm']}>
            <ExpenseForm
              friendList={friendsList}
              addExpense={addExpense}
            />
          </div>

        ): (
          <div></div>
        )}
     </section>
      
    </>
  )
}

export default App