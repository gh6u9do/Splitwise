import { useState, useMemo } from 'react';
import styles from './App.module.css';
import { FriendManager } from './components/FriendManager/FriendManager';
import { ExpenseForm, type TExpense } from './components/ExpenseForm/ExpenseForm';
import { ExpenseList } from './components/ExpenseList/ExpenseList';
import { Settlement } from './components/Settlement/Settlement';

// тип друга
export type TFriend = {
  id: string,
  name: string
}

// тип транзакции
export type TTransaction = {
  id: string,
  fromId: string,
  amount: number,
  toId: string
}

function App() {
  // стейт друзей
  const [friendsList, setFriendsList] = useState<TFriend[]>([]);

  // стейт трат
  const [expenseList, setExpenseList] = useState<TExpense[]>([]);



  // узнаем чистый баланс каждого по итогам трат
  const debts = useMemo(() => {
    // проставляем для каждого друга нулевой баланс
    let balances = friendsList.map((friend) => {
      return {
        id: friend.id,
        balance: 0
      }
    });

    // проходим по всем тратам и меняем баланс
    expenseList.forEach((expense) => {
      // считаем долю каждого 
      const part = expense.amount / friendsList.length;

      // у всех списываем часть за трату 
      balances.forEach((balance) => {
        // тому кто оплатил кладем на плюс долг друзей
        if (balance.id == expense.friendId) {
          balance.balance += part * (friendsList.length - 1);
        } else {
          balance.balance -= part;
        }
      })
    })


    // считаем должников
    const debtors = balances
      // сначала находим только тех кто у кого баланс отрицательный
      .filter((balance) => balance.balance < -0.01 )
      // переводим отрицательный баланс в положительное значение для удобства
      .map((balance) => ({...balance, balance: Math.abs(balance.balance)})
    );


    // считаем кредиторов
    const creditors = balances.filter((balances) => balances.balance > 0.01);

     
    // массив для транзакций
    const transactions:TTransaction[] = [];

    // индекс должников
    let debtorsIndex = 0;
    // индекс кредиторов
    let creditorsIndex = 0;

    // сводим должников и кредиторов
    while(debtorsIndex < debtors.length && creditorsIndex < creditors.length) {
      // берем конкретного должника
      const debtor = debtors[debtorsIndex];
      // берем конкретного кредитора
      const creditor = creditors[creditorsIndex];

      // узнаем сколько должник должен перекинуть кредитору
      const transactionValue = Math.min(debtor.balance, creditor.balance);

      // кладем транзицию в массив
      transactions.push({
        id: crypto.randomUUID(),
        fromId: debtor.id,
        amount: transactionValue,
        toId: creditor.id
      });

      // вычитаем со счета должника сумму перевода кредитору
      debtor.balance -= transactionValue; 
      // вычитаем со счета кредитора сумму перевода должника
      creditor.balance -= transactionValue;

      // если чей-то баланс закрылся - двигаем индекс дальше
      if(debtor.balance < 0.01) {
        debtorsIndex++;
      } 
      if(creditor.balance < 0.01) {
        creditorsIndex++;
      } 
    }

    // возвращаем объект с транзакциями
    return transactions;

  }, [friendsList, expenseList]);



  // функция добавления друга в стейт
  function addFriend(name: string) {
    // добавляем нового человека в стейт, расширяя предыдущее значение
    setFriendsList((prev) => [...prev, { id: crypto.randomUUID(), name }]);
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
        <div className={styles['wrapper__section']}>
          <FriendManager
            addFriendAtList={addFriend}
            deleteFriendAtList={deleteFriend}
            friendsList={friendsList}
          />
        </div>
        {/* если людей в списке нет - не показываем форму */}
        {friendsList.length > 0 ? (
          <div className={styles['wrapper__section']}>
            <ExpenseForm
              friendList={friendsList}
              addExpense={addExpense}
            />
          </div>

        ) : (
          <div></div>
        )}
        {/* если трат в стейте нет - не показываем список */}
        {expenseList.length > 0 && friendsList.length > 0 ? (
          <div className={styles['wrapper__section']}>
            <ExpenseList
              expenses={expenseList}
              friends={friendsList}
              deleteExpense={deleteExpense}
            />
          </div>
        ) : (
          <div></div>
        )}

        {/* если в debts нет транзакций ниче не показываем */}
        {debts.length > 0 ? (
          <section>
            <Settlement
              friendList={friendsList}
              transactions={debts}
            />
          </section>
        ): (
          <div></div>
        )}

      </section>

    </>
  )
}

export default App