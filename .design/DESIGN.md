
A classic e-commerce design system inspired by Vietnamese feudal culture (triều đình Việt Nam). Every surface evokes lacquered rosewood, hand-carved stone reliefs, and the quiet opulence of royal chambers — antique wood brown, imperial cream, burgundy red, and antique gold are the four pillars.

---

## Colors

### Primary Palette

| Token | Hex | Role |
|---|---|---|
| `--color-wood` | `#5C3D1E` | Antique wood brown — primary CTAs, key headings, dominant surfaces |
| `--color-cream` | `#F5EDD6` | Imperial cream — page background, card surfaces, breathing space |
| `--color-burgundy` | `#7B1C2E` | Burgundy red — secondary actions, badges, sale indicators, hover states |
| `--color-gold` | `#C9973A` | Antique gold — accent highlights, dividers, premium cues, icon fills |

### Extended Palette

| Token | Hex | Role |
|---|---|---|
| `--color-lacquer` | `#3A1A0A` | Deep lacquer black — overlines, captions, intense contrast text |
| `--color-parchment` | `#FDF6E3` | Light parchment — card fills, modal backgrounds |
| `--color-ash` | `#C9B99A` | Weathered ash — dividers, muted borders, placeholder text |
| `--color-celadon` | `#7A9E8E` | Celadon green — success states, eco/provenance tags |
| `--color-ink` | `#2C1A0E` | Ink brown — primary body text |

### Semantic Tokens

- **Background**: `#F5EDD6` (cream)
- **Surface**: `#FDF6E3` (parchment)
- **Text Primary**: `#2C1A0E` (ink)
- **Text Secondary**: `#5C3D1E` (wood)
- **Text Muted**: `#9C8670`
- **Border Default**: `#D4B896`
- **Border Strong**: `#C9973A` (gold)
- **Success**: `#3A6B4A`
- **Warning**: `#C9973A`
- **Error**: `#7B1C2E`
- **Info**: `#3D5A6E`

---

## Typography

**Philosophy**: Classical Vietnamese script culture valued brushstroke elegance and deliberate weight. Headings reference calligraphy — tall, graceful serifs. Body text is open and legible, as if inscribed on silk.

- **Headline Font**: Cormorant Garamond *(evokes court-era serif calligraphy)*
- **Body Font**: Lora *(warm, editorial serif for product storytelling)*
- **Label / UI Font**: Raleway *(clean, spaced-out for overlines and navigation)*
- **Mono Font**: JetBrains Mono *(order numbers, tracking IDs)*

| Style | Font | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| Display | Cormorant Garamond | 56px | 300 | 1.08 | 0.03em | Hero banners, collection announcements |
| H1 | Cormorant Garamond | 44px | 400 | 1.12 | 0.02em | Page titles |
| H2 | Cormorant Garamond | 34px | 400 | 1.2 | 0.01em | Section headers, collection names |
| H3 | Cormorant Garamond | 26px | 500 | 1.28 | 0.01em | Product names, feature headings |
| H4 | Cormorant Garamond | 20px | 500 | 1.35 | 0.005em | Card titles, sidebar headings |
| Body Large | Lora | 18px | 400 | 1.75 | 0em | Product stories, editorial introductions |
| Body | Lora | 16px | 400 | 1.7 | 0em | Default paragraph text |
| Body Small | Lora | 14px | 400 | 1.6 | 0em | Specs, material details, provenance notes |
| Overline | Raleway | 11px | 600 | 1.5 | 0.14em | Category labels — UPPERCASE ("ĐỒ GỖ MỸ NGHỆ") |
| Caption | Raleway | 12px | 500 | 1.4 | 0.06em | Stock labels, shipping origin, dimension notes |
| Label | Raleway | 12px | 600 | 1.4 | 0.08em | Form labels — UPPERCASE |
| Code | JetBrains Mono | 14px | 400 | 1.6 | 0em | Order numbers, tracking IDs |

---

## Spacing

Base unit: **8px**

| Token | Value | Usage |
|---|---|---|
| `sp-1` | 4px | Micro gaps (icon–label) |
| `sp-2` | 8px | Tight component internals |
| `sp-3` | 12px | Small component padding |
| `sp-4` | 16px | Default padding |
| `sp-5` | 24px | Card padding (small) |
| `sp-6` | 32px | Card padding (large) |
| `sp-7` | 48px | Section sub-spacing |
| `sp-8` | 64px | Section spacing (mobile) |
| `sp-9` | 96px | Section spacing (tablet) |
| `sp-10` | 128px | Section spacing (desktop) |

---

## Border Radius

