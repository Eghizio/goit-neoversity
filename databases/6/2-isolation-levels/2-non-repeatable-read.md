# The "Non-Repeatable Read" Phenomenon

The "Non-Repeatable Read" Phenomenon is a situation where a transaction reads data that has been committed by another transaction, then reads the same data again, but the values have already been modified or deleted by another transaction. This scenario leads to inconsistent results when reading the same data multiple times.

This phenomenon occurs only at the `READ UNCOMMITTED` and `READ COMMITTED` isolation levels.

## Non-Repeatable Data

This occurs when a transaction reads data that has been committed by another transaction and then reads the same data again, only to find that it has been modified or deleted by another transaction. This results in inconsistent, non-repeatable reads of the same data.
