import type { TFriend } from '../../App';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './ExpenseForm.module.css'
import { useState } from 'react';


type TExpenseFormProps = {
    friendList: TFriend[],
    addExpense: (expense: TExpense) => void
}

export type TExpense = {
    // айди траты
    id: string;
    // название траты (например поход в кино)
    title: string;
    // сумма траты
    amount: number;
    // айди человека который оплатил
    friendId: string;
}



export const ExpenseForm = ({friendList, addExpense}: TExpenseFormProps) => {

    // локальный стейт для названия траты
    const [expenseTitle, setExpenseTitle] = useState('');
    // локальный стейт для суммы траты
    const [expenseAmount, setExpenseAmount] = useState('');
    // локальный стейт для id заплатившего
    const [paidById, setPaidById] = useState(friendList[0].id || '');

    // функция сабмита ExpenseForm
    function onSubmitExpenseForm(e: React.SubmitEvent<HTMLFormElement>) {
        // отменяем дефолтное поведение
        e.preventDefault();

        // проверяем что нет пустых полей
        if(!expenseTitle.trim() || !expenseAmount) {
            return;
        }

        // проверяем существует ли друг в актуальном списке
        const isFriendExists = friendList.some((friend) => friend.id === paidById);

        // Если существует — берем paidById, если нет — берем ID первого друга из списка
        const actualPaidById = isFriendExists ? paidById : friendList[0].id;

        // добавляем трату в стейт
        addExpense({
            id: crypto.randomUUID(),
            title: expenseTitle,
            amount: Number(expenseAmount),
            friendId: actualPaidById
        });

        // очищаем поля формы
        setExpenseTitle('');
        setExpenseAmount('');

    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles['wrapper__header']}>Расчет трат</h1>
            <form className={styles['wrapper__form']} onSubmit={onSubmitExpenseForm}>
                <Input
                    label='На что потратили?'
                    type='text'
                    placeholder='Пицца'
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                />
                <Input
                    label='Сколько потратили?'
                    type='number'
                    placeholder='500'
                    min={1}
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
                <label className={styles['form__whoPayedLabel']}>
                    Кто платил?
                    <select 
                        className={styles['form__whoPayedSelect']}
                        onChange={(e) => setPaidById(e.target.value)}
                    >
                        {friendList.map((friend) => {
                            return (
                                <option 
                                    key={friend.id} 
                                    value={friend.id} 
                                    className={styles['form__whoPaidOption']}
                                >
                                    {friend.name}
                                </option>
                            )
                        })}
                    </select>
                </label>


                <Button
                    variant='primary'
                >
                    Добавить
                </Button>

            </form>

        </section>
    )
}