# Task: Create PRD.md and PLAN.md for a Premium Multi-Template Cafe Website Experience

Act as a senior product architect, world-class frontend engineer, UI/UX designer, and creative developer specializing in award-winning websites and premium interactive experiences.

I want to build a premium, frontend-only cafe website showcase using React. This product will eventually be sold to multiple cafes as customizable website templates.

**IMPORTANT: For this task, ONLY analyze, plan, and create two documentation files: `PRD.md` and `PLAN.md`. Do not write application code, install packages, create components, or start implementation.**

First inspect the existing repository, if any, to understand its current structure and constraints. Do not modify existing application files.

---

# 1. Product Vision

Build a premium cafe website showcase application containing three completely different, professionally designed cafe website templates.

When someone visits the main application, the first screen should let them choose which cafe website design they want to explore.

The three templates are:

1. Luxury Cinematic
2. Modern Minimal
3. Creative & Colorful

This is not a website with three color themes. Each template must have its own visual identity, layout, typography, interactions, animation language, and overall user experience.

The goal is to create a product impressive enough that when I pitch it to cafe owners, they immediately understand the value and want to purchase a customized website.

Think of award-winning Awwwards-level website experiences, but prioritize usability, accessibility, responsiveness, and performance.

# 2. Application Entry Screen – Template Selection

This is the first and most important screen.

When a visitor opens the application, show a visually impressive template-selection experience.

Display three large, attractive template preview cards:

### A. Luxury Cinematic
- Premium dark aesthetic.
- Black, deep brown, gold and warm accent colors.
- Cinematic food photography.
- Elegant serif typography.
- Dramatic transitions.
- Premium restaurant atmosphere.

### B. Modern Minimal
- Cream, white, beige and brown palette.
- Minimalist layouts.
- Elegant typography.
- Spacious composition.
- Editorial food photography.
- Smooth, subtle interactions.

### C. Creative & Colorful
- Vibrant colors and playful layouts.
- Expressive typography.
- Creative food photography.
- Dynamic transitions.
- Playful but sophisticated interactions.

Each card should include:
- Large website preview image.
- Template name.
- Short description.
- Animated hover interaction.
- Preview Website button.
- Clear visual differentiation.

The selection screen itself must be beautifully designed and responsive.

When a visitor selects a template, transition smoothly into its complete cafe website.

Provide a persistent, easily accessible option to return to template selection and switch between templates.

Template selection must work on both desktop and mobile.

# 3. Complete Website Experience

Each template should include the following sections.

### 1. Hero Section
- Full-screen or near-full-screen visual experience.
- Beautiful food or cafe imagery/video.
- Animated typography.
- Smooth entrance animations.
- Strong headline and description.
- Explore Menu CTA.
- Optional WhatsApp Order CTA.

### 2. Signature Dishes
- Large and visually impressive dish showcases.
- High-quality food imagery.
- Attractive typography.
- Animated image reveals.
- Dish names and descriptions.
- Highlight signature products.

### 3. Food Categories
Create categories such as:
- Burgers
- Pizza
- Pasta
- Desserts
- Coffee
- Shakes
- Beverages
- Signature Specials

Category navigation must be interactive, smooth, and touch-friendly.

### 4. Interactive Food Menu
Each food item should have:
- Food image.
- Name.
- Description.
- Price.
- Category.
- Optional vegetarian/non-vegetarian indicator.
- Optional bestseller badge.

Interactions:
- Image hover animations.
- Card entrance animations.
- Smooth category filtering.
- Attractive product detail presentation.
- Mobile-friendly swipe or touch interactions.

### 5. Interactive 3D Food Showcase

This should be a special differentiating feature.

Use Three.js through React Three Fiber and Drei where appropriate.

Explore:
- Rotatable 3D food models.
- Floating signature dishes.
- Ingredient labels.
- Interactive product presentations.
- Smooth camera movements.
- Scroll-triggered 3D animations.

