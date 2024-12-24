import { Button, Input, Section, Select, Textarea } from '@telegram-apps/telegram-ui';
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
  const [from, setFrom] = useState('Москва');
  const [comment, setComment] = useState('');
  const [to, setTo] = useState('Санкт-Петербург');

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
    const value = price.split(' ')[0];
    setPrice(value)
  }

  const onPriceBlur = () => {
    if(price !== '') {
      const value = `${price}$`;
      setPrice(value);
    } 
  }

  return (
    <>
      {
        userData ?
        (
          <>
            <ul>
              <li>ID: {userData.id}</li>
              <li>Name: {userData.first_name}</li>
            </ul>
            <Section header="Общая информация">
              <Input header="Груз" placeholder="Тип груза" value={type} onChange={(e) => setType(e.target.value)} />
              <Input header="Вес" placeholder="Общий вес посылки в кг" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onWeightFocus} onBlur={onWeightBlur} />
              <Input header="Цена за кг" placeholder="Стоимость доставки за кг" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onPriceFocus} onBlur={onPriceBlur} />
            </Section>
            <Section header="Откуда">
              <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                <option>Москва</option>
                <option>Санкт-Петербург</option>
              </Select>
            </Section>
            <Section header="Куда">
              <Select value={to} onChange={(e) => setTo(e.target.value)} >
                <option>Москва</option>
                <option>Санкт-Петербург</option>
              </Select>
            </Section>
            <Section header="Дополнительно">
              <Textarea value={comment} onChange={(e) => setComment(e.target.value)} header="Комментарий" placeholder="Дополнительные детали" />
            </Section>
            <div style={{padding: '20px'}}>
            <Button
                size='l'
                stretched
                disabled={type === '' || weight === '' || price === '' || from === '' || to === ''}
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
