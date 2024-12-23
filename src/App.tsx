import React from 'react';

import { AppRoot, List } from '@telegram-apps/telegram-ui';
import { FormSection } from './components/FormSection/FormSection';
// import { ModalSection } from './components/ModalSection/ModalSection';

export const App = () => (
  <AppRoot>
    <List>
      <FormSection />
      {/* <ModalSection /> */}
    </List>
  </AppRoot>
);
