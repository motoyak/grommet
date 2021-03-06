import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';

import { expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Drop } from '..';

class TestInput extends Component {
  state = {
    showDrop: false,
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.setState({ showDrop: true }); // eslint-disable-line
  }

  render() {
    const { inputProps, ...rest } = this.props;
    const { showDrop } = this.state;
    let drop;
    if (showDrop) {
      drop = (
        <Drop id="drop-node" target={this.inputRef.current} {...rest}>
          this is a test
        </Drop>
      );
    }
    return (
      <Grommet>
        <input ref={this.inputRef} {...inputProps} />
        {drop}
      </Grommet>
    );
  }
}

describe('Drop', () => {
  afterEach(cleanup);

  test('basic', () => {
    window.scrollTo = jest.fn();
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left right top bottom', () => {
    render(<TestInput align={{ left: 'right', top: 'bottom' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left random', () => {
    render(<TestInput align={{ left: 'random', bottom: 'bottom' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right left top top', () => {
    render(<TestInput align={{ right: 'left', top: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right random', () => {
    render(<TestInput align={{ right: 'random' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('invalid align', () => {
    render(<TestInput align={{ whatever: 'right' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('no stretch', () => {
    render(<TestInput stretch={false} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('close', () => {
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();

    cleanup();
    expect(document.getElementById('drop-node')).toBeNull();
  });

  test('invoke onClickOutside', () => {
    const onClickOutside = jest.fn();
    render(<TestInput onClickOutside={onClickOutside} />);
    expectPortal('drop-node').toMatchSnapshot();

    fireEvent(
      document,
      new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
    );
    expect(onClickOutside).toBeCalled();
  });

  test('resize', () => {
    render(<TestInput />);
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('restrict focus', () => {
    render(<TestInput restrictFocus />);
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();

    cleanup();

    expect(document.activeElement).toMatchSnapshot();
  });
});
