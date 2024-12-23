import { Button, Input, Section, Textarea} from '@telegram-apps/telegram-ui';

export const FormSection = () => (
  <Section header="Заполните форму ниже" footer={<div style={{padding: '0px 20px', marginTop: '20px'}}><Button size="l" mode='filled' stretched>Добавить</Button></div>}>
    <Input header="Груз" placeholder="Тип груза" /> 
    <Input header="Вес" placeholder="Общий вес посылки в кг" /> 
    <Input header="Цена за кг" placeholder="Стоимость доставки за килограмм" /> 
    <Input header="Откуда" placeholder="Город отправления" /> 
    <Input header="Куда" placeholder="Город назначения" />
    <Textarea header="Комментарий" placeholder="Дополнительные детали" />
  </Section>
);
