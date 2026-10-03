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