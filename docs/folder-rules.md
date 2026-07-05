# Folder Rules

Feature logic belongs in `features/`, shared primitives in `components/`, and infrastructure in `lib/`.

## Clean Boundaries

- `config/` is runtime/configuration only.
- `constants/` is the single source of truth for static application-wide values.
- `lib/errors/` owns the error hierarchy.
- `lib/actions/` owns server-action result helpers.
