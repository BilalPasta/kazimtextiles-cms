/** Line icons for the Quote Finder industry buttons (24px grid, currentColor stroke). */
const paths: Record<string, string> = {
  bed: 'M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 14h18M3 18v2M21 18v2M7 9V6h4v3',
  utensils: 'M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 3c-1.7 1-3 3.2-3 6v3h3v9',
  cross: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  spray: 'M8 9h6v12H8zM9 9V6h4v3M13 6h3l2-2M16 8h2M16 4h2',
  washer: 'M5 3h14v18H5zM5 7h14M8 5h.01M12 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  glass: 'M7 3h10l-1 7a4 4 0 0 1-8 0zM12 14v7M8 21h8',
  home: 'M3 11l9-7 9 7M5 10v10h14V10M10 20v-6h4v6',
  cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
}

export function IndustryIcon({ name, size = 24 }: { name?: string | null; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name ?? 'box'] ?? paths.box} />
    </svg>
  )
}
