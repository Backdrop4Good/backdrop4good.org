<?php
// DB Connection.
// $DB_USER = getenv('DB_USER');
// $DB_PASS = getenv('DB_PASS');
// $DB_NAME = getenv('DB_NAME');
$database = "mysql://main:@database.internal/main";

// Point to Backdrop config.
$config_directories['active'] = '../config/active';
$config_directories['staging'] = '../config/staging';
// Configure relationships.
if (isset($_ENV['PLATFORM_RELATIONSHIPS'])) {
  $relationships = json_decode(base64_decode($_ENV['PLATFORM_RELATIONSHIPS']), TRUE);
  if (empty($databases['default']) && !empty($relationships)) {
    foreach ($relationships as $key => $relationship) {
      $drupal_key = ($key === 'database') ? 'default' : $key;
      foreach ($relationship as $instance) {
        if (empty($instance['scheme']) || ($instance['scheme'] !== 'mysql' && $instance['scheme'] !== 'pgsql')) {
          continue;
        }
        $database = [
          'driver' => $instance['scheme'],
          'database' => $instance['path'],
          'username' => $instance['username'],
          'password' => $instance['password'],
          'host' => $instance['host'],
          'port' => $instance['port'],
        ];
        if (!empty($instance['query']['compression'])) {
          $database['pdo'][PDO::MYSQL_ATTR_COMPRESS] = TRUE;
        }
        if (!empty($instance['query']['is_master'])) {
          $databases[$drupal_key]['default'] = $database;
        }
        else {
          $databases[$drupal_key]['slave'][] = $database;
        }
      }
    }
  }
  $settings['hash_salt'] = 'NMZwj_i-6Oj-lgX-aDY2VoGaYKd3oFT7dFbxRt1lKNo';
  // Point to Backdrop config.
  $config_directories['active'] = '../config/active';
  $config_directories['staging'] = '../config/staging';
}
// Configure private and temporary file paths.
if (isset($_ENV['PLATFORM_APP_DIR'])) {
  if (!isset($conf['file_private_path'])) {
    $conf['file_private_path'] = $_ENV['PLATFORM_APP_DIR'] . '/private';
  }
  if (!isset($conf['file_temporary_path'])) {
    $conf['file_temporary_path'] = $_ENV['PLATFORM_APP_DIR'] . '/tmp';
  }
}
// Import variables prefixed with 'drupal:' into $conf.
if (isset($_ENV['PLATFORM_VARIABLES'])) {
  $variables = json_decode(base64_decode($_ENV['PLATFORM_VARIABLES']), TRUE);
  $prefix_len = strlen('drupal:');
  $drupal_globals = array('cookie_domain', 'installed_profile', 'drupal_hash_salt', 'base_url');
  foreach ($variables as $name => $value) {
    if (substr($name, 0, $prefix_len) == 'drupal:') {
      $name = substr($name, $prefix_len);
      if (in_array($name, $drupal_globals)) {
        $GLOBALS[$name] = $value;
      }
      else {
        $conf[$name] = $value;
      }
    }
  }
}
// Set a default Drupal hash salt, based on a project-specific entropy value.
if (isset($_ENV['PLATFORM_PROJECT_ENTROPY']) && empty($drupal_hash_salt)) {
  $drupal_hash_salt = $_ENV['PLATFORM_PROJECT_ENTROPY'];
}
