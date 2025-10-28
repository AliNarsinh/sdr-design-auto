# SDR Copilot MVP - Design Guidelines

## Design Approach

**Selected System**: Linear-inspired Design with enterprise productivity focus

**Justification**: This is a utility-focused, data-intensive productivity application requiring efficiency, clarity, and fast navigation across hundreds of leads. Linear's design philosophy perfectly balances modern aesthetics with functional density—essential for SDR workflows where users need to process information quickly and take action decisively.

**Core Principles**:
- Information density over visual fluff
- Clear hierarchy for rapid scanning
- Minimal friction between thought and action
- Systematic consistency across all interfaces

---

## Typography System

**Font Stack**: Inter (primary), SF Mono (code/data)

**Hierarchy**:
- **Page Headers**: text-2xl (24px), font-semibold, tracking-tight
- **Section Headers**: text-lg (18px), font-semibold
- **Card/Component Headers**: text-base (16px), font-medium
- **Body Text**: text-sm (14px), font-normal
- **Labels/Metadata**: text-xs (12px), font-medium, uppercase tracking-wide
- **Data/Metrics**: text-sm (14px), font-mono for numbers
- **Micro Labels**: text-xs (12px), font-normal

**Reading Comfort**: Line height of 1.5 for body text, 1.2 for headers

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 3, 4, 6, 8, 12, 16

**Common Patterns**:
- Component padding: p-4 or p-6
- Section spacing: space-y-6 or space-y-8
- Tight groupings: gap-2 or gap-3
- Generous separations: gap-8 or gap-12
- Page margins: px-6 lg:px-8

**Grid Architecture**:
- Main layout: Sidebar (256px fixed) + Content (flex-1 with max-w-7xl)
- List views: Grid-based with gap-4
- Card layouts: 2-column on desktop (grid-cols-2), single on mobile
- Dashboard metrics: 3-5 columns (grid-cols-3 lg:grid-cols-5)

---

## Component Library

### Navigation & Structure

**Sidebar (Fixed Left)**:
- Width: w-64 (256px)
- Structure: Logo (h-16) + Navigation items (py-2 px-3 each) + Bottom section for Chat/Settings
- Navigation items: Icon + Label, hover state with subtle background shift
- Active state: Distinct background treatment and border indicator

**Top Bar (Global)**:
- Height: h-16 (64px)
- Structure: Breadcrumb/Page title (left) + Search (center) + User menu (right)
- Search: Expandable on focus from w-64 to w-96

### Dashboard Components

**KPI Cards (Top Metrics)**:
- Layout: Grid with 5 columns on desktop, 2-3 on tablet, stacked on mobile
- Structure: Label (text-xs uppercase) + Value (text-3xl font-semibold) + Change indicator (text-sm with arrow)
- Padding: p-4
- Spacing between cards: gap-4

**To-Do Panel**:
- Card format with p-6
- Each item: Count (text-2xl) + Description (text-sm) + Arrow link
- Vertical stack with space-y-4
- Clickable area with hover elevation

### List Views (Your Leads, Lead Alerts)

**Table Structure**:
- Header: Sticky with backdrop-blur, py-3 px-4
- Row: py-3 px-4, hover state with background shift
- Columns: Flexible width with text truncation
- Actions column: Always visible on right, w-32

**Filters Bar**:
- Height: h-14
- Layout: Horizontal scroll on mobile, flex-wrap on desktop
- Each filter: Dropdown button with px-4 py-2
- Active filters: Show as dismissible chips below bar

**Pagination**:
- Bottom aligned, py-4
- Shows: "1-50 of 500" + Previous/Next buttons
- Jump to page dropdown on larger screens

### Lead Detail View (Split Layout)

**Layout**: 2-column grid (grid-cols-3), left takes 1 column, right takes 2 columns

**Left Panel (Lead Info)**:
- Fixed scroll container
- Sections with py-4 px-6
- Section headers: pb-2 border-b
- Content spacing: space-y-3

**Right Panel (Task Cards)**:
- Vertical stack with space-y-4
- Each card: p-6, rounded-lg border
- Card header: flex justify-between items-start, pb-4
- Card actions: flex gap-2, pt-4 border-t

**Chat/Timeline (Bottom Right)**:
- Fixed height: h-96 with internal scroll
- Messages: py-3 px-4 with timestamp (text-xs) above
- Input area: Fixed at bottom, p-4, border-t

### Forms & Inputs

**Input Fields**:
- Height: h-10 (40px)
- Padding: px-3 py-2
- Focus ring: ring-2 with offset
- Label above: text-sm font-medium, pb-2

**Buttons**:
- Primary: h-10, px-4, font-medium, rounded-md
- Secondary: Same size, different visual treatment
- Icon buttons: h-8 w-8 square, centered icon
- Button groups: gap-2 or gap-3

**Dropdowns/Selects**:
- Same height as inputs (h-10)
- Chevron icon on right
- Menu: Elevated with shadow, max-h-60 with scroll

### Cards & Containers

**Standard Card**:
- Padding: p-6
- Rounded: rounded-lg
- Border: 1px solid
- Spacing between cards: gap-4 or gap-6

**Compact Card** (for grids):
- Padding: p-4
- Rounded: rounded-md
- Tighter internal spacing: space-y-2

**Modal/Drawer**:
- Max width: max-w-2xl for modals
- Drawer: w-96 or w-1/3 screen
- Header: p-6 border-b
- Content: p-6
- Footer: p-6 border-t with action buttons

### Sequences Editor

**Step List**:
- Vertical with connecting lines between items
- Each step: Flex row with drag handle (w-6) + Icon (w-8) + Content (flex-1) + Actions (w-24)
- Step content padding: p-4
- Drag handles visible on hover

**Template Editor**:
- Full-width textarea with min-h-48
- Variable chips: Inline, px-2 py-1, rounded
- Toolbar above: flex gap-2, h-10

---

## Special Patterns

### Setup Wizard Flow
- Centered container: max-w-3xl mx-auto
- Progress indicator at top: Step dots with connecting lines
- Section spacing: space-y-8
- Large CTAs: w-full h-12 for primary actions

### Dashboard Analytics (Manager View)
- Chart containers: h-64 or h-80
- Multiple charts in grid: grid-cols-2 gap-6
- Chart headers: pb-4 with metric and timeframe selector

### Signal/Alert Display
- Badge format for signal types
- Timestamp: text-xs with relative time
- Supporting links: Underlined on hover, text-sm

### Empty States
- Centered content: text-center max-w-md mx-auto
- Icon: h-16 w-16, mb-4
- Heading: text-lg font-semibold, mb-2
- Description: text-sm, mb-6
- CTA button: Centered

---

## Accessibility & Interactions

**Focus States**: 
- Ring-2 with offset for all interactive elements
- Visible outline on keyboard navigation

**Keyboard Navigation**:
- J/K for list navigation
- Enter to open/select
- Esc to close modals/drawers
- Tab order follows visual hierarchy

**Loading States**:
- Skeleton screens for lists (h-12 rounded with pulse)
- Spinner for inline actions (h-4 w-4)
- Progress bars for multi-step operations

**Responsive Breakpoints**:
- Mobile: Single column, stacked layout
- Tablet (md:): 2-column grids, condensed sidebar
- Desktop (lg:): Full layout as designed

---

## Images

**No hero images required** - this is a utility application focused on data and tasks. Any visual elements should be functional:

- **Empty state illustrations**: Simple line drawings (h-32 w-32) for "No leads yet" states
- **Company logos**: Small avatars (h-8 w-8) in lead lists
- **User avatars**: Circular, h-8 w-8 in headers, h-10 w-10 in detail views