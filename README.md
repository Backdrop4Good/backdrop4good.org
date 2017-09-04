Backdrop for Good
-----------------

Backdrop 4 Good website.

Spin up Project on Lando
---------------

* `git clone git@github.com:BackdropForGood/backdrop4good.org.git`
* `cd backdropforgood.org`
* Add in a `settings.php` to the `web` directory. The file that points to the
  config (which is outside of the `web` directory).
  * `wget https://github.com/backdrop/backdrop/raw/1.x/settings.php`
  * Replace the config pointer lines with these:
  ```bash
  $config_directories['active'] = '../config/active';
  $config_directories['staging'] = '../config/staging';
  ```
* `lando start`
* Get a database from Backup and Migrate and import it into your local. After
  downloading the DB put in the same directory as your `.lando.yml` file (the
  project root). Then you can import the DB with:
  ```bash
  lando db-import <file.sql>
  ```

Theme Workflow
--------------
The `bfg` theme is using `sass` and `gulp` to manage css.
To compile and watch the `sass` files:

```bash
lando gulp
```

Using Drush
-----------

Drush is available from within the `web` directory.
```bash
cd web
```
* Clear cache:
```bash
lando drush cc all
```
* Download a module
```bash
lando drush dl {module_name}
```

Configuration Workflow
----------------------

* Make config changes in the Backdrop UI on your local dev environment.
* Once complete export the configuration:
  * `lando drush bcex`
  * Add and commit to git
  * push up to github, pull down to server and then import the config
    * `drush bcim`
