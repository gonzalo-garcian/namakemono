# TODO

## Major Changes
### Add a "Timers" Section
Every recorded time-lapse will be listed in this section.

## Minor Changes
### Separate Each Digit into Its Own Element
To prevent strange effects while numbers are changing, it is essential to
separate each digit into its own element.

### Add the Current Date to the `timers` Array
The `timers` array should not only include the time-lapse but also the
date it was created.

## Optimization
### Delete and Recreate the countTimer Interval
Currently, there is a single `setInterval` function that runs continuously until
the tab is closed. It would be beneficial to find a way to stop and
restart the interval function.

### Keep `timers` in Memory
Keeping `timers` in memory will reduce localStorage access and improve
performance.

### Add One List Item at a Time
Currently, all the timers are printed each time we add a timer to the
`timers` list.