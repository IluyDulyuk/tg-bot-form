import { AppRoot } from '@telegram-apps/telegram-ui';
import { FormSection } from './components/FormSection/FormSection';

export const App = () => (
  <AppRoot>
    <div style={{maxHeight: '100dvh', overflowY: 'auto', height: '100dvh'}}>
      <FormSection/>
    </div>
  </AppRoot>
);
