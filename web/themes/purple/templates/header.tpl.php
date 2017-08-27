<?php
/**
 * @file
 * Display site header block.
 *
 * Available variables:
 *
 * - $base_path: The base URL path of the Backdrop installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $front_page: The URL of the front page. Use this instead of $base_path, when
 *   linking to the front page. This includes the language domain or prefix.
 * - $site_name: The name of the site, empty when display has been disabled.
 * - $site_slogan: The site slogan, empty when display has been disabled.
 * - $menu: The menu for the header (if any), as an HTML string.
 */
?>
  <div class="header-box header-right">
    <a href="/blog"><img width="100" src="<?php print $path; ?>blog.png" title="Read the Blog" /></a>
  </div>
  <div class="header-box header-left">
    <a href="http://www.linkedin.com"><img width="64" src="<?php print $path; ?>linkedin.png" title="Find me on LinkedIn" /></a>
    <a href="http://twitter.com/"><img width="64" src="<?php print $path; ?>twitter.png" title="Follow me on Twitter" /></a>
  </div>

  <?php if ($site_name): ?>
    <?php if (!$is_front): ?>
      <div class="site-name"><strong>
        <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>" rel="home"><span><?php print $site_name; ?></span></a>
      </strong></div>
    <?php else: /* Use h1 when the content title is empty */ ?>
      <h1 class="site-name">
        <a href="<?php print $front_page; ?>" title="<?php print $site_name; ?>" rel="home"><span><?php print $site_name; ?></span></a>
      </h1>
    <?php endif; ?>
  <?php endif; ?>

  <div class="location">
    <div class="email">mail@example.com</div>
    <?php if ($site_slogan): ?>
      <div class="site-slogan"><?php print $site_slogan; ?></div>
    <?php endif; ?>
  </div>
