# SKILL: Motion

## Philosophy
Purposeful only — every animation communicates state or feedback.
Nothing decorative. This is a financial operations tool.

## Durations (from tokens — never deviate)
- `DURATION.nav` = 380ms — screen stack pushes, tab switches
- `DURATION.overlay` = 300ms — sheets, modals, toasts
- `DURATION.micro` = 180ms — button press, toggle, badge

## Easing
- Standard: `Easing.bezier(0.4, 0, 0.2, 1)` — most transitions
- Enter: `Easing.bezier(0, 0, 0.2, 1)` — sliding/fading in
- Exit: `Easing.bezier(0.4, 0, 1, 1)` — sliding/fading out

Use **Reanimated 2+** for all animations (runs on UI thread — no jank).
Never use React Native's `Animated` API directly.

## Press states
```ts
const pressed = useSharedValue(0);
const animStyle = useAnimatedStyle(() => ({
  opacity: withTiming(pressed.value ? 0.82 : 1, { duration: DURATION.micro }),
  transform: [{ scale: withTiming(pressed.value ? 0.97 : 1, { duration: DURATION.micro }) }],
}));
```

## Skeleton shimmer
Opacity 0.4→0.9→0.4, loop, 1200ms per cycle.
Shaped like the target item. Never static grey.

## Credit bar fill (WalletCard, VoucherDetailsSheet)
On mount: width animates from 0% to actual value over 800ms, enter easing.

## Chart draw-in
On mount and data change: line draws left-to-right over 800ms.
Bars rise from 0 over 600ms, staggered 60ms per bar.

## Sheet (bottom sheet)
Enter: translateY from screenHeight to 0, 300ms enter easing.
Backdrop: opacity 0→0.5, 300ms.
Exit: reverse. Swipe down at velocity > 0.5 dismisses.

## OTP input
On character entry: subtle scale pop (1→1.15→1, 100ms) on the filled box.
On complete: the row does a brief shake-then-settle if wrong,
a brief scale-up-then-down if correct.

## Delegation banner
Slides down from above the wallet card on mount (translateY -40→0, 300ms).
Leaf (ACCEPTED) or marigold (PENDING) left border pulses once on appear.

## Agreement screen
"Accept & Continue" button animates from disabled (opacity 0.4) to
enabled (opacity 1.0) over 300ms once the checkbox is checked.
CheckBox tick draws in (scale 0→1, 200ms).

## Notification bell
On new unread: bell rotates ±8° twice (240ms), badge pops (scale 1→1.3→1).

## What NOT to animate
- Decorative elements, logos, section headers
- List items the user didn't interact with
- Anything that would play > once without user action (except shimmer)
- No spring/bounce/elastic — this is a financial tool
