CREATE TABLE IF NOT EXISTS users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	permission VARCHAR(255) NOT NULL
)