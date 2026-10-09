import { dark } from "@clerk/themes";

// sign in component styling

export const signInAppearance = {
  variables: {
    colorPrimary: "#6366f1", // Indigo accent
    colorText: "inherit",
    borderRadius: "1rem",
  },
  elements: {
    /* Main Card - Seamless glass floating effect */
    card: `
      w-full max-w-md backdrop-blur-2xl bg-white/70 dark:bg-slate-900/60
      border border-slate-200/60 dark:border-white/10
      shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]
      rounded-3xl p-8 transition-all duration-300
    `,
    rootBox: "w-full flex justify-center",

    /* Header typography */
    headerTitle: `
      text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white
      bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 
      dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent
    `,
    headerSubtitle: "text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-normal",

    /* Social login buttons - Subtle pill design */
    socialButtonsBlockButton: `
      h-11 rounded-2xl border border-slate-200/80 dark:border-slate-800
      bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800
      text-slate-700 dark:text-slate-200 font-medium transition-all duration-200
      hover:shadow-sm active:scale-[0.98]
    `,
    socialButtonsBlockButtonText: "font-medium text-sm",

    /* Divider */
    dividerLine: "bg-slate-200/80 dark:bg-slate-800",
    dividerText: "text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3",

    /* Form fields */
    formFieldLabel: "text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5",
    formFieldInput: `
      h-11 rounded-xl border border-slate-200 dark:border-slate-800/80
      bg-white dark:bg-slate-950/50 px-4 text-slate-900 dark:text-slate-100 text-sm
      transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600
      focus:border-indigo-500 dark:focus:border-indigo-400
      focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-400/10
    `,
    formFieldAction: "text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors",

    /* Primary submit button - Glowing gradient CTA */
    formButtonPrimary: `
      h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600
      hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-sm
      shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30
      transition-all duration-200 active:scale-[0.98]
    `,

    /* Footer & links */
    footerActionText: "text-xs text-slate-500 dark:text-slate-400",
    footerActionLink: "text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors ml-1",
    footer: "bg-transparent",

    /* Error state */
    formFieldErrorText: "text-xs text-rose-500 mt-1 font-medium",

    /* Identity badge */
    identityPreview: "rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 p-2.5",
    identityPreviewText: "text-sm text-slate-700 dark:text-slate-200 font-medium",
    identityPreviewEditButton: "text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400",
  },
};



export const pricingAppearance = {
  variables: {
    colorPrimary: "#f59e0b",
    borderRadius: "1rem",
  },

  elements: {
    // =========================
    // CARD
    // =========================

    pricingTableCard:
      "rounded-3xl " +

      // Light
      "border border-slate-200/80 " +
      "bg-white/80 " +
      "shadow-lg shadow-slate-900/10 " +

      // Dark
      "dark:border-slate-800/80 " +
      "dark:bg-slate-900/70 " +
      "dark:shadow-black/30 " +

      // Common
      "backdrop-blur-xl " +
      "transition-all duration-300 " +
      "hover:-translate-y-1 " +
      "hover:shadow-xl " +
      "dark:hover:border-amber-500/30 " +
      "dark:hover:shadow-amber-500/5",

    // =========================
    // CARD HEADER
    // =========================

    pricingTableCardHeader:
      "border-b border-slate-100 " +
      "dark:border-slate-800",

    // =========================
    // TITLE
    // =========================

    pricingTableCardTitle:
      "text-xl font-bold " +
      "text-slate-900 " +
      "dark:text-white",

    // =========================
    // DESCRIPTION
    // =========================

    pricingTableCardDescription:
      "mt-2 text-sm leading-6 " +
      "text-slate-500 " +
      "dark:text-slate-400",

    // =========================
    // PRICE
    // =========================

    pricingTableCardPrice:
      "text-4xl font-extrabold tracking-tight " +
      "text-slate-900 " +
      "dark:text-white",

    pricingTableCardPriceSuffix:
      "text-sm font-medium " +
      "text-slate-500 " +
      "dark:text-slate-400",

    // =========================
    // FEATURES
    // =========================

    pricingTableCardFeature:
      "text-sm " +
      "text-slate-600 " +
      "dark:text-slate-300",

    pricingTableCardFeatureIcon:
      "text-amber-500 " +
      "dark:text-amber-400",

    // =========================
    // BUTTON
    // =========================

    pricingTableCardButton:
      "rounded-xl " +

      // Light
      "bg-amber-500 " +
      "text-white " +
      "shadow-md shadow-amber-500/20 " +
      "hover:bg-amber-600 " +

      // Dark
      "dark:bg-amber-500 " +
      "dark:text-white " +
      "dark:hover:bg-amber-400 " +
      "dark:hover:text-slate-950 " +

      // Common
      "font-semibold " +
      "transition-all duration-200 " +
      "hover:shadow-lg " +
      "dark:hover:shadow-amber-500/20",

    // =========================
    // BADGE
    // =========================

    pricingTableCardBadge:
      "rounded-full " +

      // Light
      "bg-amber-100 " +
      "text-amber-700 " +

      // Dark
      "dark:bg-amber-500/10 " +
      "dark:text-amber-300 " +

      // Common
      "px-3 py-1 text-xs font-bold",
  },
};

