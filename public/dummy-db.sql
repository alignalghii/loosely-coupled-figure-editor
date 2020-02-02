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
	`name` VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE `room_shape` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`symbol` CHAR NOT NULL UNIQUE,
	`name` VARCHAR(32) NOT NULL UNIQUE,
	`arity` INT NOT NULL,
	`interpret_argument_1` VARCHAR (128) DEFAULT NULL,
	`interpret_argument_2` VARCHAR (128) DEFAULT NULL,
	`interpret_argument_3` VARCHAR (128) DEFAULT NULL,
	`interpret_argument_4` VARCHAR (128) DEFAULT NULL
);

CREATE TABLE `room` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`flat_id` INT NOT NULL,
	`prototype_id` INT NOT NULL,
	`shape_id` INT NOT NULL,
	`shape_argument_1` REAL DEFAULT NULL,
	`shape_argument_2` REAL DEFAULT NULL,
	`shape_argument_3` REAL DEFAULT NULL,
	`shape_argument_4` REAL DEFAULT NULL,
	`area`	REAL NOT NULL,
	`area_as_normalizer` BOOL NOT NULL DEFAULT TRUE COMMENT 'autocorrect shape arguments, maintaining consistence (degrees of freedom)',
	FOREIGN KEY (`flat_id`) REFERENCES `flat` (`id`),
	FOREIGN KEY (`prototype_id`) REFERENCES `room_prototype` (`id`),
	FOREIGN KEY (`shape_id`) REFERENCES `room_shape` (`id`)
);

INSERT INTO `flat`
(`id`, `address`          ) VALUES
( 56 , 'Csónak u. 88/E.'  ),
( 63 , 'Kisvirág u. 45.'  ),
( 49 , 'Kisvirág u. 45/I.');

INSERT INTO `room_prototype`
(`id`, `name`           ) VALUES
( 67 , 'amerikai konyha'),
( 81 , 'ebédlő'         ),
( 85 , 'WC'             );

INSERT INTO `room_shape`
(`id`, `symbol`, `name`              , `arity`, `interpret_argument_1`, `interpret_argument_2`, `interpret_argument_3`, `interpret_argument_4`) VALUES
(  1 , 'A'     , 'négyzet-területhez',  0     , NULL         , NULL        , NULL                                                                   , NULL                  ),
(  2 , 'Q'     , 'négyzet-oldalhoz'  ,  1     , 'edge'       , NULL        , NULL                                                                   , NULL                  ),
(  3 , 'R'     , 'téglalap'          ,  2     , 'x-edge'     , 'y-edge'    , NULL                                                                   , NULL                  ),
(  4 , 'T'     , 'trapéz'            ,  4     , 'bottom-edge', 'height'    , 'left top vertex x-coord measured from that of bottom edge middlepoint', 'right top vertex ...'),
(  5 , 'L'     , 'L-alak'            ,  4     , 'big width'  , 'big height', 'small width'                                                          , 'small height'        );

INSERT INTO `room`
(`id`, `flat_id`, `prototype_id`, `shape_id`, `shape_argument_1`, `shape_argument_2`, `shape_argument_3`, `shape_argument_4`, `area`) VALUES
( 82 ,  56      ,  85           ,  1        ,  NULL             , NULL               , NULL              , NULL              ,  25),
( 83 ,  49      ,  81           ,  2        ,   3               , NULL               , NULL              , NULL              ,   9),
( 84 ,  49      ,  67           ,  3        ,   6               ,   4                , NULL              , NULL              ,  24),
( 85 ,  49      ,  67           ,  4        ,   6               ,   2                ,  -1               ,   3               ,  10),
( 86 ,  63      ,  67           ,  5        ,   6               ,   5                ,   1               ,   2               ,  15);
