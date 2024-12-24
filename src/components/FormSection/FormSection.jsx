import { Button, Input, List, Section, Textarea } from '@telegram-apps/telegram-ui';
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
  const [comment, setComment] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

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

  const onButton = async () => {
    
    setLoading(true)

    const data = {
      user: {
        chatId: userData.id
      },
      data: {
        type,
        weight,
        price,
        from,
        to,
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
        userData ?
        (
          <>
            <List>
              <Section header="Общая информация">
                <Input header="Груз" placeholder="Тип груза" value={type} onChange={(e) => setType(e.target.value)} />
                <Input header="Вес" placeholder="Общий вес посылки в кг" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onWeightFocus} onBlur={onWeightBlur} />
                <Input header="Цена за кг" placeholder="Стоимость доставки за кг" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onPriceFocus} onBlur={onPriceBlur} />
              </Section>
              <Section header="Откуда">
                <Input placeholder="Город отправления" value={from} onChange={(e) => setFrom(e.target.value)} />
              </Section>
              <Section header="Куда">
                <Input placeholder="Город доставки" value={to} onChange={(e) => setTo(e.target.value)} />
              </Section>
              <Section header="Дополнительно">
                <Textarea value={comment} onChange={(e) => setComment(e.target.value)} header="Комментарий" placeholder="Дополнительные детали" />
              </Section>
            </List>
            <div style={{padding: '20px'}}>
            <Button
                size='l'
                stretched
                disabled={type === '' || weight === '' || price === '' || from === '' || to === ''}
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
