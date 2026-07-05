# Architecture

Core application architecture is organized around feature-based boundaries, shared contracts, and strict layering between UI, configuration, validation, and infrastructure.

## Current Source of Truth

- `config/` contains environment/runtime application configuration only.
- `constants/` contains routes, roles, permissions, enums, limits, defaults, labels, and statuses.
- `lib/errors/` contains the canonical error hierarchy.
- `types/` contains shared domain, API, repository, and UI contracts.
- `validators/` contains reusable schema primitives only.
