import { Button, Input, Section, Textarea} from '@telegram-apps/telegram-ui';

export const FormSection = () => (
  <Section header="Заполните форму ниже">
    <Input header="Груз" placeholder="Тип груза" /> 
    <Input header="Вес" placeholder="Общий вес посылки в кг" /> 
    <Input header="Цена за кг" placeholder="Стоимость доставки за килограмм" /> 
    <Input header="Откуда" placeholder="Город отправления" /> 
    <Input header="Куда" placeholder="Город назначения" />
    <Textarea header="Комментарий" placeholder="Дополнительные детали" />
    <Button size="l" stretched>Добавить</Button>
  </Section>
);
