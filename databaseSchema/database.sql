CREATE TABLE IF NOT EXISTS Users (
    `id` VARCHAR(256) primary KEY,
    `username` VARCHAR(32) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` TEXT NOT NULL,
    `avatar` VARCHAR(256) DEFAULT 'avatar.png',
    `created` TIMESTAMP DEFAULT now (),
    `updated` TIMESTAMP DEFAULT now ()
);
Drop TABLE IF EXISTS Categorys;
CREATE TABLE IF NOT EXISTS Categorys (
    `id` VARCHAR(256) primary KEY,
    `name` VARCHAR(32) NOT NULL,
    `created` TIMESTAMP DEFAULT now (),
    `updated` TIMESTAMP DEFAULT now ()
);
CREATE TABLE IF NOT EXISTS books (
    `id` varchar(256) primary key,
    `user_id` VARCHAR(256) not null,
    `category_id` varchar(256) not null,
    `cover` text not null,
    `title` varchar(256) not null,
    `description` text not null,
    `price` decimal(10, 2) not null,
    `count` int not null,
    `rating` decimal(1, 1) not null,
    `created` TIMESTAMP DEFAULT now(),
    `updated` TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categorys(id)
);
DROP TABLE if EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
    `id` varchar(256) primary key,
    `user_id` VARCHAR(256) not null,
    `book_id` varchar(256) not null,
    `rating` int DEFAULT 0,
    `review` text not null,
    `created` TIMESTAMP DEFAULT now(),
    `updated` TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
Drop TABLE IF EXISTS cart;
CREATE TABLE IF NOT EXISTS cart (
    `id` varchar(256) primary key DEFAULT md5(random()::text || clock_timestamp()::text),
    `user_id` VARCHAR(256) not null,
    `book_id` varchar(256) not null,
    `count` int DEFAULT 1,
    `created` TIMESTAMP DEFAULT now(),
    `updated` TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);
DELIMITER $$ CREATE TRIGGER before_insert_cart BEFORE
INSERT ON cart FOR EACH ROW BEGIN
DECLARE user_exists INT;
SELECT COUNT(*) INTO user_exists
FROM books
WHERE id = NEW.book_id
    and user_id = NEW.user_id;
-- 	SELECT 'user_exists: ' || user_exists;
IF user_exists = 1 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = "can not add your book in cart";
END IF;
END;
$$ DELIMITER;
create table if not exists government (
    `id` VARCHAR(256) PRIMARY KEY DEFAULT MD5(CONCAT(RAND(), NOW())),
    `gov` varchar(256) not null,
    `created` TIMESTAMP DEFAULT now(),
    `updated` TIMESTAMP default now()
);
INSERT INTO government (gov)
VALUES ('cairo-القاهرة'),
    ('alexandria-الإسكندرية'),
    ('giza-الجيزة'),
    ('monufia-المنوفية'),
    ('qalyubia-القليوبية'),
    ('sharqia-الشرقية'),
    ('gharbia-الغربية'),
    ('minya-المنيا'),
    ('fayoum-الفيوم'),
    ('asyut-أسيوط'),
    ('sohag-سوهاج'),
    ('qena-قنا'),
    ('luxor-الأقصر'),
    ('aswan-أسوان'),
    ('beheira-البحيرة'),
    ('damietta-دمياط'),
    ('port_said-بورسعيد'),
    ('ismailia-الإسماعيلية'),
    ('suez-السويس'),
    ('kafr_el_sheikh-كفر الشيخ'),
    ('matrouh-مطروح'),
    ('new_valley-الوادي الجديد'),
    ('north_sinai-شمال سيناء'),
    ('south_sinai-جنوب سيناء'),
    ('red_sea-البحر الأحمر'),
    ('dakahlia-الدقهلية'),
    ('suez_canal-قناة السويس');
CREATE TABLE `orders` (
    `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(), current_timestamp())),
    `user_id` varchar(256) NOT NULL,
    `seller_id` varchar(256) NOT NULL,
    `shipping` decimal(10, 1) DEFAULT 0.0,
    `status` varchar(256) NOT NULL DEFAULT 'pending',
    `address_id` varchar(256) NOT NULL,
    `created` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
CREATE TABLE `order_items` (
    `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(), current_timestamp())),
    `book_id` varchar(256) NOT NULL,
    `order_id` varchar(256) NOT NULL,
    `count` int(11) NOT NULL,
    `status` varchar(256) DEFAULT 'pending',
    `created` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
CREATE TABLE `address` (
    `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(), current_timestamp())),
    `user_id` varchar(256) NOT NULL,
    `username` varchar(32) NOT NULL,
    `mobile` int(11) NOT NULL,
    `government` varchar(256) NOT NULL,
    `city` varchar(256) NOT NULL,
    `address` text NOT NULL,
    `created` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;