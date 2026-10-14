import type { TFriend } from '../../App'
import type { TExpense } from '../ExpenseForm/ExpenseForm'
import { Button } from '../ui/Button/Button'
import styles from './ExpenseList.module.css'

type TExpenseListProps = {
    expenses: TExpense[],
    friends: TFriend[],
    deleteExpense: (id: string) => void
}

export const ExpenseList = ({expenses, friends, deleteExpense}: TExpenseListProps) => {

    return (
        <section className={styles['wrapper']}>
            <h1 className={styles['wrapper__header']}>Список трат</h1>

            <div className={styles['wrapper__expenseList']}>

                {expenses.map((expense) => (
                    <div key={expense.id} className={styles['wrapper__expense']}>
                        <p className={styles['expense__title']}>{expense.title}</p>
                        <p className={styles['expense__amount']}>{expense.amount}</p>
                        <p className={styles['expense__whoPaid']}>
                            {friends.find((friend) => friend.id === expense.friendId)?.name}
                        </p>
                        <Button
                            variant='danger'
                            onClick={(e) => deleteExpense(expense.id)}
                        >X</Button>
                    </div>
                ))}

            </div>

        </section>
    )

}