export const getUserButtonAppearance = (mode: "light" | "dark") => ({
  baseTheme: mode === "dark" ? dark : undefined,

  variables: {
    colorPrimary: "#6366f1",
    colorText: mode === "dark" ? "#f1f5f9" : "#0f172a",
    colorTextSecondary: mode === "dark" ? "#94a3b8" : "#64748b",
    colorBackground: mode === "dark" ? "#020617" : "#ffffff",
    borderRadius: "1rem",
  },

  elements: {
    userButtonTrigger:
      "rounded-full transition-all duration-200 hover:ring-4 hover:ring-indigo-500/10",

    userButtonAvatarBox:
      "h-10 w-10 rounded-full ring-1 ring-slate-200 dark:ring-slate-700",

    userButtonPopoverCard:
      mode === "dark"
        ? "bg-slate-900 border border-slate-800 rounded-2xl shadow-xl"
        : "bg-white border border-slate-200 rounded-2xl shadow-xl",

    userButtonPopoverMain:
      mode === "dark" ? "bg-slate-900" : "bg-white",

    userButtonPopoverActions:
      mode === "dark"
        ? "bg-slate-900 p-2"
        : "bg-white p-2",

    userButtonPopoverActionButton:
      mode === "dark"
        ? "rounded-xl text-slate-200 hover:bg-slate-800 transition-colors"
        : "rounded-xl text-slate-700 hover:bg-slate-100 transition-colors",

    userButtonPopoverActionButtonText:
      mode === "dark"
        ? "text-sm font-medium text-slate-200"
        : "text-sm font-medium text-slate-700",

    userButtonPopoverActionButtonIcon:
      mode === "dark" ? "text-slate-400" : "text-slate-500",

    userPreviewMainIdentifier:
      mode === "dark"
        ? "text-sm font-semibold text-white"
        : "text-sm font-semibold text-slate-900",

    userPreviewSecondaryIdentifier:
      mode === "dark"
        ? "text-xs text-slate-400"
        : "text-xs text-slate-500",

    userButtonPopoverFooter:
      mode === "dark"
        ? "bg-slate-900 border-t border-slate-800"
        : "bg-white border-t border-slate-200",
  },
});


export const getUserProfileAppearance = (mode: "light" | "dark") => ({
  baseTheme: mode === "dark" ? dark : undefined,

  variables: {
    colorPrimary: "#6366f1",
    colorText: mode === "dark" ? "#f1f5f9" : "#0f172a",
    colorTextSecondary: mode === "dark" ? "#94a3b8" : "#64748b",
    colorBackground: mode === "dark" ? "#0f172a" : "#ffffff",
    borderRadius: "1rem",
  },

  elements: {
    // Main profile layout
    rootBox: "w-full",
    card: [
      "w-full overflow-hidden rounded-3xl",
      "backdrop-blur-2xl",
      "border border-slate-200/60 dark:border-white/10",
      "shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
      "dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
      mode === "dark" ? "bg-slate-900/90" : "bg-white/90",
    ].join(" "),

    // Sidebar
    navbar: [
      "border-r border-slate-200/80 dark:border-slate-800",
      mode === "dark" ? "bg-slate-950/50" : "bg-slate-50/70",
    ].join(" "),

    navbarButton:
      "rounded-xl text-sm font-medium transition-all duration-200 " +
      "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 " +
      "dark:text-slate-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300",

    navbarButton__active:
      "bg-indigo-50 text-indigo-700 font-semibold " +
      "dark:bg-indigo-500/15 dark:text-indigo-300",

    // Main content
    pageScrollBox:
      mode === "dark" ? "bg-slate-900" : "bg-white",

    page: "gap-6",

    profileSection:
      "border-b border-slate-200/80 dark:border-slate-800",

    profileSectionTitle:
      "text-lg font-bold text-slate-900 dark:text-white",

    profileSectionSubtitle:
      "text-sm text-slate-500 dark:text-slate-400",

    // Headings and text
    headerTitle:
      "text-2xl font-extrabold tracking-tight " +
      "text-slate-900 dark:text-white",

    headerSubtitle:
      "text-sm text-slate-500 dark:text-slate-400",

    formFieldLabel:
      "text-xs font-semibold uppercase tracking-wider " +
      "text-slate-600 dark:text-slate-400",

    formFieldInput:
      "rounded-xl border border-slate-200 bg-white text-slate-900 " +
      "placeholder:text-slate-400 focus:border-indigo-500 " +
      "focus:ring-4 focus:ring-indigo-500/10 " +
      "dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100 " +
      "dark:placeholder:text-slate-500 dark:focus:border-indigo-400",

    // Buttons
    formButtonPrimary:
      "rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 " +
      "font-semibold text-white shadow-md shadow-indigo-500/20 " +
      "transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 " +
      "hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]",

    // Dividers and footer
    dividerLine:
      "bg-slate-200 dark:bg-slate-800",

    footer:
      "bg-transparent",
  },
});
