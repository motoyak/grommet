import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = InfiniteScroll => {
  const DocumentedInfiniteScroll = describe(InfiniteScroll)
    .availableAt(getAvailableAtBadge('InfiniteScroll'))
    .description('A container that lazily renders items.')
    .usage(
      `import { InfiniteScroll } from 'grommet';
<InfiniteScroll />`,
    );

  DocumentedInfiniteScroll.propTypes = {
    children: PropTypes.func.description(
      'Function that will be called when each item is rendered.',
    ),
    items: PropTypes.arrayOf(PropTypes.any).description(
      'The children callback will be called to render each item.',
    ),
    onMore: PropTypes.func.description(
      `Use this to indicate that 'items' doesn't contain all that it could.
      It will be called when the entire list of items has been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed.`,
    ),
    renderMarker: PropTypes.func.description(
      `Function that will be called to render the marker element that
      is inserted into the DOM to track when scrolling nears the end of the
      rendered items. It will be called with a single element that should
      be wrapped appropriately. This is needed when the default
      element, a <span>, isn't sufficient, such as a row of a table body.`,
    ),
    scrollableAncestor: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.oneOf(['window']),
    ]).description(
      `A custom ancestor to determine if the marker is visible in it.
      This is useful in cases where you do not want the immediate
      scrollable ancestor to be the container. For example, when your
      marker is in a div that has overflow auto but you are detecting
      visibility based on the window.
      This should typically be a reference to a DOM node, but it will
      also work to pass it the string "window" if you are using server
      rendering.`,
    ),
    show: PropTypes.number.description(
      'Ensure that the item at this index is visible initially.',
    ),
    step: PropTypes.number
      .description('How many items to render at a time.')
      .defaultValue(50),
  };

  return DocumentedInfiniteScroll;
};
