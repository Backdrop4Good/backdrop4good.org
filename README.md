Backdrop for Good
-----------------

Backdrop for Good website.

Spin up Project on Lando
---------------

* `git clone git@github.com:BackdropForGood/backdropforgood.org.git`
* `cd backdropforgood.org`
* `lando start`

Using Drush
-----------

Drush is available from within the `web` directory.

* `cd web`
* Clear cache:
```bash
lando drush cc all
```
* Download a module
```bash
lando drush dl {module_name}
```
