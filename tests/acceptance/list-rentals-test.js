import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('should redirect to rentals route', (assert) => {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(),
                 '/rentals',
                 'should redirect automatically');
  });
});

test('should list available rentals', function (assert) {
  visit('/');
  andThen(function() {
    assertEqual(find('.listing').length,
                3,
                'should see 3 listings');
  });
});

test('should link to information about the company', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function() {
    assert.equal(currentURL(),
                 '/about',
                 'should navigate to about');
  });
});

test('should link to contact information', function(assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function(){
    assert.equal(currentURL(),
                 '/contact',
                 'should navigate to about');
  });
});

test('should filter the list of rentals by city', function(assert) {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  andThen(() => {
    assert.equal(find('.listing').length,
                 1,
                 'should show 1 listing item');
    assert.equal(find('.listing .location:contains("Seattle")').length,
                 1,
                 'should contain 1 list item with location Seattle');
  });
});

test('should show details for a specific rental', function(assert) {
  visit('/rentals');
  click('a:contains("Grand Old Mansion")');
  andThen(() => {
    assert.equal(currentURL(),
                 '/rentals/grand-old-mansion',
                 'should navigate to show route');
    assert.equal(find('.show-listing h2').text(),
                 'Grand Old  Mansion',
                 'should list rental title');
    assert.equal(find('.description').length,
                 1,
                 'should list a description of the property');
  });
});
