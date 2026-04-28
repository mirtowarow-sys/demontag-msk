#!/usr/bin/env sh

# Husky v9 hook runner.
# Keeps hooks working across shells by ensuring PATH includes node_modules/.bin.

if [ -z "$HUSKY" ]; then
  HUSKY=1
fi

if [ "$HUSKY" = "0" ]; then
  exit 0
fi

if [ -n "$GIT_DIR" ]; then
  PATH="$PWD/node_modules/.bin:$PATH"
else
  PATH="$(dirname -- "$0")/../../node_modules/.bin:$PATH"
fi

export PATH