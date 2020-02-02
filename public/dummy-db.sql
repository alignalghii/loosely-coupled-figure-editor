CREATE DATABASE `floor_plan_designer` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';

CREATE USER 'floor_plan_designer_admin'@'localhost' IDENTIFIED BY 'floor_plan_designer_admin_password';
GRANT ALL PRIVILEGES ON `floor_plan_designer`.* TO 'floor_plan_designer_admin'@'localhost';

CREATE USER 'floor_plan_designer_user'@'localhost' IDENTIFIED BY 'floor_plan_designer_user_password';
GRANT SELECT, INSERT, DELETE, UPDATE ON `floor_plan_designer`.* TO 'floor_plan_designer_user'@'localhost';

FLUSH PRIVILEGES;

USE `floor_plan_designer`;

CREATE TABLE `flat` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`address` VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE `room_prototype` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(16) NOT NULL UNIQUE
);

CREATE TABLE `room` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`flat_id` INT NOT NULL,
	`room_prototype_id` INT NOT NULL,
	FOREIGN KEY (`flat_id`) REFERENCES `flat` (`id`),
	FOREIGN KEY (`room_prototype_id`) REFERENCES `room_prototype` (`id`)
);