Feudal Vietnamese architecture favored **angular precision** with subtle softness — no organic curves, no harsh right angles. This system mirrors carved timber and stone latticework.

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Hero images, full-bleed banners, dividers |
| `radius-xs` | 2px | Chips, badges, small tags |
| `radius-sm` | 4px | Buttons, inputs, filter chips |
| `radius-md` | 6px | Product cards, dropdown menus |
| `radius-lg` | 8px | Modals, feature panels |
| `radius-full` | 9999px | Avatars, dot indicators only |

---

## Elevation

**Philosophy**: Depth is communicated like lacquerware — warm, amber-tinted shadows, never cold gray. Shadows are always cast in antique wood tones.

| Level | Value | Usage |
|---|---|---|
| Subtle | `0 1px 3px rgba(92,61,30,0.08)` | Default card resting state |
| Medium | `0 2px 8px rgba(92,61,30,0.12)` | Hovered cards, dropdowns |
| Large | `0 4px 18px rgba(92,61,30,0.15)` | Modals, drawers |
| Overlay | `0 8px 36px rgba(44,26,14,0.2)` | Full-screen overlays |
| Gold Glow | `0 2px 14px rgba(201,151,58,0.18)` | Premium product highlights, featured badges |

---

## Components

### Buttons

All buttons use `radius-sm` (4px). Text uppercase with generous tracking for a lacquered-seal authority.

- **Primary**: `bg #5C3D1E`, `text #F5EDD6`, `font Raleway 500 13px tracking 0.1em uppercase`, `padding 14px 32px`, height 48px. Hover: `#7A5230`. Active: `#3A1A0A`.
- **Secondary**: `bg transparent`, `text #5C3D1E`, `border 1.5px #5C3D1E`, 4px radius. Hover: `bg rgba(92,61,30,0.06)`.
- **Accent (Burgundy)**: `bg #7B1C2E`, `text #F5EDD6`. Used for promotions and sale CTAs. Hover: `#9B2438`.
- **Ghost**: `bg transparent`, `text #5C3D1E`, no border. Hover: underline, `text-underline-offset 4px`, gold underline `#C9973A`.
- **Destructive**: `bg #7B1C2E`, `text #FDF6E3`. Hover: `#5E1522`.
- **Sizes**: Small 36px / Medium 48px / Large 56px height.
- **Disabled**: 40% opacity, `cursor not-allowed`.

### Cards

- **Product Card**: `bg #FDF6E3`, `border 1px #D4B896`, `radius 6px`, `padding 0 (image flush) / 20px (content)`. Hover: `border-color #C9973A`, shadow Medium, `transition 220ms ease`. Bottom: overline category tag + H3 product name + Body Small material note + gold price label.
- **Featured Card**: `bg #F5EDD6`, `border 2px #C9973A` (gold border), `radius 6px`, shadow Gold Glow. Use for "sản phẩm nổi bật".
- **Seller Story Card**: `bg #FDF6E3`, `border 1px #D4B896`, 8px radius. Includes artisan avatar, name in H4, origin province in Caption, short story in Body Small.

### Inputs

- `bg #FDF6E3`, `border 1.5px #D4B896`, `radius 4px`, `padding 0 16px`, height 48px. `text #2C1A0E`, `placeholder #9C8670`. `font Lora 16px`.
- Focus: `border-color #C9973A`, `ring 2px rgba(201,151,58,0.25)`.
- Error: `border-color #7B1C2E`, `ring 2px rgba(123,28,46,0.2)`.
- Disabled: `bg #EDE3CE`, 50% opacity.
- **Label**: Raleway 11px 600 uppercase tracking 0.1em, `color #5C3D1E`, 10px bottom margin.
- **Helper text**: Lora 12px, `color #9C8670`.

### Chips & Tags

- **Filter Chip**: `bg transparent`, `text #5C3D1E`, `border 1px #D4B896`, `radius 4px`, 6px 14px padding. Selected: `bg #5C3D1E`, `text #F5EDD6`, `border #5C3D1E`. Hover: `bg rgba(92,61,30,0.05)`.
- **Category Tag**: Raleway 10px 600 uppercase tracking 0.1em. `bg rgba(201,151,58,0.12)`, `text #7A5A1A`, `border 1px rgba(201,151,58,0.4)`, 2px radius.
- **Status Chip**:
  - Còn hàng (In Stock): `bg rgba(58,107,74,0.1)`, `text #3A6B4A`, `border 1px #3A6B4A`
  - Sắp hết (Low Stock): `bg rgba(201,151,58,0.12)`, `text #7A5A1A`, `border 1px #C9973A`
  - Hết hàng (Out of Stock): `bg rgba(123,28,46,0.1)`, `text #7B1C2E`, `border 1px #7B1C2E`
  - Nổi bật (Featured): `bg rgba(201,151,58,0.15)`, `text #5C3A0A`, `border 1px #C9973A`

### Navigation

