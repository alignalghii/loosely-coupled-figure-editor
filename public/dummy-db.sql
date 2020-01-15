create database floor_plan_designer character set 'utf8mb4' collate 'utf8mb4_unicode_ci';

create user 'floor_plan_designer_admin'@'localhost' identified by 'floor_plan_designer_admin_password';
grant select, insert, delete, update on floor_plan_designer.* to 'floor_plan_designer_admin'@'localhost';

create user 'floor_plan_designer_user'@'localhost' identified by 'floor_plan_designer_user_password';
grant select, insert, delete, update on floor_plan_designer.* to 'floor_plan_designer_user'@'localhost';

use floor_plan_designer;

create table `flat` (
	`id` int not null auto_increment primary key
);

create table `room` (
	`id` int not null auto_increment primary key,
	`name` varchar(16) not null,
	`flat_id` int not null,
	foreign key (`flat_id`) references `flat` (`id`)
);

create table `room_prototype` (
	`id` int not null auto_increment primary key,
	`name` varchar(16) not null
);