Important:
- Do not make 3D mandatory for every dish.
- Use high-quality 3D models selectively for signature dishes.
- Plan fallback images if 3D assets are unavailable.
- Consider mobile performance and loading times.
- Avoid fake 3D interactions that do not provide genuine value.

### 6. Bestsellers
- Visually highlight popular dishes.
- Attractive product cards.
- Animated image reveals.
- Special labels and descriptions.

### 7. Our Story
- Cafe introduction.
- Brand storytelling.
- Chef or founder introduction.
- Ingredient and preparation highlights.
- Scroll-based animations.

### 8. Gallery
- Cafe interior.
- Food photography.
- Drinks and desserts.
- Kitchen and preparation.
- Responsive image gallery.
- Smooth image transitions.

### 9. Customer Reviews
- Use predefined sample testimonials.
- No backend or API fetching.
- Attractive review cards.
- Star ratings.
- Smooth carousel or slider interactions.
- Consistent visual styling.

### 10. Location and Contact
- Cafe address.
- Opening hours.
- Google Maps integration or map link.
- WhatsApp contact.
- Phone number.
- Instagram and social links.

### 11. Footer
- Cafe branding.
- Navigation links.
- Social media links.
- Contact information.
- Attractive closing visual.

IMPORTANT: Do not include a table reservation section or reservation functionality anywhere in the application.

# 4. Reusable Product Architecture

This product will eventually be customized and sold to multiple cafes.

Plan the architecture accordingly.

I want a configuration-driven structure where cafe information can be changed without rebuilding every section from scratch.

Plan a centralized configuration system for:

- Cafe name.
- Logo.
- Brand colors.
- Typography.
- Hero content.
- Hero images/videos.
- Menu categories.
- Dish names.
- Dish prices.
- Dish descriptions.
- Dish images.
- 3D model paths.
- Bestseller products.
- Customer testimonials.
- Gallery images.
- Address.
- Opening hours.
- Contact details.
- Social links.

The three templates should share reusable content/data structures where appropriate, but each must have independent visual design and components.

Plan the codebase so that a new cafe can be configured with minimal changes.

Do not build an admin dashboard or backend in this phase.

# 5. Technology Stack

Use React with JavaScript.

Preferred technologies:

- React
- Vite
- JavaScript
- Tailwind CSS
- GSAP for advanced animations and scroll-triggered effects.
- Motion (Framer Motion) for component and page transitions.
- Three.js for 3D experiences.
- React Three Fiber.
- Drei.
- Lenis for smooth scrolling where appropriate.
- Swiper.js for touch-friendly carousels.
- Lucide React for icons.

Evaluate the best combination rather than blindly using every library.

Avoid unnecessary dependencies and animation conflicts.

Do not use TypeScript unless there is a compelling reason; JavaScript is the required choice.

# 6. Animation and Interaction Strategy

Animation quality is a major product requirement.

Plan a coherent animation system with:

- Initial page-loading transitions.
- Hero text reveal animations.
- Image clipping and reveal effects.
- Staggered card entrance animations.
- Scroll-triggered section reveals.
- Parallax effects where appropriate.
- Smooth template switching.
- Interactive category transitions.
- Food image hover effects.
- 3D model interactions.
- Gallery transitions.
- Button hover and click feedback.
- Navigation transitions.
- Smooth scrolling.

Each of the three templates should have its own animation personality.

Luxury Cinematic:
Slow, elegant, cinematic, dramatic transitions.

Modern Minimal:
Subtle, smooth, refined, lightweight transitions.

Creative & Colorful:
Expressive, playful, dynamic, energetic transitions.

Important:
Animations should enhance the experience, not make the website slow or difficult to navigate.

Respect prefers-reduced-motion settings.

Avoid excessive animations, unnecessary scroll hijacking, and effects that interfere with mobile scrolling.

# 7. Mobile-First Responsive Design

Mobile users are the primary audience.

Plan mobile-first development rather than treating mobile as a secondary responsive adjustment.

Consider:
- Mobile navigation.
- Touch-friendly buttons.
- Swipeable menu categories.
- Responsive food cards.
- Mobile image proportions.
- Optimized typography.
- Lightweight transitions.
- 3D fallback on low-powered devices.
- No horizontal overflow.
- Fast initial loading.
- Proper spacing and readable content.

