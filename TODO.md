# Toast Debug & Fix

**Issue:** Toast not showing on confirm order.

**Current Structure:**
- Toast.tsx expects `props` (message, type)
- layout.tsx: `<Toast />` - no props, so no render
- OrderContext: toast state, but Toast not using it

**Quick Fix Plan:**
- Make Toast read toast from context (self-contained)
- Or pass props properly
- Test toast visible

**Next:** Fix Toast to always show when toast state active

