# The "Dirty Reads" Phenomenon

The "Dirty Reads" Phenomenon is a situation where one transaction reads data that has been modified but not yet committed by another transaction.

This phenomenon only occurs at the `READ UNCOMMITTED` isolation level.

## Dirty Data

This occurs when one transaction reads data that has been modified but not yet committed by another transaction. In other words, a transaction reads uncommitted changes made by another transaction, which could be rolled back or altered before the first transaction completes.
