# Vincit WordPress

Customizations and improvements for [Seravo/wordpress](https://github.com/Seravo/wordpress). Inspired by [kehittamo/kehittamo-seravo-addons](https://github.com/kehittamo/kehittamo-seravo-addons).

## Usage
~~clone [Seravo/wordpress](https://github.com/Seravo/wordpress)~~, change values in config-sample.yml, and save it as config.yml.
Seravo/wordpress requires a patch so it can run the necessary scripts. Use [this fork](https://github.com/kehittamo/wordpress) instead until the patch is merged.

```
git clone git@github.com:kehittamo/wordpress.git wordpress.local
```

### Modify your composer.json
Merge composer.json with this:
```
"dropin-paths": {
  ".": ["type:seravo-wordpress-dropin"]
}
```

This is only necessary until we get [upstream support for](https://github.com/Seravo/wordpress/issues/67) drop-ins.

### Add this package
Run `composer require --dev vincit/wordpress [dev-master]`.

Finally run `vagrant up`.

## Developing this further
As you probably don't want to commit every change you make, this is for you. As Composer installs this as a drop-in, you have to do some interesting things to make your life easier.

One solution is to clone this in a different directory than Seravo/wordpress, and copy the files over when they change.
```
git clone git@github.com:Seravo/wordpress.git wordpress
git clone git@github.com:Vincit/wordpress.git wordpress-dropin
cp wordpress-dropin/* wordpress/ # Run every time files change (or use a loop!)
```

You might notice that this does not copy vagrant-up-customizer.sh; I'm sure you can work around that if you have to.