The website must look premium on:
- Mobile phones.
- Tablets.
- Laptops.
- Large desktop screens.

# 8. Frontend-Only Requirements

This is a frontend-only application.

No backend.
No database.
No authentication.
No admin panel.
No server APIs.

Use local/static data and assets.

External integrations should be limited to frontend-friendly links such as:
- WhatsApp.
- Google Maps.
- Instagram.
- Phone calls.

The application should be deployable on Render as a Static Site.

Plan:
- Vite production build.
- Render static-site deployment.
- Build command: npm run build.
- Publish directory: dist.
- SPA rewrite rule for React Router routes if needed.

# 9. Performance, Accessibility and Quality

Plan for:
- Lazy loading images.
- Responsive image sizes.
- Modern image formats where possible.
- Lazy loading of 3D assets.
- Code splitting.
- Reduced initial JavaScript bundle.
- Efficient animation cleanup.
- Mobile GPU considerations.
- SEO-friendly metadata.
- Semantic HTML.
- Keyboard accessibility.
- Color contrast.
- Accessible navigation.
- Loading and fallback states.
- Error handling for missing assets.

The final application should be visually impressive without sacrificing usability or performance.

# 10. Deliverables – Documentation Only

Create exactly these two files in the repository root:

## PRD.md

Write a comprehensive Product Requirements Document containing:

1. Product overview.
2. Product vision.
3. Problem statement.
4. Target audience.
5. Business objectives.
6. Core user journeys.
7. Template selection experience.
8. Detailed requirements for all three templates.
9. Complete website section requirements.
10. Food menu and category behavior.
11. 3D food showcase requirements.
12. Customer review requirements.
13. Responsive and mobile-first requirements.
14. Animation requirements.
15. Reusable configuration architecture requirements.
16. Functional requirements.
17. Non-functional requirements.
18. Performance requirements.
19. Accessibility requirements.
20. SEO requirements.
21. Render deployment requirements.
22. Out-of-scope features.
23. Acceptance criteria.

Be specific and measurable wherever possible.

## PLAN.md

Write a detailed implementation roadmap containing:

1. Recommended project architecture.
2. Suggested folder structure.
3. Technology and library decisions with reasoning.
4. Reusable component strategy.
5. Template separation strategy.
6. Configuration and static data structure.
7. Animation architecture.
8. 3D asset architecture.
9. Responsive development strategy.
10. Performance optimization strategy.
11. SEO and accessibility implementation.
12. Testing strategy.
13. Render deployment procedure.
14. Implementation phases.
15. Dependencies between phases.
16. Definition of done for each phase.
17. Potential technical risks and mitigation.

Break implementation into clear phases:

Phase 1: Project setup and design foundation.

Phase 2: Template selection landing page.

Phase 3: Luxury Cinematic template.

Phase 4: Modern Minimal template.

Phase 5: Creative & Colorful template.

Phase 6: Interactive food menu and category system.

Phase 7: 3D food showcase.

Phase 8: Advanced animations and transitions.

Phase 9: Mobile responsiveness and performance.

Phase 10: Testing, optimization and Render deployment.

For every phase, explain what to build, the expected result, dependencies, and completion criteria.

# 11. Final Instructions

Before creating the documents:
- Inspect the existing repository.
- Identify any existing setup or constraints.
- Do not overwrite existing application files.
- Keep the PRD and PLAN consistent with each other.
- Make practical technical decisions.
- Avoid vague statements such as "make it beautiful" without explaining the intended implementation.
- Do not introduce backend functionality.
- Do not introduce table reservations.
- Do not start coding.

After creating both files, provide:
1. Confirmation that PRD.md and PLAN.md were created.
2. A short summary of the product architecture.
3. A short summary of the implementation phases.
4. Any important assumptions or decisions that need my approval.

**STOP after creating PRD.md and PLAN.md. Wait for my approval before implementing anything.**