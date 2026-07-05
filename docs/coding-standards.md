# Coding Standards

Use strict TypeScript, avoid `any`, prefer readonly contracts, and keep business logic outside UI components.

## Architectural Rules

- Prefer barrel exports from each folder boundary.
- Avoid duplicate constants, enums, roles, permissions, and helper functions.
- Keep reusable validation limited to schema primitives.
- Keep deep imports out of feature and shared layers where a barrel exists.
