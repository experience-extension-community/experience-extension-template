// SPDX-License-Identifier: Apache-2.0
// Copyright 2026 Experience Extension Community contributors

import { Keys, onActivate, onEscape } from './keyboard';

describe('a11y/keyboard', () => {
  it('onActivate fires for Enter and Space, no-op otherwise', () => {
    const handler = jest.fn();
    const wrapped = onActivate(handler);

    const enterEvent = { key: Keys.ENTER, preventDefault: jest.fn() };
    const spaceEvent = { key: Keys.SPACE, preventDefault: jest.fn() };
    const tabEvent = { key: Keys.TAB, preventDefault: jest.fn() };

    wrapped(enterEvent);
    wrapped(spaceEvent);
    wrapped(tabEvent);

    expect(handler).toHaveBeenCalledTimes(2);
    expect(enterEvent.preventDefault).toHaveBeenCalled();
    expect(spaceEvent.preventDefault).toHaveBeenCalled();
    expect(tabEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('onEscape fires only on Escape', () => {
    const handler = jest.fn();
    const wrapped = onEscape(handler);

    wrapped({ key: Keys.ESC, preventDefault: jest.fn() });
    wrapped({ key: Keys.ENTER, preventDefault: jest.fn() });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
