import { Button, Input, Section, Select, Textarea } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';

export const FormSection = () => {

  let chatId;

  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  useEffect(() => {
    const initData = window.Telegram.WebApp.initData;
    const searchParams = new URLSearchParams(initData);
    chatId = searchParams.get('chat_id');
}, []);

  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [from, setFrom] = useState('Москва');
  const [comment, setComment] = useState('');
  const [to, setTo] = useState('Санкт-Петербург');
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
      const value = `${price} $`;
      setPrice(value);
    } 
  }

  const onButton = async () => {
    setLoading(true);

    const data = {
        user: {
            chatId: chatId
        },
        data: {
            type: type,
            weight: weight,
            price: price,
            from: from,
            to: to,
            comment: comment
        }
    }

    await fetch('https://98d5w9-3000.csb.app/api/sendMessage', {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        setLoading(false);
      })

  }

  return (
    <>
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
          onClick={onButton}
          loading={loading}
        >Добавить</Button>
      </div>
    </>
  )
};
