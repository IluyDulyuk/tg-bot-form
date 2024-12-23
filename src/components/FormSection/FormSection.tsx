import { Button, Input, Section, Select, Textarea } from '@telegram-apps/telegram-ui';
import { useState } from 'react';

export const FormSection = () => {

  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');

  const onWeightFocus = () => {
    const value = weight.split(' ')[0];
    setWeight(value)
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

  return (
    <>
      <Section header="Общая информация">
        <Input header="Груз" placeholder="Тип груза" value={type} onChange={(e) => setType(e.target.value)} />
        <Input header="Вес" placeholder="Общий вес посылки в кг" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onWeightFocus} onBlur={onWeightBlur} />
        <Input header="Цена за кг" placeholder="Стоимость доставки за кг" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.]/g, '').replace(/(\..*?)\./g, '$1'))} onFocus={onPriceFocus} onBlur={onPriceBlur} />
      </Section>
      <Section header="Откуда">
        <Select>
          <option>Москва</option>
          <option>Красноярск</option>
        </Select>
      </Section>
      <Section header="Куда">
        <Select>
          <option>Москва</option>
          <option>Красноярск</option>
        </Select>
      </Section>
      <Section header="Дополнительно">
        <Textarea header="Комментарий" placeholder="Дополнительные детали" />
      </Section>
      <div style={{padding: '20px'}}>
      <Button
          size='l'
          stretched
        >Добавить</Button>
      </div>
    </>
  )
};
