import { AppRoot } from '@telegram-apps/telegram-ui';
import { FormSection } from './components/FormSection/FormSection';

export const App = () => (
  <AppRoot>
    <div style={{maxHeight: '100dvh', overflowY: 'auto'}}>
      <FormSection/>
    </div>
  </AppRoot>
);
