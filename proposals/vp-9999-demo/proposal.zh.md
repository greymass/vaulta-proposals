---
lang: zh
source: df8219bf6f336564eedbe73f1ab2160e372f7973
excerpt: 一份演示文档，用于检验提案渲染器，涵盖各级标题、表格、代码块、图片、跨提案链接、非拉丁文字，以及实时链上 msig 与 sentiment 绑定。它存在于 demo 分支，不具备任何治理效力。
revisions:
    - version: 1
      date: 2026-08-10
      summary: 发布渲染演示文档的初始草稿，涵盖标题、表格、代码和图片。
    - version: 2
      date: 2026-08-11
      summary: 为扩展标题清单，新增包含韩文和中文文本的五级和六级标题。
    - version: 3
      date: 2026-08-12
      summary: 撰写用于提案索引卡片的演示摘要。
---

# 提案渲染系统演示

[English](proposal.md) | [한국어](proposal.ko.md) | [中文](proposal.zh.md)

## 摘要

本提案存在于 `demo` 分支，用于在单个文档中演练提案渲染系统的全部功能：各级标题、
表格、代码、图片、跨提案链接、非拉丁文字标题，以及实时链上绑定。它从不合并到
`master`，也不具备任何治理效力。

## 渲染功能

行内 `code`、**加粗**、*斜体*。

### 表格

| 功能 | 来源 | 渲染方 |
| --- | --- | --- |
| Markdown 正文 | `proposal.md` | `VpMarkdown` |
| Msig 绑定 | 前置元数据 `msigs` | msig 卡片 |
| 情绪绑定 | 前置元数据 `sentiment` | 话题卡片 |

### 代码

```json
{ "vp": "VP-9999", "purpose": "demonstration" }
```

### 图片

![渲染流水线](assets/pipeline.svg)

### 한국어 제목

根据 VPS-1 的 GFM 约定，标题 id 必须在韩文文本中保持稳定。

### 中文标题

中文文本同样适用。

#### 深层标题

五级和六级标题在下方延续，补全标题清单。

##### 更深标题

五级标题以与四级相同的字重、更小的字号呈现。

###### 最深标题

六级标题在此使用中文文本，因此最深一级的标题 id 为非拉丁字符。

## 交叉引用

本演示引用了 [VP-0001](../vp-0001-ram-gifting/proposal.md)，以及标准本身在某一固定
版本的内容：[VPS-1](https://github.com/greymass/vaulta-proposals/blob/07a0a53c46c9dc83b295f7471b5738dba244882a/standard/VPS-1.md)。

## 链上绑定

前置元数据绑定了一个活跃的 msig 和一个情绪话题，因此文档下方的卡片会渲染实时数据。
前置元数据为准，本段正文仅供参考。

## 待解决问题

无。

## 后续步骤

本文档之后不再有后续内容。它作为渲染演示文档保留在 `demo` 分支，每当有新提案落地，
通过将 `master` 合并到 `demo` 来刷新。
