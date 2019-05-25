import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleSheet, css } from "aphrodite";

const FingerDown = (props) => {
  const {position, delay} = props;

  return (
    <FontAwesomeIcon
      icon='hand-point-down'
      style={{...position, animationDelay: `${delay}ms`}}
      className={css(styles.handDown)}
    />
  );
}

const movingHandDown = [
  {
    'from': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    'to': {
      opacity: 1,
      transform: 'translateY(-70px)'
    }

  }
];

const styles = StyleSheet.create({
  handDown: {
    opacity: 0,
    position: 'absolute',
    fontSize: 40,
    color: '#FF9933',
    animationName: movingHandDown,
    animationTimingFunction: 'linear',
    animationDuration: '800ms',
    animationIterationCount: 6,
    animationDirection: 'alternate-reverse',
    '@media(max-width: 375px)': {
      fontSize: 27,
    }
  },
});

export default FingerDown;