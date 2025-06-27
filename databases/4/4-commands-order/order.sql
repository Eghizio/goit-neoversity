SELECT product_id, 
	   AVG(quantity) average, 
       MIN(employee_id) as min_emp_id, 
       MAX(employee_id) 
	FROM orders o
		INNER JOIN order_details od ON o.id = od.order_id 
		INNER JOIN customers с ON с.id = o.customer_id
	WHERE shipper_id in (2,3) AND country LIKE 'US%'
	GROUP BY product_id
	HAVING average > 30
	ORDER BY average DESC 
	LIMIT 5 
	OFFSET 2;