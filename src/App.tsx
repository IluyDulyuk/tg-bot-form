import React from 'react';

import { AppRoot, List } from '@telegram-apps/telegram-ui';
import { FormSection } from './components/FormSection/FormSection';

export const App = () => (
  <AppRoot>
    <List>
      <FormSection />
    </List>
  </AppRoot>
);
