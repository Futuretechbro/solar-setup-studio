<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Landing page sections live in `src/components/landing/*` and are composed in `src/routes/index.tsx`; in-page nav uses `<Link to="/" hash="...">` with matching section ids. Why: one scrolling landing page the user asked for.
- Solar sizing math lives only in `src/lib/solar.ts` (pure functions). Why: the web calculator and future WhatsApp bot must share one sizing rule.
- Quote and invoice makers share `src/components/tools/DocumentMaker.tsx` (`kind` prop), client-side only, printed via `window.print()` with `.no-print` / `.print-area` styles. Why: no backend needed for free tools.
- Brand/WhatsApp number and naira formatting come from `src/lib/site.ts`. Why: single place to swap the bot number.
- UI packages used by components are listed in `vite.config.ts` `vite.optimizeDeps.include`. Why: mid-session dependency re-optimization loads two React copies and blanks the preview.
