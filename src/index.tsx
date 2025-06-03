import { createRoot } from 'react-dom/client';

import {
  App,
  ConfigManager,
  setup,
} from '@gen-epix/ui';

import { PageEventUtil } from './utils/PageEventUtil';
import { ConfigUtil } from './utils/ConfigUtil';

setup();

ConfigManager.instance.config = ConfigUtil.createConfig();
PageEventUtil.setupPageEventReporting();
createRoot(document.getElementById('root')).render(<App />);
