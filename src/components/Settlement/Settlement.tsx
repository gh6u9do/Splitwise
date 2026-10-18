import type { TFriend, TTransaction } from '../../App'
import styles from './Settlement.module.css'

type TSettlementProps = {
    transactions: TTransaction[],
    friendList: TFriend[]
}


export const Settlement = ({ transactions, friendList }: TSettlementProps) => {


    return (
        <section className={styles.wrapper}>
            <h3 className={styles['wrapper__header']}>Переводы</h3>

            <div className={styles['wrapper_settlementList']}>

                {transactions.map((transaction) => {

                    // Находим имена участников по их ID в массиве друзей
                    const senderName = friendList.find(friend => friend.id === transaction.fromId)?.name || 'Удаленный пользователь';
                    const receiverName = friendList.find(friend => friend.id === transaction.toId)?.name || 'Удаленный пользователь';


                    return (
                        <div key={transaction.id} className={styles['settlementList__settlement']}>
                            <span className={styles['settlement__sender']}>{senderName}</span>
                            <span className={styles['settlement__arrow']}>➡️</span>
                            <span className={styles['settlement__receiver']}>{receiverName}</span>
                            <span className={styles['settlement__amount']}>{transaction.amount}</span>
                        </div>
                    );
                }
                )}

            </div>
        </section>
    )
}