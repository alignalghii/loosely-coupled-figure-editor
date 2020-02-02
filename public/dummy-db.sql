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

INSERT INTO `flat` (`id`, `address`) VALUES (56, 'Csónak u. 88/E.'), (63, 'Kisvirág u. 45.'), (49, 'Kisvirág u. 45/I.');
INSERT INTO `room_prototype` (`id`, `name`) VALUES (67, 'amerikai konyha'), (81, 'ebédlő'), (85, 'WC');
INSERT INTO `room` (`id`, `room_prototype_id`, `flat_id`) VALUES (82, 85, 56), (83, 81, 49), (84, 67, 49), (85, 67, 49);
