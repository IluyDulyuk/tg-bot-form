import { Button, Cell, Input, List, Section, Select, Switch, Textarea } from '@telegram-apps/telegram-ui';
import {  useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export const FormSection = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if(WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user)
    }
  }, []);
  
  
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromSelect, setFromSelect] = useState('Москва');
  const [toSelect, setToSelect] = useState('Казань');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [noFrom, setNoFrom] = useState(false);
  const [noTo, setNoTo] = useState(false);

  const onWeightFocus = () => {
    const value = weight.split(' ')[0];
    setWeight(value); 
  }

  const onWeightBlur = () => {
    if(weight !== '') {
      const value = `${weight} кг`;
      setWeight(value);
    } 
  }

  const onPriceFocus = () => {
    const value = price.slice(0, price.indexOf('$'));
    setPrice(value)
  }

  const onPriceBlur = () => {
    if(price !== '') {
      const value = `${price}$`;
      setPrice(value);
    } 
  }

  const onButton = async () => {
    
    setLoading(true)

    const data = {
      user: {
        chatId: userData.id,
        username: userData.username
      },
      data: {
        type,
        weight,
        price,
        from: noFrom ? from : fromSelect,
        to: noTo ? to : toSelect,
        comment
      }
    }

    await fetch('https://98d5w9-3000.csb.app/api/sendMessage', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .finally(() => {
        setLoading(false);
        WebApp.close();
      })

  }

  return (
    <>
      {
        1 ?
        (
          <>
            <List>
              <Section header="Общая информация">
                <Input header="Груз" placeholder="Тип груза" value={type} onChange={(e) => setType(e.target.value)} />
                <Input header="Вес" placeholder="Общий вес посылки в кг" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onWeightFocus} onBlur={onWeightBlur} />
                <Input header="Цена за кг" placeholder="Стоимость доставки за кг" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onPriceFocus} onBlur={onPriceBlur} />
              </Section>
              <Section header="Откуда">

                {
                  noFrom ? 
                  (
                    <Input placeholder="Город отправления" value={from} onChange={(e) => setFrom(e.target.value)} />
                  ) :
                  (
                    <Select value={fromSelect} onChange={(e) => setFromSelect(e.target.value)}>
                      <option>Москва</option>
                      <option>Медина</option>
                      <option>Мекка</option>
                      <option>Эр-Рияд</option>
                      <option>Джидда</option>
                      <option>Каир</option>
                      <option>Стамбул</option>
                      <option>Анкара</option>
                      <option>Махачкала</option>
                      <option>Грозный</option>
                      <option>Казань</option>
                    </Select>
                  )
                }

                <Cell
                  Component="label"
                  after={<Switch value={noFrom} onChange={() => setNoFrom(!noFrom)} />}
                >
                  Города нет в списке?
                </Cell>
              </Section>
              <Section header="Куда">

                {
                  noTo ? 
                  (
                    <Input placeholder="Город доставки" value={to} onChange={(e) => setTo(e.target.value)} />
                  ) :
                  (
                    <Select value={toSelect} onChange={(e) => setToSelect(e.target.value)}>
                      <option>Москва</option>
                      <option>Медина</option>
                      <option>Мекка</option>
                      <option>Эр-Рияд</option>
                      <option>Джидда</option>
                      <option>Каир</option>
                      <option>Стамбул</option>
                      <option>Анкара</option>
                      <option>Махачкала</option>
                      <option>Грозный</option>
                      <option>Казань</option>
                    </Select>
                  )
                }

                <Cell
                  Component="label"
                  after={<Switch value={noTo} onChange={() => setNoTo(!noTo)} />}
                >
                  Города нет в списке?
                </Cell>
              </Section>
              <Section header="Дополнительно">
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} header="Комментарий" placeholder="Дополнительные детали" />
              </Section>
            </List>
            <div style={{padding: '20px'}}>
            <Button
                size='l'
                stretched
                disabled={type === '' || weight === '' || price === '' || (noFrom && from === '' || !noFrom && fromSelect === '') || (noTo && to === '' || !noTo && toSelect === '')}
                onClick={onButton}
                loading={loading}
              >Создать объявление</Button>
            </div>
          </>
        ) : 
        (
          <p>No data</p>
        )
      }
    </>
  )
};
