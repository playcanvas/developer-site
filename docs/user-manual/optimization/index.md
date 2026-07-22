---
title: Optimization
description: Why and how to optimize load time, frame rate, CPU, GPU load, and memory in PlayCanvas applications.
---

:::ai

- **[Engine Development](/user-manual/ai/developing-with-engine/):** Inspect the project, choose the Optimization features described here that match the requested outcome, and implement only those features; measure the relevant profiler, loading, memory, or frame-time metric before and after the change.

:::

Optimization is a critical part of developing a PlayCanvas application. It can mean the difference between a great user experience and a terrible one.

:::tip

Don't wait until a project is near completion before you consider optimization. Be thinking about it from the start. It may meaningfully impact how you design your application.

:::

Let's begin by establishing the key goals for optimization and highlight why each goal is important:

| Goal | Why it matters |
| ---- | -------------- |
| ⏱️ Minimize load time | Your users have limited patience. If your app does not load quickly, they may give up waiting and go elsewhere. |
| 🎞️ Maximize frame rate | A high (and stable) frame rate makes for pleasing visuals and low latency response to user input. |
| 🔋 Minimize CPU and GPU load | Just because your app maintains 60 frames per second does not mean your work is done. Reducing processor load preserves battery power and keeps devices running cool. |
| 🧠 Minimize memory utilization | Browsers allocate a limited pool of memory to applications. Once this pool is exhausted, the tab will crash and reload. Your users will be upset! |