- **Top Nav**: `bg #3A1A0A` (deep lacquer), `text #F5EDD6`. Logo in Cormorant Garamond 22px. Nav links in Raleway 12px 500 uppercase tracking 0.1em. Active link: gold underline 2px `#C9973A`.
- **Category Sidebar**: `bg #F5EDD6`, `border-right 1px #D4B896`. Category labels as Overline style. Active: `text #7B1C2E`, `bg rgba(123,28,46,0.06)`.

### Dividers

Feudal-style decorative dividers reinforce cultural authenticity.

- **Standard**: 1px `#D4B896` horizontal rule.
- **Gold Accent**: 1px `#C9973A` with 40% opacity — use between hero and first content section.
- **Ornamental**: SVG lotus or trident motif centered between two 1px gold lines — use for major section transitions.

### Lists

- `height 52px`, `padding 0 16px`, `font Lora 16px`, `divider 1px #E8DCC8`. Hover: `bg rgba(245,237,214,0.7)`. Selected: `bg rgba(92,61,30,0.07)`, `border-left 3px #C9973A`.

### Checkboxes

18px, `border 1.5px #C9B99A`, `radius 3px`. Checked: `bg #5C3D1E`, `border #5C3D1E`, cream checkmark. Focus ring: 2px `rgba(201,151,58,0.3)`. Labels: Lora 14px 10px gap.

### Radio Buttons

18px circle, `border 1.5px #C9B99A`. Selected: `border #5C3D1E`, 8px inner dot `#5C3D1E`. Focus ring: 2px `rgba(201,151,58,0.3)`. Labels: Lora 14px 10px gap.

### Tooltips

`bg #3A1A0A`, `text #F5EDD6`, `font Raleway 12px 400`, `padding 8px 14px`, `radius 4px`, shadow Large, 5px arrow. Max width 240px.

### Price Display

- **Regular price**: Cormorant Garamond 22px `#2C1A0E`
- **Sale price**: Cormorant Garamond 22px `#7B1C2E` + strikethrough `#9C8670`
- **Currency symbol**: Raleway 14px 500 aligned top-right of the numeral
- **"Giá tốt" badge**: gold chip `#C9973A`

---

## Imagery Guidelines

- Use **warm-toned, soft natural light photography** — no stark white studio backgrounds.
- Products should rest on **dark rosewood, stone slab, or woven rattan** surfaces.
- Hero sections favor **full-bleed images** with dark lacquer overlay (`rgba(44,26,14,0.45)`) and cream headline text.
- Artisan maker portraits: warm candlelight or daytime window light, never flash.
- Do not use modern minimalist props (concrete, white marble) — lean into natural materials: bamboo, lacquer, terracotta, silk.

---

## Motion & Transitions

- **Default transition**: `220ms ease-in-out` — measured and deliberate, like sliding a shoji screen.
- **Card hover lift**: `transform translateY(-3px)` + shadow Medium, `220ms ease`.
- **Button press**: `transform scale(0.97)`, `150ms ease-in`.
- **Page transitions**: fade `opacity 0→1`, `350ms ease` — no slides or bounces.
- Avoid spring physics and elastic easing — they break the composed, classical atmosphere.

---

## Iconography

- Use **line-weight icons** (1.5–2px stroke), not filled icons — echoes brushstroke calligraphy.
- Icon color: `#5C3D1E` (wood) for functional icons, `#C9973A` (gold) for premium/feature indicators.
- Size: 20px default, 16px compact, 24px prominent.
- Icon set preference: Lucide (closest to clean line style) or custom SVG motifs (lotus, trident, phoenix silhouette) for brand moments.

---

## Do's and Don'ts

1. **Do** use Cormorant Garamond exclusively for headings — the contrast with Lora body text creates a feudal editorial dignity.
2. **Don't** use more than three colors per view — restraint mirrors the measured palette of Vietnamese court aesthetics.
3. **Do** use antique gold `#C9973A` sparingly: borders, price labels, featured badges, ornamental dividers only.
4. **Don't** use burgundy red `#7B1C2E` for decorative purposes — reserve it for interactive sale/promo CTAs and error states.
5. **Do** include provenance notes ("Gỗ cẩm lai, thủ công Đồng Kỵ") on every product card — origin story is core to trust.
6. **Don't** use shadows heavier than Large — overweight shadows contradict the airy, lacquered-surface aesthetic.
7. **Do** use uppercase Raleway overlines for all category and navigation labels — spacing and formality evoke official court designations.
8. **Don't** round corners beyond 8px — the system demands angular precision inspired by carved timber joinery.
9. **Do** keep product grids at 2–3 columns on desktop — density signals mass market, whitespace signals prestige.
10. **Don't** use countdown timers or aggressive urgency tactics — Vietnamese artisan buyers value authenticity and patience over pressure.
11. **Do** surface the maker's story — seller name, home province, technique — alongside every product.
12. **Don't** use cold gray neutrals anywhere — every neutral must carry warmth (ash `#C9B99A`, parchment `#FDF6E3`).
