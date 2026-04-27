# Static-host the Reveal.js decks behind nginx.
# Used by Coolify (and any other PaaS that builds a Dockerfile).
FROM nginx:1.27-alpine

# Drop nginx's default welcome page so our index takes over.
RUN rm -f /usr/share/nginx/html/index.html /usr/share/nginx/html/50x.html

WORKDIR /usr/share/nginx/html

# Order matters: copy the brand assets first so the relative symlinks
# (template/brand -> ../cursor-brand-assets,
#  examples/cursor-nexo-security/brand -> ../../cursor-brand-assets)
# resolve to a real path inside the container.
COPY cursor-brand-assets ./cursor-brand-assets
COPY template            ./template
COPY examples            ./examples
COPY index.html          ./index.html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
