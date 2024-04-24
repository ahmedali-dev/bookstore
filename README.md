# mysql test conection use python

### install driver

```
pip install mysql-connector-python
pip install mysqlclient


```

### code

```py

# users dabase orm

from django.db import models

class User(models.Model):
    id = models.TextField(primary_key=True)
    username = models.CharField(max_length=32, unique=True, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.TextField(null=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


```
