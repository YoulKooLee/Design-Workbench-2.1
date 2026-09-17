# Slack Main Workspace Sidebar (page-28)

## Layout Strategy
Recreates the native drawer shell where the workspace channels tree pushes the active page (`page-27` Chat View) rightwards off-camera.

- **Dual-Layer Architecture:**
  - `Base Z-0 Layout:` Utilizes a complex right-aligned negative margin constraint (the `12%` viewport offset trap) containing a `w-[375px]` fixed dummy of `page-27` (Slackbot chat), faithfully replicating what an iOS navigation stack does to out-of-focus background components.
  - `Foreground Z-20 Tray:` Pushed over 88% of the viewport width. Rendered in classic Slack Aubergine (`#503A51`). 

## Typography & Hierarchy Mapping
- Unread Channels (`designtools`, `general`, etc): Strict `text-white` with `font-bold`. Associated hash icon gets `opacity-80` white injection.
- Read Channels (`pricechange`, `updates`): Standardized `#A99FA9` dim purple mapping matching standard unselected channel aesthetics.
- Selected Direct Message (`Slackbot`): Implemented a precise green activation backdrop `#3B8F70` padding with explicit heart icon alignment.
- Custom Sleep Symbol: Embedded an absolute vector layout over the hollow green ring (`do-not-disturb/offline`) mapping for the inactive current user profile (`huang 🌴 (you)`).
