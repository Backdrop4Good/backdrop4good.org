Backdrop for Good
-----------------

Backdrop 4 Good website.

Spin up Project on Lando
---------------

* `git clone git@github.com:BackdropForGood/backdropforgood.org.git`
* `cd backdropforgood.org`
* `lando start`

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
