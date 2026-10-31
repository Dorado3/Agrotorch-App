# AgroTorch AgriOS — Platform foundation

## Product principle

AgroTorch is one agricultural operating system with connected modules, not a collection of disconnected apps. Farm identity, crop-cycle identity, permissions and evidence records must be reusable across CDRE, Digital Agronomist, ProfitLens, Marketplace, Finance, Energy, Enterprise and Impact.

## Core tenancy model

- **User:** an authenticated human identity.
- **Organisation:** a farm business, cooperative, agribusiness, NGO, government body, research institution, development programme or service provider.
- **Membership:** a user's role and status inside an organisation, optionally scoped to assigned farms.
- **Farm:** an operational unit owned by a user or associated with an organisation.
- **Farm block:** a mapped or named production unit within a farm.
- **Crop cycle:** one crop/variety production cycle on a farm or block, with its own dates and lifecycle.
- **Operational evidence:** observations, activities, inputs, tasks, harvests, sales, expenses, media and outcomes linked to the appropriate farm and, where applicable, block and crop cycle.

## Roles

The initial shared role vocabulary is owner, organisation_admin, farm_manager, supervisor, agronomist, field_agent, finance_officer and viewer. Roles are not permissions by themselves: every operation must also check organisation membership status, farm assignment/scope and the requested action.

## Data and security rules

1. Firebase Authentication identifies the user; client-side role checks are never the security boundary.
2. Firestore rules or trusted server functions must enforce tenant isolation and role-based access.
3. Organisation membership must be active before organisation access is granted.
4. A farm's organisation association must not grant access to every organisation member automatically; farm scope matters.
5. Privileged roles must never be self-assigned during public registration.
6. Cross-organisation access must be denied by default.
7. Evidence records should retain creator, timestamps, source and relevant farm/block/crop-cycle IDs.
8. Avoid placing unbounded event histories or large media arrays inside a farm document. Use dedicated collections for high-volume records.
9. Existing owner-based farm records must continue to load during migration.
10. Do not deploy revised Firestore rules until emulator tests and a controlled test-account migration pass.

## Migration approach

- Phase A: add versioned domain contracts and normalize legacy farm objects in memory.
- Phase B: introduce organisation creation and invitations with server-enforced membership.
- Phase C: add farm/block/crop-cycle collections and migrate records in batches while retaining stable IDs.
- Phase D: add role-aware UI and enforce identical policies in Firestore rules.
- Phase E: connect CDRE and reporting to the shared IDs rather than maintaining duplicate records.

## Release gates

- Unit tests for schema validation and permission decisions.
- Firestore emulator tests for owner, organisation admin, manager, supervisor, viewer, suspended member and cross-tenant access.
- Backward-compatibility tests for existing farm and operational records.
- Multi-account integration tests before production deployment.
