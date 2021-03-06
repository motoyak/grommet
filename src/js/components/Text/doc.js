import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Text => {
  const DocumentedText = describe(Text)
    .availableAt(getAvailableAtBadge('Text'))
    .description('Arbitrary text.')
    .usage(
      `import { Text } from 'grommet';
<Text />`,
    );

  DocumentedText.propTypes = {
    ...genericProps,
    color: PropTypes.string.description(
      'A color identifier to use for the text color.',
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ]),
      PropTypes.string,
    ]).description(
      `The font size is primarily driven by the chosen tag. But, it can
be adjusted via this size property. The tag should be set for semantic
correctness and accessibility. This size property allows for stylistic
adjustments.`,
    ),
    tag: PropTypes.string
      .description('The DOM tag to use for the element.')
      .defaultValue('span'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end'])
      .description('How to align the text inside the component.')
      .defaultValue('start'),
    truncate: PropTypes.bool
      .description(
        `Restrict the text to a single line and truncate with ellipsis if it
is too long to all fit.`,
      )
      .defaultValue(false),
    weight: PropTypes.oneOfType([
      PropTypes.oneOf(['normal', 'bold']),
      PropTypes.number,
    ]).description('Font weight'),
  };

  return DocumentedText;
};
