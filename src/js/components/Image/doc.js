import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const themeDoc = {
  'image.extend': {
    description: 'Any additional style for the Image.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};

export const doc = Image => {
  const DocumentedImage = describe(Image)
    .availableAt(getAvailableAtBadge('Image'))
    .description('An image.')
    .usage(
      `import { Image } from 'grommet';
<Image/>`,
    );

  DocumentedImage.propTypes = {
    ...genericProps,
    fit: PropTypes.oneOf(['cover', 'contain']).description(
      'How the image fills its container.',
    ),
  };

  return DocumentedImage;
};
