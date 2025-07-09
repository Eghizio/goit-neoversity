CREATE TABLE IF NOT EXISTS analytics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    event JSON NOT NULL
);

INSERT INTO analytics (event) VALUES ('{ "type":"click", "page": "landing_page"}');



-- Adding `type` column to easily query events (Approach A or B)
-- A. Clear the data to avoid nulls, Change the existing table.
-- We could also DROP table and recreate it with proper `type` column definition.
TRUNCATE TABLE analytics;
ALTER TABLE analytics ADD type VARCHAR(255) NOT NULL;

-- B. Change the existing table.
-- Update the previous events when type is NULL, with `type` 'click' as it was the only one at the moment.
-- Adjust `type` column constrain for NOT NULL, when we have no nulls in the dataset.
-- ALTER TABLE analytics DROP COLUMN type;
ALTER TABLE analytics ADD COLUMN type VARCHAR(255) AFTER timestamp;
UPDATE analytics SET type = 'click' WHERE type IS NULL;
ALTER TABLE analytics MODIFY type VARCHAR(255) NOT NULL;



INSERT INTO analytics (type, event) VALUES (
    'click',
    '{"page": "landing_page", "user_id":1337}'
);

INSERT INTO analytics (type, event) VALUES (
    'page_scroll',
    '{"page": "landing_page", "user_id":1337, "percentage":100}'
);

SELECT * FROM analytics WHERE type = 'click';

INSERT INTO analytics (type, event) VALUES (
    'click',
    '{"page": "pricing", "user_id": 42}'
);



SELECT
    timestamp,
    event->>'$.user_id' as user,
    event->>'$.page' as page
FROM analytics
WHERE type = 'click';

SELECT
    timestamp,
    event->>'$.user_id' as user,
    event->>'$.page' as page
FROM analytics
WHERE type = 'click'
  AND event->>'$.page' = 'pricing';



SELECT
    COUNT(*) as end_page_reached
FROM analytics
WHERE event->>'$.percentage' = 100;



INSERT INTO analytics (type, event) VALUES (
    'filters_enabled',
    '["Programming", "Databases"]'
);
INSERT INTO analytics (type, event) VALUES (
    'filters_enabled',
    '["Programming", "Web Development"]'
);

SELECT
    timestamp,
    event->>'$[0]' as category_1,
    event->>'$[1]' as category_2
FROM analytics
WHERE type = 'filters_enabled';

SELECT COUNT(*) FROM analytics WHERE event->>'$[0]' LIKE 'Prog%';



INSERT INTO analytics (type, event) VALUES (
    'categories_selected',
    '{"favourites":["Programming"]}'
);

SELECT timestamp, event->>'$.favourites[0]' as favourites FROM analytics WHERE event->>'$.favourites' IS NOT NULL;



SELECT JSON_ARRAY(42, 1337, 'abc', 'foo', 'bar', NOW());
SELECT JSON_OBJECT('user_id', 1337, 'name', 'Adam', 'last_login', NOW());
SELECT JSON_EXTRACT(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.user_id'
) as id;

SELECT JSON_EXTRACT(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.name'
) as quoted_name;
SELECT JSON_UNQUOTE(JSON_EXTRACT(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.name'
)) as unquoted_name;

SELECT JSON_SEARCH(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    'all',
    'Adam'
);

SELECT JSON_CONTAINS(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '"Adam"',
    '$.name'
);

SELECT JSON_CONTAINS(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '"Adam"',
    '$.full_name'
);

SELECT JSON_SET(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.last_login',
   TIMESTAMP(NOW())
);

SELECT JSON_INSERT(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.session_time_s',
   1337
);

SELECT JSON_REPLACE(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.last_login',
   TIMESTAMP(NOW())
);

SELECT JSON_REMOVE(
    '{"name": "Adam", "user_id": 1337, "last_login": "2025-07-07 19:33:41.000000"}',
    '$.name'
);
