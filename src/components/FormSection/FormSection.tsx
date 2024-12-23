import { Button, Input, Section, Select, Textarea } from '@telegram-apps/telegram-ui';
import { useState } from 'react';

export const FormSection = () => {

  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <Section
      header="Заполните форму ниже"
      footer={
        <div style={{ padding: '0px 20px', margin: '20px 0px' }
        }>
          <Button
            disabled
            size="l"
            mode='filled'
            stretched
          >Добавить</Button>
        </div>
      }>
      <Input header="Груз" placeholder="Тип груза" value={type} onChange={(e) => setType(e.target.value)} />
      <Input header="Вес" placeholder="Общий вес посылки в кг" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <Input header="Цена за кг" placeholder="Стоимость доставки за килограмм" />
      {/* <Input header="Откуда" placeholder="Город отправления" />
      <Input header="Куда" placeholder="Город назначения" /> */}
      <Select header="Откуда">
        <option>Москва</option>
        <option>Санкт-Петербург</option>
      </Select>
      <Textarea header="Комментарий" placeholder="Дополнительные детали" />
    </Section>
  )
};
