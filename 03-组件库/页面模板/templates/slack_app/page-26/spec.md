# Slack Direct Message Model (page-26)

## Overview
A 1:1 visual replica of the Slack mobile application "Direct Message" settings/profile modal. Designed specifically for the Slackbot DM channel context, featuring native iOS grouped table view architectural styles.

## Design Details 
- **Layout:** Standard iOS Grouped Table View pattern. 
- **Backdrop:** Light gray table view background `#F2F2F7`.
- **Containers:** Pure white `#FFFFFF` action rows.
- **Micro-borders:** All dividers accurately replicated using sub-pixel iOS border simulation (`0.5px` width, `#E5E5EA` color).
- **Typography:**
  - Nav Title: `17px` bold, `#1D1C1D`.
  - Body Action Titles: `17px` normal, `#1D1C1D`.
  - Subtitle text: `15px` normal, `#8E8E93`.
- **Iconography:**
  - Direct translation of the Close DM vector path explicitly mapped as an open-box with arrow outgoing.
  - Native SVG replication of the Slackbot brand icon featuring colored quadrants underneath a defined white smiling-bot clip-path.

## Interactions
- Added subtle state feedback (`active:bg-gray-50`) mimicking native OS table cell depression feedback mechanics.
