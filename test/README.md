Unit testing with jest

In order to test your services, it's important to note that a Mock repo should be created in order to reduce database calls

In each service file, wrap your mock repo import with:
```
if (process.env.NODE_ENV == 'test') {
   <!-- YOUR MOCK REPO IMPORT GOES HERE -->
}
```
Note:: This wrapper should be after your initial repo import as to override it. Service import should be a let instead of const

When starting jest, your NODE_ENV will be equal to 'test', if this doesn't happen, you can manually set your NODE_ENV to test using:

```
export NODE_ENV=test
```

This is also true if you want to do manual testing using the mock repo.

If you want to change your NODE_ENV back to development, you can run this in your terminal/command line:
```
export NODE_ENV=development
```