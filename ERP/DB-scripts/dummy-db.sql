CREATE DATABASE `floor_plan_designer` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';

CREATE USER 'floor_plan_designer_admin'@'localhost' IDENTIFIED BY 'floor_plan_designer_admin_password';
GRANT ALL PRIVILEGES ON `floor_plan_designer`.* TO 'floor_plan_designer_admin'@'localhost';

CREATE USER 'floor_plan_designer_user'@'localhost' IDENTIFIED BY 'floor_plan_designer_user_password';
GRANT SELECT, INSERT, DELETE, UPDATE ON `floor_plan_designer`.* TO 'floor_plan_designer_user'@'localhost';

FLUSH PRIVILEGES;

USE `floor_plan_designer`;

CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(16) NOT NULL UNIQUE,
	`password` VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE `session` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`user_id` INT NOT NULL UNIQUE, #@TODO
	`token` INT NOT NULL UNIQUE, #@TODO
	FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

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
	`area`	REAL DEFAULT NULL COMMENT 'must not / need not provide when `autocorr_dir_fwd` is true @TODO decide mustnot vs neednot',
	`autocorr_dir_fwd` BOOL NOT NULL COMMENT 'autocorrection direction: recalculate area forward by shape arguments or infer backward vice versa, maintaining consistence (degrees of freedom)',
	`shape_id` INT NOT NULL,
	`shape_argument_1` REAL DEFAULT NULL,
	`shape_argument_2` REAL DEFAULT NULL,
	`shape_argument_3` REAL DEFAULT NULL,
	`shape_argument_4` REAL DEFAULT NULL,
	FOREIGN KEY (`flat_id`) REFERENCES `flat` (`id`),
	FOREIGN KEY (`prototype_id`) REFERENCES `room_prototype` (`id`),
	FOREIGN KEY (`shape_id`) REFERENCES `room_shape` (`id`)
);

INSERT INTO `user`
(`id`, `name` , `password`) VALUES
(  1 , 'admin', 'admin0'  );

INSERT INTO `flat`
(`id`, `address`          ) VALUES
( 56 , 'Csónak u. 88/E.'  ),
( 63 , 'Kisvirág u. 45.'  ),
( 49 , 'Kisvirág u. 45/I.');

INSERT INTO `room_prototype`
(`id`, `name`           ) VALUES
( 67 , 'amerikai konyha'),
( 81 , 'ebédlő'         ),
( 85 , 'WC'             ),
( 86 , 'konyha'         ),
( 87 , 'fürdőszoba'     );

INSERT INTO `room_shape`
(`id`, `symbol`, `name`              , `arity`, `interpret_argument_1`, `interpret_argument_2`, `interpret_argument_3`                                                 , `interpret_argument_4`) VALUES
(  1 , 'Q'     , 'négyzet'           ,  1     , 'edge'                , NULL                  , NULL                                                                   , NULL                  ),
(  2 , 'R'     , 'téglalap'          ,  2     , 'x-edge'              , 'y-edge'              , NULL                                                                   , NULL                  ),
(  3 , 'T'     , 'trapéz'            ,  4     , 'bottom-edge'         , 'height'              , 'left top vertex x-coord measured from that of bottom edge middlepoint', 'right top vertex ...'),
(  4 , 'L'     , 'L-alak'            ,  4     , 'big width'           , 'big height'          , 'small width'                                                          , 'small height'        );

INSERT INTO `room`
(`id`, `flat_id`, `prototype_id`, `area`, `autocorr_dir_fwd`, `shape_id`, `shape_argument_1`, `shape_argument_2`, `shape_argument_3`, `shape_argument_4`) VALUES
( 82 ,  56      ,  85           ,  25   , FALSE             ,  1        ,  NULL             , NULL              , NULL              , NULL              ),
( 83 ,  49      ,  81           ,   9   , TRUE              ,  1        ,   3               , NULL              , NULL              , NULL              ),
( 84 ,  49      ,  67           ,  24   , TRUE              ,  2        ,   8               ,   3               , NULL              , NULL              ),
( 85 ,  49      ,  86           ,  10   , TRUE              ,  3        ,   6               ,   2               ,  -1               ,   2               ),
( 86 ,  49      ,  87           ,  10   , TRUE              ,  4        ,   6               ,   5               ,   1               ,   2               ),
( 87 ,  63      ,  67           ,  15   , TRUE              ,  4        ,   6               ,   5               ,   1               ,   2               );
