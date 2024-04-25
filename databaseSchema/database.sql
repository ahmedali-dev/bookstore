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
-- INSERT INTO Categorys (id, name) VALUES (MD5(1), 'Fiction / الروايات');
-- INSERT INTO Categorys (id, name) VALUES (MD5(2), 'Non-Fiction / غير خيالي');
-- INSERT INTO Categorys (id, name) VALUES (MD5(3), 'Children’s Books / كتب الأطفال');
-- INSERT INTO Categorys (id, name) VALUES (MD5(4), 'Young Adult / الشباب');
-- INSERT INTO Categorys (id, name) VALUES (MD5(5), 'Science Fiction & Fantasy / الخيال العلمي والفانتازيا');
-- INSERT INTO Categorys (id, name) VALUES (MD5(6), 'Mystery & Thriller / الغموض والإثارة');
-- INSERT INTO Categorys (id, name) VALUES (MD5(7), 'Romance / رومانسي');
-- INSERT INTO Categorys (id, name) VALUES (MD5(8), 'Biographies & Autobiographies / السير الذاتية والتراجم');
-- INSERT INTO Categorys (id, name) VALUES (MD5(9), 'History / التاريخ');
-- INSERT INTO Categorys (id, name) VALUES (MD5(10), 'Religion & Spirituality / الدين والروحانيات');
-- INSERT INTO Categorys (id, name) VALUES (MD5(11), 'Health & Wellness / الصحة والعافية');
-- INSERT INTO Categorys (id, name) VALUES (MD5(12), 'Business & Economics / الأعمال والاقتصاد');
-- INSERT INTO Categorys (id, name) VALUES (MD5(13), 'Cookbooks / كتب الطهي');
-- INSERT INTO Categorys (id, name) VALUES (MD5(14), 'Science & Technology / العلوم والتكنولوجيا');
-- INSERT INTO Categorys (id, name) VALUES (MD5(15), 'Travel / السفر');
-- INSERT INTO Categorys (id, name) VALUES (MD5(16), 'Art & Photography / الفن والتصوير');
-- INSERT INTO Categorys (id, name) VALUES (MD5(17), 'Self-help / تطوير الذات');
-- INSERT INTO Categorys (id, name) VALUES (MD5(18), 'Education / التعليم');
-- INSERT INTO Categorys (id, name) VALUES (MD5(19), 'Poetry / الشعر');
-- INSERT INTO Categorys (id, name) VALUES (MD5(20), 'Comics & Graphic Novels / الكوميكس والروايات المصورة');
-- INSERT INTO Categorys (id, name) VALUES (MD5(21), 'Law / القانون');
-- INSERT INTO Categorys (id, name) VALUES (MD5(22), 'Philosophy / الفلسفة');
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