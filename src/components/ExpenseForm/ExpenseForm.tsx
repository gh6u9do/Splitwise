import type { TFriend } from '../../App';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './ExpenseForm.module.css'
import { useState } from 'react';


type TExpenseFormProps = {
    friendList: TFriend[]
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

function onSubmitExpenseForm(e: React.SubmitEvent) {
    // 
    e.preventDefault();
}

export const ExpenseForm = ({friendList}: TExpenseFormProps) => {

    // локальный стейт для названия траты
    const [expenseTitle, setExpenseTitle] = useState('');
    // локальный стейт для суммы траты
    const [expenseAmount, setExpenseAmount] = useState('');

    return (
        <section className={styles.wrapper}>
            <h1 className={styles['wrapper__header']}>Расчет трат</h1>
            <form className={styles['wrapper__form']} onSubmit={onSubmitExpenseForm}>
                <Input
                    label='На что потратили?'
                    type='text'
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                />
                <Input
                    label='Сколько потратили?'
                    type='number'
                    min={1}
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                />
                <label className={styles['form__whoPayedLabel']}>
                    Кто платил?
                    <select className={styles['form__whoPayedSelect']}>
                        {friendList.map((friend) => {
                            return (
                                <option className={styles['form__whoPaidOption']}>{friend.name}</option>
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