import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  setThemeStart,
  setThemeLightStart,
} from '../../redux-sagas/theme/theme.action';

import { selectBackground } from '../../redux-sagas/theme/theme.selector';
import data from './data';
import { RadioButton, Selection, Input, Wrapper, Label } from './Theme.style';
import UseThemeState from './Theme.state';

const Theme = ({
  setThemeStart: setDark,
  setThemeLightStart: setLight,
  theme,
}) => {
  const [handleTheme] = UseThemeState(setDark, setLight);
  return (
    <>
      <Wrapper>
        {data.map((radio) => (
          <RadioButton htmlFor={radio.id} key={radio.name}>
            <Input
              type='radio'
              id={radio.id}
              name='radio'
              onChange={handleTheme}
              checked={theme === radio.name.toLowerCase()}
            />
            <Selection />
            <Label style={{ margin: 0, fontSize: '1.8rem' }}>
              {radio.name}
            </Label>
          </RadioButton>
        ))}
      </Wrapper>
    </>
  );
};

Theme.propTypes = {
  setThemeStart: PropTypes.func.isRequired,
  setThemeLightStart: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  theme: selectBackground,
});

const mapDispatchToProps = (dispatch) => ({
  setThemeStart: () => dispatch(setThemeStart()),
  setThemeLightStart: () => dispatch(setThemeLightStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
