import type { Access } from 'payload'

export const anyone: Access = () => true
export const authenticated: Access = ({ req }) => Boolean(req.user)

/** Logged-in editors see drafts; the public only sees published documents. */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
