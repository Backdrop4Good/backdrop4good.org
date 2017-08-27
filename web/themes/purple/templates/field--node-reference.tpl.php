<?php
/**
 * @file field--node-reference.tpl.php
 *
 * @see template_preprocess_field()
 * @see theme_field()
 *
 * @ingroup themeable
 */
?>
<div class="<?php print implode(' ', $classes); ?>"<?php print backdrop_attributes($attributes); ?>>
  <?php if (!$label_hidden): ?>
    <div class="field-label"><?php print $label ?>:&nbsp;</div>
  <?php endif; ?>
  <ul class="field-items"<?php print backdrop_attributes($content_attributes); ?>>
    <?php foreach ($items as $delta => $item): ?>
      <li class="field-item"<?php print backdrop_attributes($item_attributes[$delta]); ?>><?php print render($item); ?></li>
    <?php endforeach; ?>
  </ul>
</div>
