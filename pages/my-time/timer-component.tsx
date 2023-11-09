import React from 'react';
import { Text, StyleSheet } from 'react-native';
import WoodBG from '../../utils/woodBG';

export default function TimerComponent(props: any): JSX.Element {
  const [over, setOver] = React.useState<boolean>(false);
  const [[h, m, s], setTime] = React.useState(props.route.params.params.timer);

  const tick = React.useCallback(() => {
    if (over) {
      return;
    }

    if (h === 0 && m === 0 && s === 0) {
      setOver(true);
      return;
    }

    if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
      return;
    }

    if (s === 0) {
      setTime([h, m - 1, 59]);
      return;
    }

    setTime([h, m, s - 1]);
  }, [h, m, over, s]);

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, [tick]);

  const renderTime = React.useMemo(() => {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');

    return <Text>{`${hh}:${mm}:${ss}`}</Text>;
  }, [h, m, s]);

  return (
    <WoodBG>
      <Text style={style.timerContainer}>{renderTime}</Text>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  timerContainer: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
    fontFamily: 'mr_ReaverockG',
  },
});
