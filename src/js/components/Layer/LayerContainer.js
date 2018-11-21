import React, { createRef, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { ThemeContext as IconThemeContext } from 'grommet-icons/contexts';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { withTheme } from '../hocs';
import { backgroundIsDark } from '../../utils';

import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

const hiddenAnchor = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  position: 'absolute',
};

class LayerContainer extends Component {
  static defaultProps = {
    full: false,
    margin: 'none',
    modal: true,
    position: 'center',
  };

  anchorRef = createRef();

  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    const { theme } = nextProps;
    const { theme: stateTheme } = prevState;
    // set dark context based on layer background, not Layer's container.
    let { dark } = theme;
    if (theme.layer.background) {
      dark = backgroundIsDark(theme.layer.background, theme);
    }
    if (!dark !== !theme.dark) {
      if (!stateTheme || dark !== stateTheme.dark) {
        return {
          theme: {
            ...theme,
            dark,
            icon: dark ? theme.iconThemes.dark : theme.iconThemes.light,
          },
        };
      }
    } else if (stateTheme) {
      return { theme: undefined };
    }
    return null;
  }

  containerRef = React.createRef();

  layerRef = React.createRef();

  componentDidMount() {
    const { position } = this.props;
    if (position !== 'hidden') {
      this.makeLayerVisible();
      // once layer is open we set the focus in the hidden
      // anchor so that you can start tabbing inside the layer
      if (this.anchorRef.current) {
        this.anchorRef.current.focus();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { position } = this.props;
    if (prevProps.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  makeLayerVisible = () => {
    /* eslint-disable-next-line react/no-find-dom-node */
    const node = findDOMNode(
      this.layerRef.current || this.containerRef.current,
    );
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
  };

  render() {
    const {
      children,
      id,
      modal,
      onClickOutside,
      onEsc,
      plain,
      position,
      responsive,
      theme: propsTheme,
      ...rest
    } = this.props;
    const { theme: stateTheme } = this.state;
    const theme = stateTheme || propsTheme;

    let content = (
      <StyledContainer
        id={id}
        {...rest}
        theme={theme}
        position={position}
        plain={plain}
        responsive={responsive}
        ref={this.containerRef}
      >
        {/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <a
          ref={this.anchorRef}
          tabIndex="-1"
          aria-hidden="true"
          style={hiddenAnchor}
        />
        {/* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        {children}
      </StyledContainer>
    );

    if (modal) {
      content = (
        <StyledLayer
          id={id}
          plain={plain}
          position={position}
          theme={theme}
          responsive={responsive}
          tabIndex="-1"
          ref={this.layerRef}
        >
          <StyledOverlay
            plain={plain}
            onMouseDown={onClickOutside}
            responsive={responsive}
            theme={theme}
          />
          {content}
        </StyledLayer>
      );
      /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
    }

    if (onEsc) {
      content = <Keyboard onEsc={onEsc}>{content}</Keyboard>;
    }

    if (modal) {
      content = (
        <FocusedContainer hidden={position === 'hidden'} restrictScroll>
          <IconThemeContext.Provider value={theme.icon}>
            {content}
          </IconThemeContext.Provider>
        </FocusedContainer>
      );
    }

    return content;
  }
}

const LayerContainerWrapper = withTheme(LayerContainer);

export { LayerContainerWrapper as LayerContainer };
