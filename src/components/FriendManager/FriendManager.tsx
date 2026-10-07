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
    function handeFormSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        // предотвращаем стандартное поведение формы
        e.preventDefault();

        // если после очистки пробелов строка пустая - выходим
        if (!nameInputValue.trim()) {
            return;
        }

        // добавляем друга в список
        addFriendAtList(nameInputValue.trim());

        // очищаем инпут
        setNameInputValue('');
    }


    return (
        <section className={styles['wrapper']}>
            <h2 className={styles['wrapper__header']}>Люди в компании</h2>
            <form className={styles['wrapper__form']} onSubmit={handeFormSubmit}>
                <Input
                    ref={refInputName}
                    label='Введите имя'
                    className={styles['form__input']}
                    name='friendName'
                    placeholder='Иван'
                    required
                    minLength={2}
                    maxLength={20}
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
                    <p className={styles['friendList__emptyMessage']}>Пока список пуст :(</p>
                ) : (
                    friendsList.map((friend) => (
                        <div key={friend.id} className={styles['friendList__friendItem']}>
                            <span className={styles['friendItem__name']}>{friend.name}</span>
                            <Button 
                                type='button' 
                                variant='danger'
                                onClick={(e) => deleteFriendAtList(friend.id)}
                            >
                                Х
                            </Button>
                        </div>
                    ))
                )}
            </div>

        </section>
    );

}