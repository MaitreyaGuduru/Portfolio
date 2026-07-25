# Project screenshots

Drop a project's screenshot here named after its `slug`, e.g.:

    public/projects/personal-finance-ai.png
    public/projects/orbitlab.png
    public/projects/merchant-tracker.png
    public/projects/indoor-navigation.png

Then, in `src/lib/data.ts`, set the matching project's `image` field:

    image: withBasePath("/projects/orbitlab.png"),

The screenshot then replaces the generated placeholder art on both the
card and the detail modal. If the file is missing or fails to load, it
quietly falls back to the generated art — so nothing ever looks broken.

Recommended size: ~1200×750 (roughly 16:10), PNG or JPG.
