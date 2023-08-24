# TODO

## New Features
### 🔨👷 Create a `job/task` System
Each set of timers should be associated with a `job/task`. This necessitates
the creation of an entire webpage dedicated to managing `job/task`. On this
`job/task` page, users will be able to add new `job/task`, reorganize them,
rename them, and click on them. If a `job/task` is selected, the user will be
redirected to the `timers` webpage.

### ✅ Use `Workers` for Background Processing
Implement the `Worker` interface to execute timers in a separate thread,
allowing them to run in the background.

## Major Changes
### ⌚ Add a `timers` Section
Every recorded time-lapse will be listed in this section.

### ⌚ Add a `totalHours` Counter
Calculate the sum of all timers and display it in a `totalHours` counter.

## Minor Changes
### ⌚ Separate Each Digit into Its Own Element
To prevent unusual effects while numbers are changing, it is essential to
separate each digit into its own element.

### ⌚ Add the Current Date to the `timers` Array
The `timers` array should include not only the time-lapse but also the
date it was created.

## Optimization
### ⌚ Delete and Recreate the `countTimer` Interval
Currently, there is a single `setInterval` function that runs continuously until
the tab is closed. It would be beneficial to find a way to stop and
restart the interval function.

### ⌚ Keep `timers` in Memory
Storing `timers` in memory will reduce localStorage access and improve
performance.

### ⌚ Add One List Item at a Time
Currently, all the timers are printed each time we add a timer to the
`timers` list.

### ⌚ Refactor Common Code (Global)
Identical code fragments exist in all files and could be encapsulated for
improved maintainability.