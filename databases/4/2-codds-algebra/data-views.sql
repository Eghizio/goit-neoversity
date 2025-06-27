-- Get all unique email addresses from customers and leads
SELECT email, 'Customer' as source FROM customers
UNION
SELECT email, 'Lead' as source FROM leads;

-- Get all names (first and last) from customers and leads
SELECT first_name, last_name FROM customers
UNION
SELECT first_name, last_name FROM leads;


-- Get all email addresses including duplicates
SELECT email, 'Customer' as source FROM customers
UNION ALL
SELECT email, 'Lead' as source FROM leads;

-- Get all phone numbers from customers and leads
SELECT phone, 'Customer' as type FROM customers WHERE phone IS NOT NULL
UNION ALL
SELECT phone, 'Lead' as type FROM leads WHERE phone IS NOT NULL;


-- Find emails that exist in both customers and leads tables
SELECT DISTINCT c.email
FROM customers c
INNER JOIN leads l ON c.email = l.email;

-- Find customers who are also in the leads table
SELECT email, first_name, last_name
FROM customers c
WHERE EXISTS (SELECT 1 FROM leads l WHERE l.email = c.email);

-- Find customer emails that are NOT in the leads table
SELECT c.email, c.first_name, c.last_name
FROM customers c
LEFT JOIN leads l ON c.email = l.email
WHERE l.email IS NULL;

-- Find leads that don't have corresponding customers
SELECT l.email, l.first_name, l.last_name, l.status
FROM leads l
WHERE NOT EXISTS (SELECT 1 FROM customers c WHERE c.email = l.email);
