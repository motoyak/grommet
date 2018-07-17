var _templateObject = _taggedTemplateLiteralLoose(['\n  ', '\n'], ['\n  ', '\n']);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import styled, { css, keyframes } from 'styled-components';
import { backgroundStyle, parseMetricToNum } from '../../utils';

var sizeStyle = function sizeStyle(props) {
  var data = props.theme.calendar[props.size];
  return css(['font-size:', ';line-height:', ';width:', ';'], data.fontSize, data.lineHeight, props.theme.global.size[props.size]);
};

var StyledCalendar = styled.div.withConfig({
  displayName: 'StyledCalendar'
})(['', ''], function (props) {
  return sizeStyle(props);
});

export var StyledWeeksContainer = styled.div.withConfig({
  displayName: 'StyledCalendar__StyledWeeksContainer'
})(['overflow:hidden;', ''], function (props) {
  return 'height: ' + parseMetricToNum(props.theme.calendar[props.size].daySize) * 6 + 'px;';
});

var slideStyle = function slideStyle(props) {
  var _props$slide = props.slide,
      direction = _props$slide.direction,
      weeks = _props$slide.weeks,
      size = props.size,
      theme = props.theme;
  var _theme$calendar$size = theme.calendar[size],
      daySize = _theme$calendar$size.daySize,
      slideDuration = _theme$calendar$size.slideDuration;

  var amount = parseMetricToNum(daySize) * weeks;
  return css(['animation ', ' ', ' forwards;'], keyframes(['from{transform:translateY(', ')}to{transform:translateY(', ')}'], direction === 'down' ? '-' + amount + 'px' : '0', direction === 'up' ? '-' + amount + 'px' : '0'), slideDuration);
};

export var StyledWeeks = styled.div.withConfig({
  displayName: 'StyledCalendar__StyledWeeks'
})(['position:relative;', ''], function (props) {
  return props.slide && slideStyle(props);
});

export var StyledWeek = styled.div.withConfig({
  displayName: 'StyledCalendar__StyledWeek'
})(['display:flex;flex-direction:row;flex-justify:between;']);

export var StyledDayContainer = styled.div.withConfig({
  displayName: 'StyledCalendar__StyledDayContainer'
})(['flex:0 0 auto;']);

var daySizeStyle = function daySizeStyle(props) {
  var data = props.theme.calendar[props.size];
  return css(['width:', ';height:', ';'], data.daySize, data.daySize);
};

export var StyledDay = styled.div.withConfig({
  displayName: 'StyledCalendar__StyledDay'
})(['display:flex;justify-content:center;align-items:center;', ' ', ' ', ' ', ''], function (props) {
  return daySizeStyle(props);
}, function (props) {
  return props.isSelected && backgroundStyle('brand', props.theme) || props.inRange && backgroundStyle({ color: 'brand', opacity: 'weak' }, props.theme);
}, function (props) {
  return props.otherMonth && 'opacity: 0.5;';
}, function (props) {
  return props.isSelected && 'font-weight: bold;';
});

export default StyledCalendar.extend(_templateObject, function (props) {
  return props.theme.calendar && props.theme.calendar.extend;
});