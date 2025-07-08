import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { View, Platform } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function HapticTab(props: BottomTabBarButtonProps) {
  const { accessibilityState, children } = props;
  const selected = accessibilityState?.selected;
  const scale = useSharedValue(selected ? 1.08 : 1);
  const opacity = useSharedValue(selected ? 1 : 0.85);
  const underline = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    scale.value = withTiming(selected ? 1.08 : 1, { duration: 220 });
    opacity.value = withTiming(selected ? 1 : 0.85, { duration: 220 });
    underline.value = withTiming(selected ? 1 : 0, { duration: 220 });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const underlineStyle = useAnimatedStyle(() => ({
    opacity: underline.value,
    transform: [{ scaleX: underline.value }],
  }));

  return (
    <Animated.View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, animatedStyle]}>
      <PlatformPressable
        {...props}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onPressIn={(ev) => {
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          scale.value = withTiming(1.12, { duration: 120 });
          props.onPressIn?.(ev);
        }}
        onPressOut={(ev) => {
          scale.value = withTiming(selected ? 1.08 : 1, { duration: 120 });
          props.onPressOut?.(ev);
        }}
        onHoverIn={() => {
          if (Platform.OS === 'web') scale.value = withTiming(1.12, { duration: 120 });
        }}
        onHoverOut={() => {
          if (Platform.OS === 'web') scale.value = withTiming(selected ? 1.08 : 1, { duration: 120 });
        }}
      >
        {children}
        <Animated.View style={[{
          height: 4,
          borderRadius: 2,
          backgroundColor: '#0a7ea4',
          marginTop: 2,
          width: 28,
          alignSelf: 'center',
        }, underlineStyle]} />
      </PlatformPressable>
    </Animated.View>
  );
}
