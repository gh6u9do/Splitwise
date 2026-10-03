import type { TFriend } from '../../App';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';
import styles from './FriendManager.module.css'
import { useState, useRef } from 'react';

type TFriendManagerProps = {
    friendsList: TFriend[],
    addFriendAtList: (name: string) => void,
    deleteFriendAtList: (id: string) => void
};


export const FriendManager = ({ friendsList, addFriendAtList, deleteFriendAtList }: TFriendManagerProps) => {

    // сохраняем инпут в ref
    const refInputName = useRef<HTMLInputElement>(null);

    // стейт для имени друга в инпуте формы
    const [nameInputValue, setNameInputValue] = useState('');


    // функция сабмита формы
    function handeFormSubmit(e: React.SubmitEvent) {
        // предотвращаем стандартное поведение формы
        e.preventDefault();
    }

    // функция удаления человека из списка
    function deleteFriendFromList(id: string) {
        // ищем в массиве юзера по id
        friendsList.find((friend) => friend?.id === id)
    }

    return (
        <section className={styles['wrapper']}>
            <form className={styles['wrapper__form']} onSubmit={handeFormSubmit}>
                <Input
                    ref={refInputName}
                    className={styles['form__input']}
                    name='friendName'
                    placeholder='Имя'
                    min={2}
                    value={nameInputValue}
                    onChange={(e) => setNameInputValue(e.target.value)}
                />
                <Button
                    type='submit'
                >
                    Добавить
                </Button>
            </form>

            <div className={styles['wrapper__friendsList']}>
                {friendsList.length === 0 ? (
                    <p>Пока список пуст :(</p>
                ) : (
                    friendsList.map((friend) => (
                        <div key={crypto.randomUUID()} className={styles['friendList__friendItem']}>
                            <span>{friend.name}</span>
                            <Button type='button'>Удалить</Button>
                        </div>
                    ))
                )}
            </div>

        </section>
    );

}