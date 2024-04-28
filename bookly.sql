-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2024 at 01:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookly`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(),current_timestamp())),
  `user_id` varchar(256) NOT NULL,
  `username` varchar(32) NOT NULL,
  `mobile` int(11) NOT NULL,
  `government` varchar(256) NOT NULL,
  `city` varchar(256) NOT NULL,
  `address` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `username`, `mobile`, `government`, `city`, `address`, `created`, `updated`) VALUES
('ae08bce1cf5a27c1735a0916d7438738', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', 'Yuuuumidvd', 1000000000, '9abc573832f07f0b31a2f32397136741', 'القاهره', 'شارع الجمهورية، حي الزمالك', '2024-04-28 06:40:49', '2024-04-28 06:40:49');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` varchar(256) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `category_id` varchar(256) NOT NULL,
  `cover` text NOT NULL,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `count` int(11) NOT NULL,
  `rating` decimal(1,1) DEFAULT 0.0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `user_id`, `category_id`, `cover`, `title`, `description`, `price`, `count`, `rating`, `created`, `updated`) VALUES
('04a31e2e-3679-4f79-8a0c-f6d0000170da', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766495378-502cc5c1-8889-4040-be69-4820f2fa31a9.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:14:55', '2024-04-25 05:45:28'),
('0861040f-1aeb-47c4-a838-535089140069', '0861040f-1aeb-47c4-a838-535089140069', '1679091c5a880faf6fb5e6087eb1b2dc', 'cover.png', 'title', 'desc', 1.00, 1, 0.0, '2024-04-22 04:05:01', '2024-04-22 04:05:01'),
('086d1040f-1aeb-47c4-a838-535089140069', '0861040f-1aeb-47c4-a838-535089140069', '6f4922f45568161a8cdf4ad2299f6d23', 'cover.png', 'title', 'desc', 1.00, 1, 0.0, '2024-04-22 04:45:53', '2024-04-22 04:45:53'),
('11ccd70d-8119-48ce-b923-46058354ca90', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766512845-9071044f-c5d7-4388-a9b3-9c917dc9860c.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:15:12', '2024-04-22 06:15:12'),
('19f22f08-3c3f-48a0-947a-8371b2b65450', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713782916235-ec096d8d-97ca-4367-81c5-9624ae1690c3.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 10:48:36', '2024-04-22 10:48:36'),
('1ad2cd2c-f64d-4c89-9988-84be12a83481', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713782939747-e285b32f-6cbe-4ecb-b78a-899d4584c801.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 10:48:59', '2024-04-22 10:48:59'),
('3e14c695-7217-4ac0-94a5-1df835f65edb', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713771478572-ce1bcb67-6fe1-4d08-bc96-3de403a57973.png', 'ahmed ali for buy', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:37:58', '2024-04-22 08:04:34'),
('40ea6e7b-f000-43be-bf9d-3b116ee03d7a', 'fc009571-7feb-4885-966c-314ce92266ea', '1f0e3dad99908345f7439f8ffabdffc4', '1714119065114-3cc27b4d-f72c-40a1-a035-0e6d0805eb9b.jpg', 'test add new book', 'test add new booktest add new booktest add new booktest add new book', 234.00, 3, 0.0, '2024-04-26 08:11:05', '2024-04-26 08:11:05'),
('492e8f50-e52b-4df1-a59b-ba5f7b004ecf', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766548131-22926dde-f66f-483b-8fbd-53fcefcd4f7a.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:15:48', '2024-04-22 06:15:48'),
('4a42185d-2466-43e2-aad7-20b98b049aaa', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713771340990-a844f1fe-c224-4b79-83d7-5cd12a79c72a.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:35:40', '2024-04-22 07:35:40'),
('4ac0724a-037b-4f36-8763-62556b2128a5', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '70efdf2ec9b086079795c442636b55fb', '1714189644638-c15c558a-dec5-4fa8-a19d-cc09168b5756.jpg', 'Acing the System Design Interview', 'The system design interview is one of the hardest challenges you’ll face in the software engineering hiring process. This practical book gives you the insights, the skills, and the hands-on practice you need to ace the toughest system design interview questions and land the job and salary you want.\r\n', 33.00, 33, 0.0, '2024-04-27 03:47:24', '2024-04-27 03:56:41'),
('756cee22-278b-46be-9e10-79272071546a', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713771328043-c044c44c-7fe4-4040-9c0b-a3396970965a.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:35:28', '2024-04-22 07:35:28'),
('864c9bed-7a85-4579-b871-610f68423560', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713770182904-640e71ae-8539-4fe4-9dab-1958b60e9885.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:16:22', '2024-04-22 07:16:22'),
('c4746d89-f5fe-441a-9625-bd68fe08d558', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713771324552-e1605fc9-26d5-4066-887a-76a74fc2cbdf.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:35:24', '2024-04-22 07:35:24'),
('cbbdd995-99ad-4371-9560-c536874580f0', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713771350267-b101bbf6-5c1b-4426-b467-ddc012d2f54b.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 07:35:50', '2024-04-22 07:35:50'),
('daf87ee4-7e97-41b4-9f94-1ccc07c33c16', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766435147-7d41e61e-01d4-4aa7-a865-9344d8e6396c.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:13:55', '2024-04-22 07:55:13'),
('ef85ce6e-2372-4762-89bd-e9c2c201ef3b', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713847816237-bea55fe6-702d-4f13-9e01-7f90882aa5fa.jpg', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-23 04:50:16', '2024-04-23 04:50:16'),
('f4dcdb8b-b4a1-48d1-af6d-dd7ac314befb', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766453197-5f03d583-dc2c-408d-aafb-42c6ae97e40b.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:14:13', '2024-04-22 06:14:13'),
('faf87d1c-6126-4d9b-a07b-4e1317410d52', '3371b684-fe48-434f-a929-3725aa3038f2', 'c74d97b01eae257e44aa9d5bade97baf', '1713766531159-5cddd00a-2aa9-44f8-b99d-e1b01b35ede4.png', 'testwewsdf', 'test desctest desctest desctest desctest desctest desctest desctest desctest desctest desc', 120.00, 100, 0.0, '2024-04-22 06:15:31', '2024-04-22 07:55:53');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(),current_timestamp())),
  `user_id` varchar(256) NOT NULL,
  `book_id` varchar(256) NOT NULL,
  `count` int(11) DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `book_id`, `count`, `created`, `updated`) VALUES
('12d6cb86-50b8-423f-9c10-be2b503e7eca', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '40ea6e7b-f000-43be-bf9d-3b116ee03d7a', 1, '2024-04-28 10:55:01', '2024-04-28 10:55:01'),
('17033077-b57a-48c1-9e49-3b3f62e990ec', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', 'ef85ce6e-2372-4762-89bd-e9c2c201ef3b', 2, '2024-04-28 06:52:49', '2024-04-28 06:52:49'),
('19fccdc0-40b1-4fa6-b0eb-5bd9ff2e478b', '3371b684-fe48-434f-a929-3725aa3038f2', '40ea6e7b-f000-43be-bf9d-3b116ee03d7a', 3, '2024-04-28 11:29:12', '2024-04-28 11:29:12'),
('2fd6224b-60a3-4a70-9987-59773dc4ff61', '0e178790-10b1-443b-8b71-1809590268f6', 'ef85ce6e-2372-4762-89bd-e9c2c201ef3b', 3, '2024-04-28 11:34:06', '2024-04-28 11:34:06'),
('e39e959e-2a10-430b-80a5-ce1df27e2408', '3371b684-fe48-434f-a929-3725aa3038f2', '4ac0724a-037b-4f36-8763-62556b2128a5', 1, '2024-04-28 11:32:42', '2024-04-28 11:32:42'),
('e496e603-c8d7-4846-b068-db32b176e3a3', 'fc009571-7feb-4885-966c-314ce92266ea', '4ac0724a-037b-4f36-8763-62556b2128a5', 1, '2024-04-27 04:13:56', '2024-04-27 04:13:56');

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

CREATE TABLE `categorys` (
  `id` varchar(256) NOT NULL,
  `name` varchar(32) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorys`
--

INSERT INTO `categorys` (`id`, `name`, `created`, `updated`) VALUES
('1679091c5a880faf6fb5e6087eb1b2dc', 'Mystery & Thriller / الغموض والإ', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('1f0e3dad99908345f7439f8ffabdffc4', 'Poetry / الشعر', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('3c59dc048e8850243be8079a5c74d079', 'Law / القانون', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('45c48cce2e2d7fbdea1afc51c7c6ad26', 'History / التاريخ', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('6512bd43d9caa6e02c990b0a82652dca', 'Health & Wellness / الصحة والعاف', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('6f4922f45568161a8cdf4ad2299f6d23', 'Education / التعليم', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('70efdf2ec9b086079795c442636b55fb', 'Self-help / تطوير الذات', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('8f14e45fceea167a5a36dedd4bea2543', 'Romance / رومانسي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('98f13708210194c475687be6106a3b84', 'Comics & Graphic Novels / الكومي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('9bf31c7ff062936a96d3c8bd1f8f2ff3', 'Travel / السفر', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('a87ff679a2f3e71d9181a67b7542122c', 'Young Adult / الشباب', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('aab3238922bcc25a6f606eb525ffdc56', 'Science & Technology / العلوم وا', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('b6d767d2f8ed5d21a44b0e5886680cb9', 'Philosophy / الفلسفة', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c20ad4d76fe97759aa27a0c99bff6710', 'Business & Economics / الأعمال و', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c4ca4238a0b923820dcc509a6f75849b', 'Fiction / الروايات', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c51ce410c124a10e0db5e4b97fc2af39', 'Cookbooks / كتب الطهي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c74d97b01eae257e44aa9d5bade97baf', 'Art & Photography / الفن والتصوي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c81e728d9d4c2f636f067f89cc14862c', 'Non-Fiction / غير خيالي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('c9f0f895fb98ab9159f51fd0297e236d', 'Biographies & Autobiographies / ', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('d3d9446802a44259755d38e6d163e820', 'Religion & Spirituality / الدين ', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('e4da3b7fbbce2345d7772b0674a318d5', 'Science Fiction & Fantasy / الخي', '2024-04-21 12:17:25', '2024-04-21 12:17:25'),
('eccbc87e4b5ce2fe28308fd9f2a7baf3', 'Children’s Books / كتب الأطفال', '2024-04-21 12:17:25', '2024-04-21 12:17:25');

-- --------------------------------------------------------

--
-- Table structure for table `government`
--

CREATE TABLE `government` (
  `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(),current_timestamp())),
  `gov` varchar(256) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `government`
--

INSERT INTO `government` (`id`, `gov`, `created`, `updated`) VALUES
('0ffb83c6dd9b011c33f305c48ce06eb9', 'port_said-بورسعيد', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('170f2b1579f36b20a30fbffac580b496', 'matrouh-مطروح', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('197036e0ce3c752d6f80250d1067c359', 'alexandria-الإسكندرية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('23b0107def8aa58e45b058d7b264516e', 'suez_canal-قناة السويس', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('3e9182422d699c6b5af6f8766a0d9f4b', 'red_sea-البحر الأحمر', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('427e4d938cf16b0f323986284c77a59b', 'beheira-البحيرة', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('43ac291ce615509c0094476fe95a54e3', 'aswan-أسوان', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('46923339430cc044f6785983e522375a', 'ismailia-الإسماعيلية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('5b44658e7f88e12153ff2e1f53d537ec', 'minya-المنيا', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('665d55a2180a3b09b362aa925b08b882', 'fayoum-الفيوم', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('7ae9137c49be6b714dede3545e5b289d', 'qalyubia-القليوبية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('8c13a5af9e164238d296328d7d7c8ed2', 'south_sinai-جنوب سيناء', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('9abc573832f07f0b31a2f32397136741', 'luxor-الأقصر', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('a15a42b243c35e7330c6b4e8c9a1c365', 'dakahlia-الدقهلية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('a6cee9364015d4e821bcee93f5d4b6c3', 'giza-الجيزة', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('aa799222a96091ae8abf44a26091337b', 'asyut-أسيوط', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('ab512381ed8aaaabc78740b91d525c79', 'sharqia-الشرقية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('d1ccc337c0e60c755782fafd99530011', 'sohag-سوهاج', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('d59850179d49e672b23e25187b9260e9', 'kafr_el_sheikh-كفر الشيخ', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('e1ac11dd9d1de179df37b7b8563a5530', 'suez-السويس', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('e36276fffc39095a8a83fb01151cd8a0', 'qena-قنا', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('e472de76ea3f53485bef9633ad6cafa2', 'monufia-المنوفية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('e76acfddb734fac742328688f7a5b436', 'gharbia-الغربية', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('e7dcf858a57f0cfe1d34994fd3c2469b', 'north_sinai-شمال سيناء', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('ede973486ee9eccb9fd6db1c2fb3fda0', 'damietta-دمياط', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('f409afdfef028b5e450b85885744befa', 'cairo-القاهرة', '2024-04-27 10:31:31', '2024-04-27 10:31:31'),
('f6d6bdd406419c34881a715890f72e09', 'new_valley-الوادي الجديد', '2024-04-27 10:31:31', '2024-04-27 10:31:31');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` varchar(256) NOT NULL,
  `user_id` varchar(256) NOT NULL,
  `book_id` varchar(256) NOT NULL,
  `rating` int(11) DEFAULT 0,
  `review` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `book_id`, `rating`, `review`, `created`, `updated`) VALUES
('1c6da385-9ace-456c-aaf8-1ae5baa609da', 'fc009571-7feb-4885-966c-314ce92266ea', 'ef85ce6e-2372-4762-89bd-e9c2c201ef3b', 5, 'a', '2024-04-27 04:51:26', '2024-04-27 04:51:26'),
('20533c30-7460-44eb-ad8e-a0170adf9294', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '1ad2cd2c-f64d-4c89-9988-84be12a83481', 3, 'books is `good`', '2024-04-25 11:56:02', '2024-04-25 11:56:02'),
('4265ad82-e324-464a-a9cb-c5b015810a7d', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '1ad2cd2c-f64d-4c89-9988-84be12a83481', 3, 'books is `good`', '2024-04-25 11:55:55', '2024-04-25 11:55:55'),
('5241dc3a-68a0-4ad1-89c0-8baea074b5a3', 'fc009571-7feb-4885-966c-314ce92266ea', '1ad2cd2c-f64d-4c89-9988-84be12a83481', 3, 'adfas', '2024-04-27 04:48:29', '2024-04-27 04:48:29'),
('712becee-7137-4e1e-9ce2-3c10e680f98c', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '4ac0724a-037b-4f36-8763-62556b2128a5', 5, 'as', '2024-04-27 05:04:06', '2024-04-27 05:04:06'),
('9cd14da1-7091-4413-8ac4-ce2fd21e9dd4', 'adca7ea9-0624-4eb6-802d-08c84e3c4eac', '04a31e2e-3679-4f79-8a0c-f6d0000170da', 5, 'asf', '2024-04-25 05:46:18', '2024-04-25 05:46:18'),
('dbded7af-15e2-47eb-878f-c81a3436f7f7', '0e178790-10b1-443b-8b71-1809590268f6', 'ef85ce6e-2372-4762-89bd-e9c2c201ef3b', 4, 'Hello', '2024-04-28 11:34:16', '2024-04-28 11:34:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(256) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `avatar` varchar(256) DEFAULT 'avatar.png',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `created`, `updated`) VALUES
('0861040f-1aeb-47c4-a838-535089140069', 'Yuuuumi', 'dcavvuod@bugfoo.com', '$2b$10$ghG64A3HLER0zUyGvRs7must/bP0f/kBcGUS6N.lvnNy.UM5kDsoa', 'avatar.png', '2024-04-11 11:03:13', '2024-04-11 11:03:13'),
('0e178790-10b1-443b-8b71-1809590268f6', 'Ahmedali', 'katherinagray@yogirt.com', '$2b$10$NogKBZgoJdmOp55qMGr4puIjG/512YOf3nazY.lOL.ggDcC4BKCoq', 'avatar.png', '2024-04-28 11:31:46', '2024-04-28 11:31:46'),
('0f6fdb32-cf2d-4c52-a1af-cc3268a3c656', 'ahmedali', 'ahmedali@gmail.com', '$2b$10$10zlYZvZL7Qi6K8JpPk2nOK5ou7gHD7uTtZDUeNVK3vtqCHG6slAW', 'avatar.png', '2024-04-05 21:46:57', '2024-04-05 21:46:57'),
('1a6a76bd-fd51-4e51-9e47-9c13e6cbc459', 'ahmedali', 'ahmedali1@gmail.com', '$2b$10$YUOTYkJsV5/UGRhMlAn65enJb2VLqG4vN7k7NVm7gLD9zu5A12d3O', 'avatar.png', '2024-04-06 00:23:50', '2024-04-06 00:23:50'),
('20d640cf-b7e2-4d7f-bffd-d6406141bc30', 'Yuuuumi', 'cavvuodd@bugfoo.com', '$2b$10$MAgzXgXpLqMgsw1oVO7PjOns5zEYiyYHoH4wEcEkmZpzu7GiMprKC', 'avatar.png', '2024-04-06 01:17:20', '2024-04-06 01:17:20'),
('3234ceba-c126-49cc-8fe4-74606d8313cc', 'Yuuuumi', 'cavvduo@bugfoo.com', '$2b$10$leyiYJAsjZL.lq0WhRUu3ONrDzat11Nytm.VvZFWq11y3fd3CZKlS', 'avatar.png', '2024-04-06 01:28:42', '2024-04-06 01:28:42'),
('3371b684-fe48-434f-a929-3725aa3038f2', 'ahmedali', '1292coffee@awgarstone.com', '$2b$10$v.bntg3iE9h5/Pqxbr0KcOYShyu/wQgnFT6ZcQZoKg1pVPTzTesDO', 'avatar.png', '2024-04-11 11:14:08', '2024-04-11 11:14:08'),
('43839bf9-93cd-410f-acf9-92332c319f11', 'Yuuuumis', 'cavvuddo@bugfoo.com', '$2b$10$dlHGzx0gxD2wBPxfMzPV6.VmUTpJEkQImGirUOhDMTGLm5uXvrUV.', 'avatar.png', '2024-04-06 01:15:43', '2024-04-06 01:15:43'),
('4647cb05-516a-4e73-b49d-60aa5c4bc093', 'Yuuuumi', 'cavvuod@bugfoo.com', '$2b$10$JdotThEsvd.s89yTXHk0bO8TTroWgHP45B18t12Q6oX1GTjtVChae', 'avatar.png', '2024-04-06 01:16:31', '2024-04-06 01:16:31'),
('4f01e5e6-f936-462b-aef5-a8e4314fbb36', 'asfdas', 'cavvuo@bdugfoo.com', '$2b$10$bMaGSjLOdrqElQlIDXZIeu/js5rFT1JSuACzijKJcSTJ8ylgGzLgK', 'avatar.png', '2024-04-06 01:48:21', '2024-04-06 01:48:21'),
('61bc491e-3ae1-4992-9308-000f14cab105', 'Yuuuumi', 'cavvudo@bugfoo.com', '$2b$10$5PmJerEdCT.Dj.QcSM4UP.Al41l/MQcHfNVh6rcqvTor14eDo1i0O', 'avatar.png', '2024-04-06 01:14:23', '2024-04-06 01:14:23'),
('6bd89778-2eae-4158-b258-17c7305462fa', 'Yuuuumi', 'cavvduod@bugfoo.com', '$2b$10$fA/hyfhYseb/1IsfnO.CvuehhDzdVAOoqn95vaG7mmRFSPtmFmUua', 'avatar.png', '2024-04-06 01:17:06', '2024-04-06 01:17:06'),
('adca7ea9-0624-4eb6-802d-08c84e3c4eac', 'Yuuuumi', 'cherie637@fthcapital.com', '$2b$10$1wYKACq7UfINSwoAvVIa8OaPoYq0jiVS7.c7/FK.QL4pk.OzyXohG', 'avatar.png', '2024-04-23 04:29:58', '2024-04-23 04:29:58'),
('b5930d15-4a20-40f8-91f3-8733d0904b68', 'Yuuuumis', 'cavvuddod@bugfoo.com', '$2b$10$wlz913Znv4FNjxIDmdq7vOQS76ZcRpSWj/UawD/qhPeM77qIjkwVu', 'avatar.png', '2024-04-06 01:15:53', '2024-04-06 01:15:53'),
('c4c138a8-2b4c-40c8-8e9e-f55bf2171216', 'Yuuuumi', 'cavvuo@dbugfoo.com', '$2b$10$mx9dQc5B.Fe5amSJyL/uoeks5B1TeVnL8972sHs2oGcFc6p2RTS32', 'avatar.png', '2024-04-06 01:35:49', '2024-04-06 01:35:49'),
('c8478190-4789-4986-bf93-9114f0afb826', 'Yuuuumi', 'cavvuo@bugfoo.com', '$2b$10$pi8uoNXUj4RAF/H5Pg3oIu7clHK/1Ei8iruU1.QheYCC2jmqvs6IS', 'avatar.png', '2024-04-06 00:53:41', '2024-04-06 00:53:41'),
('d04175a3-d492-4104-857e-a4826e5a1173', 'Yuuuumisdsadfa', 'cavvudsao@bugfoo.com', '$2b$10$jmHU0HFY3nx0UBU/WB2yQO2FoutzS/tQSH3eCFVp/fiWMeGF0Amfe', 'avatar.png', '2024-04-06 01:06:24', '2024-04-06 01:06:24'),
('fc009571-7feb-4885-966c-314ce92266ea', 'indigo7685', 'indigo7685@awgarstone.com', '$2b$10$axYZtjXt73CmNC2HON9c1.Ovf77hi0yCBlDrdN7zdcUuM75a6q1XK', 'avatar.png', '2024-04-26 08:00:08', '2024-04-26 08:00:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `government` (`government`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `government`
--
ALTER TABLE `government`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_ibfk_2` (`book_id`),
  ADD KEY `reviews_ibfk_3` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `address_ibfk_2` FOREIGN KEY (`government`) REFERENCES `government` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categorys` (`id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
