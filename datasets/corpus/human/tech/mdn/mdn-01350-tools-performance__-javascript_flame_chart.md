# JavaScript flame chart

Determining why CPUs are busy is a routine task for performance analysis, which often involves profiling stack traces. Profiling by sampling at a fixed rate is a coarse but effective way to see which code-paths are hot (busy on-CPU). It usually works by creating a timed interrupt that collects the current program counter, function address, or entire stack back trace, and translates these to something human readable when printing a summary report.

Profiling data can be thousands of lines long, and difficult to comprehend. Flame graphs are a visualization for sampled stack traces, which allows hot code-paths to be identified quickly. See theFlame Graphs main page for uses of this visualization other than CPU profiling.

Flame Graphs can work with any CPU profiler on any operating system. My examples here use Linux perf_events, DTrace, SystemTap, and ktap. See the Updates list for other profiler examples, and github for the flame graph software.