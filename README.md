# Bloomon

### What is missing

- Inventory should be implemented,
- The warehouse class should be created.

My plan was to create a warehouse class to orchestrate all the events. Like;

- new flower arrived,
- a bouquet created with the spec ("..."),

The idea was to create a new instance of IBoueut for every Bouquet Spec. Then We call arrange method on bouquet instances each time and new flower arrived event is triggered. Arrange method returns a maybe bouquet spec.

The order we call arrange methods could be affecting the number of bouquets effectively created. Because a bouquet might use a flower that is not crucial for its own spec but this might affect the next bouquet. This can be should be addressed via a brute force algorithm first. Then possibly its a good idea to come up with some sophisticated solution.
