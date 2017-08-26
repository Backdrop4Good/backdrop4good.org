/* eslint-env node */
'use strict';

var options = {
  // path to your theme file
  theme_path: 'web/themes/bfg',
  // Patterns for PHP files to lint and check.
  phpCheck: ['web/{modules,themes}/custom/**/*.{php,inc,module,theme,inc,install}'],
  // Patterns for JS files to lint and check.
  jsCheck: [
    'gulpfile.js',
    'gulpconfig.js',
    'web/{modules,themes}/custom/**/*.js',
    '!web/{modules,themes}/custom/**/bower_components/**',
    '!web/{modules,themes}/custom/**/node_modules/**',
    '!web/{modules,themes}/custom/**/dist/**'
  ],
  sass_rules: {
    // Settings for sass-lint rules are stored here.
    // If you're ever confused about what the linter means when it complains about something,
    // the documentation for their rules can be found here: https://github.com/sasstools/sass-lint/tree/master/docs/rules
    //
    // sass-lint doesn't like ids, but I still use them.
    // For their reasoning, see https://github.com/CSSLint/csslint/wiki/disallow-ids-in-selectors
    'no-ids': 0,
    // Sometimes, we just have to use a color once.
    // Having to define it as a variable first is redundant.
    'no-color-literals': 0,
    'no-color-hex': 0,
    'no-color-keywords': 1,
    // I like the concentric sort order, personally, though it might take some getting used to.
    'property-sort-order': [1, {order: 'concentric'}],
    // I'm disabling this one for now, but open to discussion.
    'nesting-depth': 0,
    // These rules seem like they force you to write awkward looking sass to get the specificity we sometimes need.
    // Maybe they'd be nice in a world with perfect succinct markup 100% of the time...
    'force-element-nesting': 0,
    'force-pseudo-nesting': 0,
    'no-qualifying-elements': 0,
    // This feels needlessly nitpicky
    'leading-zero': 0,
    // Maybe it's just me, but 3-value shorthands just look... unnatural.
    // Can be used, but shouldn't be enforced.  1 and 2 are fine to enforce, though.
    'shorthand-values': [1, {'allowed-shorthands': [1, 2]}],
    // Drupal coding convention says to not have an empty line between blocks,
    // unless the second block is preceeded by a comment.
    // For our purposes, I'm just going to remove this rule entirely.
    'empty-line-between-blocks': 0,
    // Drupal coding convention says not to use quotes unless they are required, so no enforcing url quotes.
    'url-quotes': 0,
    // Drupal coding convention says that when using quotes, use double quotation marks, not single
    'quotes': [1, {'style': 'double'}],
    // Class names are declared in the markup, not the css.
    // I agree it's good to have conventions, but not very useful to enforce them here.
    'class-name-format': 0,
    // Yes, important is terrible and should be avoided.  Unfortunately, sometimes we are forced to use it.
    // The same goes for attribute selectors.
    'no-important': 0,
    'no-attribute-selectors': 0
  }
};

module.exports = options;
