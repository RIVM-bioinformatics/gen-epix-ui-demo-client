import {
  Box,
  Typography,
} from '@mui/material';

export const ConsentDialogContent = () => {
  return (
    <Box>
      <Box marginBottom={1}>
        <Typography component={'p'}>
          {'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'}
          <br />
          {'Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.'}
        </Typography>
      </Box>

      <Typography variant={'h6'}>
        {'Quisque sit amet est et sapien ullamcorper:'}
      </Typography>

      <ul>
        <li>{'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.'}</li>
        <li>{'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.'}</li>
        <li>{'Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.'}</li>
        <li>{'Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.'}</li>
      </ul>
    </Box>
  );
};
