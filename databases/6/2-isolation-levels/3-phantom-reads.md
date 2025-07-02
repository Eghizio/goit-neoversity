# The "Phantom Reads" Phenomena

The "Phantom Reads" Phenomena is a situation where a transaction reads a set of records that meet a specified condition, but during the execution of another transaction, new records are inserted or updated that also satisfy this condition. This can lead to the appearance of "phantom" records during subsequent reads.

This phenomenon is absent only at the `SERIALIZABLE` isolation level.

## Phantom Data

This occurs when a transaction retrieves a set of records based on a given condition, but during its execution, another transaction inserts or updates records that also meet this condition. As a result, "phantom" rows appear during subsequent reads within the same transaction.
