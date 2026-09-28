import { useState } from 'react';
import styles from './App.module.css';
import { Button } from './components/ui/Button/Button';

function App() {
  

  return (
    <>
     <section className={styles.wrapper}>
        <Button>Кнопка</Button>
     </section>
      
    </>
  )
}

export default App