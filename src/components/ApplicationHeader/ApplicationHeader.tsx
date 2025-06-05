import { Box } from '@mui/material';

import {
  TestIdUtil,
  ApplicationBar,
} from '@gen-epix/ui';
import type { ApplicationHeaderProps } from '@gen-epix/ui';

import LogoLarge from '../../assets/logo/gen-epix-logo-large.svg?react';
import LogoSmall from '../../assets/logo/gen-epix-logo-small.svg?react';

export const ApplicationHeader = ({
  fullWidth,
  fullHeight,
  singleAction,
}: ApplicationHeaderProps) => {

  return (
    <Box
      {...TestIdUtil.createAttributes('ApplicationHeader')}
      sx={{
        zIndex: 2,
        position: 'relative',
      }}
    >
      {!fullHeight && (
        <Box sx={{
          height: '48px',
          position: 'relative',
          '& svg': {
            width: '60%',
            height: '48px',
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translate(-50%, 0)',
          },
        }}
        >
          <LogoLarge />
        </Box>
      )}
      <ApplicationBar
        fullHeight={fullHeight}
        fullWidth={fullWidth}
        singleAction={singleAction}
        smallLogo={(
          <LogoSmall />
        )}
      />
    </Box>
  );
};
