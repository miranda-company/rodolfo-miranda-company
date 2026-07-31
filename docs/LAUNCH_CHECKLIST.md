# Launch checklist

Complete these editorial and infrastructure tasks before enabling indexing or
connecting the production domain.

## Editorial

- [ ] Obtain Rodolfo's approval for the summaries, commentary, and article copy
      of the three production Mediateca anchors: `modulor`, `cosas`, and `orden`.
- [ ] Replace approved copy in the content files and remove provisional-copy
      notices from the public reference experience.
- [ ] Approve or replace every placeholder external URL before its associated
      reference is published.

## Routing and hosting

- [ ] Configure hosting-level permanent redirects from `/biblioteca` to
      `/mediateca` and from `/biblioteca/*` to `/mediateca/*`, then verify direct
      paths and fragments in the deployed environment.
