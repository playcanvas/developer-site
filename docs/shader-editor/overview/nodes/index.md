---
title: Nodes
description: "Common node structure with ports and the three categories in Shader Editor: input nodes, output nodes, and transform nodes."
sidebar_position: 2
---

Shader Editor supports many types of nodes, but they all have the following structure:

![Graph Editor Node](pathname:///img/shader-editor/graph-editor-node.png)

| Node structure |               |
| -------------- | ------------- |
| 1              | Node type.    |
| 2              | Input Ports.  |
| 3              | Output Ports. |

Certain nodes have no input ports and others have no output ports. (Though all nodes have at least one port).

### Node Categories

Based on this, we can identify three categories of nodes:

- Input nodes - these have output ports, but no input ports.
- Output nodes - these have input ports, but no output ports.
- Transform nodes - these have both input ports and output ports.
