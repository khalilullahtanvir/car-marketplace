# RLS Plan

## Security Principles

- Enable RLS on every application table
- Deny by default
- Use explicit policies for read/write access
- Separate public marketplace reads from private owner and admin writes
- Treat audit and moderation tables as highly restricted

## Public Read Access

- Public users may read published, non-deleted `cars`
- Public users may read `brands`, `car_models`, and approved `locations`
- Public users may read public dealer profiles and approved reviews
- Public users should not read private profile details, internal logs, or raw operational metadata

## Authenticated User Access

- A user may read and update their own `profiles` row
- A user may manage their own `favorites`, `wishlists`, `compare_lists`, `saved_searches`, `inquiries`, `notifications`, and personal `ai_requests`
- A user may create `reports`
- A user may read `cars` based on public visibility and ownership context

## Dealer Access

- Dealer owners and members may manage dealer-owned listings
- Dealer-specific access should be derived from `dealer_members`
- Dealers should only see inquiries and AI requests relevant to their own records

## Admin and Moderator Access

- Admins may read and write moderation queues, reports, dealer status, and audit logs
- Moderators may review `reports`, `reviews`, and `cars` in moderation states
- `admin_logs` should be append-only

## Policy Pattern

- `SELECT`: allow if resource is public or owned or role-authorized
- `INSERT`: allow if authenticated and ownership rules are satisfied
- `UPDATE`: allow if record ownership or staff role is verified
- `DELETE`: prefer soft-delete for user-facing content; reserve hard delete for admin cleanup and cascading child records

## Important Table Notes

- `profiles` should allow self-read and self-update only
- `dealer_members` should require role-aware membership checks
- `cars` should allow owner/dealer staff updates only
- `notifications` should be visible only to the target profile
- `admin_logs` should be read-only for non-admins

