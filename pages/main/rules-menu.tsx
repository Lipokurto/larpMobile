import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { TooltipMenu } from 'react-native-tooltip-menu';
import axios from 'axios';

import rulesButtonImg from '../../assets/rulesButton.png';

import { resolvePath } from '../../utils/resolve-path';
import { getRules } from '../../android/api/materials';
import { openPdf } from '../../utils/open-pdf';

type RuleItem = {
  label: string;
  link: string;
};

type Rules = {
  common: RuleItem;
  battle: RuleItem;
  vote: RuleItem;
};

type Data = {
  type: string;
  version: string;
  link: string;
};

export function RulesMenu(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [rules, setRules] = React.useState<Rules>({
    common: {
      label: '',
      link: '',
    },
    battle: {
      label: '',
      link: '',
    },
    vote: {
      label: '',
      link: '',
    },
  });

  React.useEffect(() => {
    setIsLoading(true);
    const fetchRules = async () => {
      try {
        const response = await axios.get(getRules);
        const rulesDTO = {
          common: {
            link: response.data.find((p: Data) => p.type === 'common')?.link,
            label: `Общие правила v${
              response.data.find((p: Data) => p.type === 'common')?.version
            }`,
          },
          battle: {
            link: response.data.find((p: Data) => p.type === 'battle')?.link,
            label: `Боевые ивенты v${
              response.data.find((p: Data) => p.type === 'battle')?.version
            }`,
          },
          vote: {
            link: response.data.find((p: Data) => p.type === 'vote')?.link,
            label: `Голосование v${
              response.data.find((p: Data) => p.type === 'vote')?.version
            }`,
          },
        };
        setRules(rulesDTO);
      } catch (err) {
        console.log('error', err);
      }

      setIsLoading(false);
    };

    fetchRules();
  }, []);

  const getButtonStyle = React.useCallback(() => {
    if (isLoading) {
      return style.buttonLoading;
    }

    if (rules.common.link === '') {
      return style.buttonDisabled;
    }

    return style.buttonActive;
  }, [isLoading, rules.common.link]);

  return (
    <View
      pointerEvents={isLoading || rules.common.link === '' ? 'none' : 'auto'}>
      <TooltipMenu
        labelContainerStyle={style.label}
        style={style.container}
        labelStyle={style.itemText as ViewStyle}
        trianglePosition="center"
        items={[
          {
            label: rules.common.label,
            onPress: () => openPdf(rules.common.link),
          },
          {
            label: rules.battle.label,
            onPress: () => openPdf(rules.battle.link),
          },
          {
            label: rules.vote.label,
            onPress: () => openPdf(rules.vote.link),
          },
        ]}>
        <View style={getButtonStyle()}>
          <ImageBackground
            style={style.rules}
            // eslint-disable-next-line react-native/no-inline-styles
            imageStyle={{
              height: 50,
              width: 120,
            }}
            source={{
              uri: resolvePath(rulesButtonImg),
            }}
            resizeMode="stretch">
            <Text style={style.buttonText}>Правила</Text>
          </ImageBackground>
        </View>
      </TooltipMenu>
    </View>
  );
}

const style = StyleSheet.create({
  label: {
    backgroundColor: 'wheat',
  },
  container: {
    height: 50,
    width: 120,
  },
  rules: {
    height: 50,
    width: 120,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 23,
    color: 'white',
    fontFamily: 'mr_ReaverockG',
  },
  itemText: {
    fontSize: 23,
    color: 'black',
    fontFamily: 'mr_ReaverockG',
  },
  buttonActive: {
    height: 50,
    width: 123,
  },
  buttonDisabled: {
    opacity: 0,
    height: 50,
    width: 123,
  },
  buttonLoading: {
    opacity: 0.3,
    height: 50,
    width: 123,
  },
});
