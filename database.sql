-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 08:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


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
('08e458108610a910063044c509290924', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 'Yuuuumi', 1001248063, '170f2b1579f36b20a30fbffac580b496', 'القاهره', 'القاهرهالقاهرهالقاهرهالقاهرهالقاهره', '2024-05-01 05:13:18', '2024-05-01 05:13:18'),
('1cd79e8e2836d9e2448eb72765cedba8', '1e08a92d-f9f2-4b0b-97a9-30e5ddd3f3c4', 'ahmedali', 1001248063, '8c13a5af9e164238d296328d7d7c8ed2', 'فاقوس', 'فاقوس العزازي المحطه', '2024-05-02 04:13:22', '2024-05-02 04:13:22'),
('4248e57c3f46b4d53e206c3e0a1c2e6f', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 'jzdzqpmt', 1001248063, 'f6d6bdd406419c34881a715890f72e09', 'كوبري الورشه', 'محافضة الشرقيه مركز قاقوس العزازي  كوبري الورشه بحوار الجامع', '2024-05-02 03:01:15', '2024-05-02 03:01:15'),
('91f0969d7742ece309e15f9fde8e3020', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 'ahmedali', 1001248063, 'a15a42b243c35e7330c6b4e8c9a1c365', 'فاقوس', 'فاقوس العزازي المحطه', '2024-04-30 15:10:39', '2024-04-30 15:10:39'),
('f5b0f67b198fd9f75fd692935e067f14', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'abdo', 1001248063, 'ab512381ed8aaaabc78740b91d525c79', 'الزقاويق', 'الزقازيق موقف ميت غمر', '2024-05-06 19:16:30', '2024-05-06 19:16:30');

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
  `visibled` int(11) DEFAULT 1,
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

INSERT INTO `books` (`id`, `user_id`, `category_id`, `cover`, `title`, `visibled`, `description`, `price`, `count`, `rating`, `created`, `updated`) VALUES
('12340674-aa55-402b-abf7-aa37b37f7e2e', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', '8f14e45fceea167a5a36dedd4bea2543', '1714549643390-bc6f75cc-c928-41d2-8d36-3cb3f124dd6a.jpg', 'asdfasdfa', 1, 'asdfqsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 33.00, 10, 0.0, '2024-05-01 07:47:23', '2024-05-01 07:47:23'),
('3347f815-c391-464d-8e99-1155ee78e2d5', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', '6f4922f45568161a8cdf4ad2299f6d23', '1715111456630-1cf4669a-225c-468e-a73c-450f6927b2fb.jpg', 'Clean Code - A Handbook of Agile Software Craftsmanship by Robert C. Martin Paperback – 1 August 2008', 1, 'From the Publisher\r\nClean Code - A Handbook of Agile Software Craftsmanship by Robert C. Martin Paperback\r\nOverview\r\nEven bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.\r\n\r\nNoted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship. Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.\r\n\r\nWhat kind of work will you be doing? You’ll be reading code—lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft.\r\n\r\nClean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code—of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and “smells” gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code.\r\n\r\nClean Code - A Handbook of Agile Software Craftsmanship by Robert C. Martin Paperback\r\nReaders will come away from this book understanding:\r\nHow to tell the difference between good and bad code.\r\nHow to write good code and how to transform bad code into good code.\r\nHow to create good names, good functions, good objects, and good classes.\r\nHow to format code for maximum readability.\r\nHow to implement complete error handling without obscuring code logic.\r\nHow to unit test and practice test-driven development.\r\nThis book is made for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code.', 152.00, 2, 0.0, '2024-05-07 19:50:56', '2024-05-07 19:50:56'),
('577c7427-6666-44ea-94ad-781016753974', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 'aab3238922bcc25a6f606eb525ffdc56', '1714486204815-29305017-7f2e-41fe-8c3a-04757ac8066a.jpg', 'System Design Interview – An insider\'s guide', 0, 'System Design Interview - An Insider\'s Guide (Volume 1)\r\n\r\nSystem design interviews are the most difficult to tackle of all technical interview questions. This book is Volume 1 of the System Design Interview - An insider’s guide series that provides a reliable strategy and knowledge base for approaching a broad range of system design questions. This book provides a step-by-step framework for how to tackle a system design question. It includes many real-world examples to illustrate the systematic approach, with detailed steps that you can follow.\r\n\r\nWhat’s inside?\r\n- An insider’s take on what interviewers really look for and why.\r\n- A 4-step framework for solving any system design interview question.\r\n- 16 real system design interview questions with detailed solutions.\r\n- 188 diagrams to visually explain how different systems work.\r\n\r\nTable Of Contents\r\nChapter 1: Scale From Zero To Millions Of Users\r\nChapter 2: Back-of-the-envelope Estimation\r\nChapter 3: A Framework For System Design Interviews\r\nChapter 4: Design A Rate Limiter\r\nChapter 5: Design Consistent Hashing\r\nChapter 6: Design A Key-value Store\r\nChapter 7: Design A Unique Id Generator In Distributed Systems\r\nChapter 8: Design A Url Shortener\r\nChapter 9: Design A Web Crawler\r\nChapter 10: Design A Notification System\r\nChapter 11: Design A News Feed System\r\nChapter 12: Design A Chat System\r\nChapter 13: Design A Search Autocomplete System\r\nChapter 14: Design Youtube\r\nChapter 15: Design Google Drive\r\nChapter 16: The Learning Continues', 200.00, 2, 0.0, '2024-04-30 14:10:04', '2024-04-30 14:10:04'),
('7a856b48-8a3b-411b-885f-e6b29e4ead12', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 'aab3238922bcc25a6f606eb525ffdc56', '1714488205939-2703647e-1161-4eb2-8e95-4c65ecd5b109.jpg', 'System Design Interview – An Insider\'s Guide: Volume 2', 1, '# System Design Interview - An Insider\'s Guide (Volume 2)\r\n\r\n`\r\nThis book can be seen as a sequel to the book: System Design Interview - An Insider’s Guide. It covers a different set of system design interview questions and solutions. Although reading Volume 1 is helpful, it is not required. This book should be accessible to readers who have a basic understanding of distributed systems.\r\n`\r\n\r\nThis volume provides a reliable strategy and knowledge base for approaching a broad range of system design questions that you may encounter. It will help you feel confident during this important interview. This book provides a step-by-step framework for how to tackle a system design question. It also includes many real-world examples to illustrate a systematic approach, with detailed and well-explained steps you can follow.\r\n\r\nWhat’s inside?\r\n- An insider’s take on what interviewers really look for and why.\r\n- A 4-step framework for solving any system design interview question.\r\n- 13 real system design interview questions with detailed solutions.\r\n- 300+ diagrams to visually explain how different systems work.\r\n\r\nTable of Contents\r\nChapter 1: Proximity Service\r\nChapter 2: Nearby Friends\r\nChapter 3: Google Maps\r\nChapter 4: Distributed Message Queue\r\nChapter 5: Metrics Monitoring\r\nChapter 6: Ad Click Event Aggregation\r\nChapter 7: Hotel Reservation\r\nChapter 8: Distributed Email Service\r\nChapter 9: S3-like Object Storage\r\nChapter 10: Real-time Gaming Leaderboard\r\nChapter 11: Payment System\r\nChapter 12: Digital Wallet\r\nChapter 13: Stock Exchange', 200.00, 2, 0.0, '2024-04-30 14:43:25', '2024-04-30 14:43:59'),
('ab6a09cf-33cc-4e8a-8cbf-0b3e8d463c77', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '98f13708210194c475687be6106a3b84', '1714486399686-e7e4570b-7f8f-4571-ac4a-b9665e47eea7.jpg', 'Hacking the System Design Interview: Real Big Tech Interview Questions and In-depth Solutions', 0, '#1 Book Pick for System Design Interviews by Five Books in 2022.\r\nGet the inside edge for your system design interview.\r\n\r\nWritten by a software engineer at Google, this book will teach you how to ace the system design interview. This book includes real interview questions based on hundreds of interviews conducted at big tech companies, and their detailed solutions. Learn software and system fundamentals in clear and engaging lessons, distilled from 15+ years of experience.\r\n\r\nIn this book, you will learn:\r\n\r\nA systematic approach to tackling any system design question by studying step-by-step solutions to real system design interview questions\r\nHow to design systems by using recurring components, the building blocks of systems\r\nThe fundamentals of a software system: servers, services, machines, applications, components, and modules\r\nPatterns in service design: microservices vs. monolith, orchestration vs. choreography, loose coupling, and high cohesion\r\nDatabase concepts: data modeling, relational vs. NoSQL, denormalization, replication, and consistency\r\nDistributed system principles: integration, networking protocols, REST vs. RPC, and CAP theorem\r\n\r\nBased on hundreds of interviews, Hacking the System Design Interview is the definitive guide to learning about systems and building a comprehensive foundation for your interview. It provides an insider view of the big tech interview process, and provides proven techniques that will help you succeed in your interview.\r\n\r\nHacking the System Design Interview will prepare you for success in your next tech interview. Get the book today, and get your dream job tomorrow.\r\n\r\nWalk through designs of recurring components that are the building blocks of systems:\r\n\r\nWeb server\r\nAPI gateway\r\nLoad balancer\r\nDistributed cache\r\nAsynchronous queue\r\nObject storage\r\nCDN\r\nFan-out service\r\nUnique ID generator\r\nAnd more ...\r\n\r\nLearn a systematic approach to tackling any system design question by studying step-by-step solutions to real system design interview questions, including:\r\n\r\nNewsfeed and Timeline: build a performant system that provides real-time newsfeed updates.\r\nRideshare Application: use R-trees to build a system for spatial indexing and location-based searching.\r\nSocial Network Graph Search Algorithm: create a bidirectional search to traverse a social network.\r\nTrack the Most Frequently Accessed Items: use a count-min sketch to reduce the space complexity in a system that processes large volumes of data.\r\nAutocomplete System: use a trie data structure to perform prefix lookup in a real-time typeahead system.\r\nDistributed Message Queue: scale a system with asynchronous and event-driven architecture.\r\nAnd more ...', 200.00, 2, 0.0, '2024-04-30 14:13:19', '2024-04-30 14:13:19'),
('af0ebc4d-f28d-485f-965e-bff2c0721145', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 'aab3238922bcc25a6f606eb525ffdc56', '1714486091471-ffb81415-063a-4ebc-9d85-626e450ed3f2.jpg', 'Acing the System Design Interview', 0, 'The system design interview is one of the hardest challenges you’ll face in the software engineering hiring process. This practical book gives you the insights, the skills, and the hands-on practice you need to ace the toughest system design interview questions and land the job and salary you want.\r\n\r\nIn Acing the System Design Interview you will master a structured and organized approach to present system design ideas like:\r\n\r\nScaling applications to support heavy traffic\r\nDistributed transactions techniques to ensure data consistency\r\nServices for functional partitioning such as API gateway and service mesh\r\nCommon API paradigms including REST, RPC, and GraphQL\r\nCaching strategies, including their tradeoffs\r\nLogging, monitoring, and alerting concepts that are critical in any system design\r\nCommunication skills that demonstrate your engineering maturity\r\n\r\nDon’t be daunted by the complex, open-ended nature of system design interviews! In this in-depth guide, author Zhiyong Tan shares what he’s learned on both sides of the interview table. You’ll dive deep into the common technical topics that arise during interviews and learn how to apply them to mentally perfect different kinds of systems.\r\n\r\nPurchase of the print book includes a free eBook in PDF and ePub formats from Manning Publications.\r\n\r\nForeword by Anthony Asta, Michael D. Elder.\r\n\r\nAbout the technology\r\n\r\nThe system design interview is daunting even for seasoned software engineers. Fortunately, with a little careful prep work you can turn those open-ended questions and whiteboard sessions into your competitive advantage! In this powerful book, Zhiyong Tan reveals practical interview techniques and insights about system design that have earned developers job offers from Amazon, Apple, ByteDance, PayPal, and Uber.\r\n\r\nAbout the book\r\n\r\nAcing the System Design Interview is a masterclass in how to confidently nail your next interview. Following these easy-to-remember techniques, you’ll learn to quickly assess a question, identify an advantageous approach, and then communicate your ideas clearly to an interviewer. As you work through this book, you’ll gain not only the skills to successfully interview, but also to do the actual work of great system design.\r\n\r\nWhat\'s inside\r\nInsights on scaling, transactions, logging, and more\r\nPractice questions for core system design concepts\r\nHow to demonstrate your engineering maturity\r\nGreat questions to ask your interviewer\r\n\r\nAbout the reader\r\n\r\nFor software engineers, software architects, and engineering managers looking to advance their careers.\r\n\r\nAbout the author\r\n\r\nZhiyong Tan is a manager at PayPal. He has worked at Uber, Teradata, and at small startups. Over the years, he has been in many system design interviews, on both sides of the table.\r\n\r\nThe technical editor on this book was Mohit Kumar.\r\n\r\nTable of Contents\r\n\r\nPART 1\r\n1 A walkthrough of system design concepts\r\n2 A typical system design interview flow\r\n3 Non-functional requirements\r\n4 Scaling databases\r\n5 Distributed transactions\r\n6 Common services for functional partitioning\r\nPART 2\r\n7 Design Craigslist\r\n8 Design a rate-limiting service\r\n9 Design a notification/alerting service\r\n10 Design a database batch auditing service\r\n11 Autocomplete/typeahead\r\n12 Design Flickr\r\n13 Design a Content Distribution Network (CDN)\r\n14 Design a text messaging app\r\n15 Design Airbnb\r\n16 Design a news feed\r\n17 Design a dashboard of top 10 products on Amazon by sales volume\r\nAppendix A Monoliths vs. microservices\r\nAppendix B OAuth 2.0 authorization and OpenID Connect authentication\r\nAppendix C C4 Model\r\nAppendix D Two-phase commit (2PC)', 200.00, 10, 0.0, '2024-04-30 14:08:11', '2024-04-30 14:08:11'),
('b431a822-c584-462d-8e9e-a958b9a4eb0f', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 'aab3238922bcc25a6f606eb525ffdc56', '1714487059074-f38237c6-5401-41bf-b4f6-58d07fd19428.jpg', 'Engineers Survival Guide: Advice, tactics, and tricks After a decade of working at Facebook, Snapchat, and Microsoft', 0, '- Authored by Merih Taze, Senior Software Engineering Lead at Facebook (Previously Microsoft and Snapchat)\r\n\r\nThere are a lot of amazing technical books out there. But what about your life as an engineer? How you interact with others? How happy are you with your career?\r\n\r\nAre you tired of the need to put on a fake confidence show?\r\nAre you having a hard time convincing others?\r\nAre you interested in getting promoted?\r\nAre you overworked and can\'t find a way to get the help you need?\r\nAre you scared of the feedback from your peers?\r\nDo you find yourself in conflicts with no solution in sight?\r\nWant to learn the secrets of having your manager work for you?\r\nInterested in building a career you\'ll be proud to talk about?\r\n\r\nIf you\'ve been feeling alone in your journey and keep wishing you had a friend or a mentor you could get some advice about non-technical aspects, look no further!\r\n\r\nInside, you will find the summary of advice, tactics, and tricks learned the hard way through many years of working on mission-critical components, complex system designs supporting billions of users, and working with thousands of the most brilliant engineers around the world.\r\n\r\nHave a survival guide for most situations you\'ll be facing throughout your career as an engineer and learn how to play for the long game.\r\n\r\n----------------------------------------------------------------\r\n\r\nTopics Covered: Conflict resolution, finding mentors, prioritization, interviews, importance of data, visibility, failures, consensus, design discussions, how to drive meetings, adaptability, ambiguity, networking, meetings with your managers (one on ones), biggest regret, perfectionism, system design, calendar, focus blocks, office jargon, diversification, positive surroundings, being the happy coworker, working at a startup, office politics, playing for the long game', 200.00, 2, 0.0, '2024-04-30 14:24:19', '2024-04-30 14:24:19'),
('facfd8ec-7fee-43bf-959b-7d6bfba27c84', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'aab3238922bcc25a6f606eb525ffdc56', '1715111176402-287a8c02-ff6d-4b83-8fc9-06ea3e4fd92e.jpg', 'Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners', 1, 'Review\r\n\"With lessons on how to use Python to program Excel spreadsheets, crawl websites, parse PDFs and Word documents, send emails, and other productivity-boosting task automation, it\'s a stellar resource for office workers, academics, and administrators.\"\r\n―Mashable\r\n\r\n\"I think many educational resources jump levels way too quickly. One of the best I ever used was Automate the Boring Stuff with Python - that book stayed at the right level the whole way!\"\r\n―Oscar Baruffa, @OscarBaruffa\r\n\r\nPraise for the first edition of Automate the Boring Stuff with Python:\r\n\r\n\"The best part of programming is the triumph of seeing the machine do something useful. Automate the Boring Stuff with Python frames all of programming as these small triumphs; it makes the boring fun.”\r\n―Hilary Mason, Founder of Fast Forward Labs and Data Scientist in Residence at Accel\r\n\r\n“Do you need Automate the Boring Stuff with Python? Yes, if you want to enhance your workflow by using automation, this is an excellent place to start. Highly recommended.”\r\n―Network World\r\n\r\n“Valuable to have on your shelf...an extremely useful book.”\r\n―Kids, Code, and Computer Science Magazine\r\n\r\n\"Automate the Boring Stuff with Python is perfect for anyone who has menial tasks they don\'t want to spend hours doing.\"\r\n―GeekMom\r\n\r\n\"Whether you prefer working through a book, or learning by watching, or both together, Automate the Boring Stuff will have you productive in Python in no time.\"\r\n―Serdar Yegulalp, InfoWorld\r\n\r\n\"If you seriously want to know how much Python helps with automation, my favorite place is the Automate Boring Stuff with Python book, a simply awesome book.\"\r\n―Javin Paul, Hacker Noon\r\n\r\n\"This is certainly a much more engaging way to learn Python . . . it gets you all excited by the prospect of making cool little programs that will save you time.\"\r\n―Andrew Lau, AndrewLauActuary.com\r\n\r\n\"I\'ve found both the book and Udemy course of Automate the Boring Stuff with Python by Al Sweigart to be really helpful.\"\r\n―Mark S, @Awful_Curious\r\n\r\n\"Best Python book you can buy today.\"\r\n―Rodrigo Ribeiro, @mcapablanca\r\nAbout the Author\r\nAl Sweigart is a professional software developer who teaches programming to kids and adults. Sweigart has written several bestselling programming books for beginners, including Automate the Boring Stuff with Python, Invent Your Own', 200.00, 10, 0.0, '2024-05-07 19:46:16', '2024-05-07 19:46:16');

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
('25390fd1-5e7c-4e9d-b028-2068500df343', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 'b431a822-c584-462d-8e9e-a958b9a4eb0f', 1, '2024-05-03 15:14:13', '2024-05-03 15:14:13'),
('5093f8cb-78d1-4841-893d-1c975cafbd4f', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', '577c7427-6666-44ea-94ad-781016753974', 1, '2024-05-05 10:37:31', '2024-05-05 10:37:31'),
('b8fbcfd7-236c-4710-861d-329776d01d2f', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 'ab6a09cf-33cc-4e8a-8cbf-0b3e8d463c77', 1, '2024-05-05 10:37:28', '2024-05-05 10:37:28'),
('d2521aa5-e246-42fa-af81-68b857a9d8fd', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', '7a856b48-8a3b-411b-885f-e6b29e4ead12', 1, '2024-05-05 10:37:25', '2024-05-05 10:37:25'),
('e1aa0754-9a05-4389-8053-0319a0f52209', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 'ab6a09cf-33cc-4e8a-8cbf-0b3e8d463c77', 1, '2024-05-03 15:14:08', '2024-05-03 15:14:08'),
('e93f7978-2e71-4ffb-ab2c-6ca049330e7e', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '7a856b48-8a3b-411b-885f-e6b29e4ead12', 1, '2024-05-03 15:14:03', '2024-05-03 15:14:03');

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
('0ffb83c6dd9b011c33f305c48ce06eb9', 'port_said-بورسعيد', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('170f2b1579f36b20a30fbffac580b496', 'matrouh-مطروح', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('197036e0ce3c752d6f80250d1067c359', 'alexandria-الإسكندرية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('23b0107def8aa58e45b058d7b264516e', 'suez_canal-قناة السويس', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('3e9182422d699c6b5af6f8766a0d9f4b', 'red_sea-البحر الأحمر', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('427e4d938cf16b0f323986284c77a59b', 'beheira-البحيرة', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('43ac291ce615509c0094476fe95a54e3', 'aswan-أسوان', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('46923339430cc044f6785983e522375a', 'ismailia-الإسماعيلية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('5b44658e7f88e12153ff2e1f53d537ec', 'minya-المنيا', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('665d55a2180a3b09b362aa925b08b882', 'fayoum-الفيوم', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('7ae9137c49be6b714dede3545e5b289d', 'qalyubia-القليوبية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('8c13a5af9e164238d296328d7d7c8ed2', 'south_sinai-جنوب سيناء', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('9abc573832f07f0b31a2f32397136741', 'luxor-الأقصر', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('a15a42b243c35e7330c6b4e8c9a1c365', 'dakahlia-الدقهلية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('a6cee9364015d4e821bcee93f5d4b6c3', 'giza-الجيزة', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('aa799222a96091ae8abf44a26091337b', 'asyut-أسيوط', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('ab512381ed8aaaabc78740b91d525c79', 'sharqia-الشرقية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('d1ccc337c0e60c755782fafd99530011', 'sohag-سوهاج', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('d59850179d49e672b23e25187b9260e9', 'kafr_el_sheikh-كفر الشيخ', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('e1ac11dd9d1de179df37b7b8563a5530', 'suez-السويس', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('e36276fffc39095a8a83fb01151cd8a0', 'qena-قنا', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('e472de76ea3f53485bef9633ad6cafa2', 'monufia-المنوفية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('e76acfddb734fac742328688f7a5b436', 'gharbia-الغربية', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('e7dcf858a57f0cfe1d34994fd3c2469b', 'north_sinai-شمال سيناء', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('ede973486ee9eccb9fd6db1c2fb3fda0', 'damietta-دمياط', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('f409afdfef028b5e450b85885744befa', 'cairo-القاهرة', '2024-04-27 07:31:31', '2024-04-27 07:31:31'),
('f6d6bdd406419c34881a715890f72e09', 'new_valley-الوادي الجديد', '2024-04-27 07:31:31', '2024-04-27 07:31:31');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(),current_timestamp())),
  `user_id` varchar(256) NOT NULL,
  `seller_id` varchar(256) NOT NULL,
  `shipping` decimal(10,1) DEFAULT 0.0,
  `status` varchar(256) NOT NULL DEFAULT 'pending',
  `address_id` varchar(256) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `seller_id`, `shipping`, `status`, `address_id`, `created`, `updated`) VALUES
('2ea5494b-1296-4ac3-8627-8834381cc98c', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 60.0, 'Processing', 'f5b0f67b198fd9f75fd692935e067f14', '2024-05-06 19:16:42', '2024-05-06 19:16:42'),
('494feecb-6064-4ecf-a146-e8cf97af39ab', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 0.0, 'pending', '08e458108610a910063044c509290924', '2024-05-01 05:13:29', '2024-05-01 05:13:29'),
('53f152e9-5d2d-4502-9061-732046626a40', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 30.0, 'Processing', '91f0969d7742ece309e15f9fde8e3020', '2024-05-01 08:09:59', '2024-05-01 08:09:59'),
('7c3e9fa9-7711-458f-bca5-4f51eb0b081b', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 30.0, 'Processing', '4248e57c3f46b4d53e206c3e0a1c2e6f', '2024-05-02 03:01:23', '2024-05-02 03:01:23'),
('86e95767-0686-4000-afa4-51abe7c17de9', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 55.0, 'Delivered', '91f0969d7742ece309e15f9fde8e3020', '2024-04-30 15:10:48', '2024-04-30 15:10:48'),
('8b10c8a8-b351-4ef0-a7b6-491262c90384', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 0.0, 'pending', '91f0969d7742ece309e15f9fde8e3020', '2024-05-02 04:04:38', '2024-05-02 04:04:38'),
('9244c64f-fa47-45bc-bd40-ae8515ce1241', '1e08a92d-f9f2-4b0b-97a9-30e5ddd3f3c4', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 30.0, 'Cancelled', '1cd79e8e2836d9e2448eb72765cedba8', '2024-05-02 04:13:28', '2024-05-02 04:13:28'),
('a2580614-9eda-4bd0-9e42-b7de6c17e4fb', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 0.0, 'pending', '4248e57c3f46b4d53e206c3e0a1c2e6f', '2024-05-02 03:19:10', '2024-05-02 03:19:10'),
('afb1be2e-1772-4040-ab56-a1bf52b15534', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 0.0, 'pending', '4248e57c3f46b4d53e206c3e0a1c2e6f', '2024-05-02 03:59:51', '2024-05-02 03:59:51'),
('c4c4fa45-e44c-49bb-944c-7ef1b05bda0a', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 0.0, 'pending', '91f0969d7742ece309e15f9fde8e3020', '2024-05-01 14:59:16', '2024-05-01 14:59:16'),
('d4b05500-7dd5-4005-8c02-c7e3408d5db7', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 0.0, 'pending', '4248e57c3f46b4d53e206c3e0a1c2e6f', '2024-05-02 03:18:54', '2024-05-02 03:18:54'),
('f0300b8c-1642-4dd4-bae5-b1b4a450a38b', '3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 0.0, 'Cancelled', '4248e57c3f46b4d53e206c3e0a1c2e6f', '2024-05-03 12:25:43', '2024-05-03 12:25:43');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` varchar(256) NOT NULL DEFAULT md5(concat(rand(),current_timestamp())),
  `book_id` varchar(256) NOT NULL,
  `order_id` varchar(256) NOT NULL,
  `count` int(11) NOT NULL,
  `status` varchar(256) DEFAULT 'pending',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `book_id`, `order_id`, `count`, `status`, `created`, `updated`) VALUES
('305cf4911c3668288541b50e27416916', '12340674-aa55-402b-abf7-aa37b37f7e2e', 'd4b05500-7dd5-4005-8c02-c7e3408d5db7', 1, 'pending', '2024-05-02 03:18:54', '2024-05-02 03:18:54'),
('32e8cc6b19bec38292b8e8e147039707', '12340674-aa55-402b-abf7-aa37b37f7e2e', '8b10c8a8-b351-4ef0-a7b6-491262c90384', 1, 'pending', '2024-05-02 04:04:38', '2024-05-02 04:04:38'),
('417417f7042e4fecb42ca681f1e0e06a', 'b431a822-c584-462d-8e9e-a958b9a4eb0f', 'f0300b8c-1642-4dd4-bae5-b1b4a450a38b', 1, 'pending', '2024-05-03 12:25:43', '2024-05-03 12:25:43'),
('5b1d17f5bc09cef0b336e6252cac3acc', '577c7427-6666-44ea-94ad-781016753974', 'f0300b8c-1642-4dd4-bae5-b1b4a450a38b', 1, 'pending', '2024-05-03 12:25:43', '2024-05-03 12:25:43'),
('6693e7056c37242dafbd6217eba2688f', '7a856b48-8a3b-411b-885f-e6b29e4ead12', '2ea5494b-1296-4ac3-8627-8834381cc98c', 1, 'pending', '2024-05-06 19:16:42', '2024-05-06 19:16:42'),
('75a51654992677c441d49c9bcbbf4b8b', '12340674-aa55-402b-abf7-aa37b37f7e2e', '53f152e9-5d2d-4502-9061-732046626a40', 1, 'pending', '2024-05-01 08:09:59', '2024-05-01 08:09:59'),
('7a575835e3f5826ba29d6e8fec3aca00', '12340674-aa55-402b-abf7-aa37b37f7e2e', 'c4c4fa45-e44c-49bb-944c-7ef1b05bda0a', 1, 'pending', '2024-05-01 14:59:16', '2024-05-01 14:59:16'),
('89fb954c0956345e16b3e1f673c9b15c', '12340674-aa55-402b-abf7-aa37b37f7e2e', 'afb1be2e-1772-4040-ab56-a1bf52b15534', 1, 'pending', '2024-05-02 03:59:51', '2024-05-02 03:59:51'),
('af917ba0edd4395d779ccacd1daeca83', '12340674-aa55-402b-abf7-aa37b37f7e2e', 'a2580614-9eda-4bd0-9e42-b7de6c17e4fb', 1, 'pending', '2024-05-02 03:19:10', '2024-05-02 03:19:10'),
('b5ac403a91e9943ff612e2bf877f5973', '12340674-aa55-402b-abf7-aa37b37f7e2e', '9244c64f-fa47-45bc-bd40-ae8515ce1241', 1, 'pending', '2024-05-02 04:13:28', '2024-05-02 04:13:28'),
('e20be1cd3f2d2eea593476612a6c1e63', '12340674-aa55-402b-abf7-aa37b37f7e2e', '7c3e9fa9-7711-458f-bca5-4f51eb0b081b', 1, 'pending', '2024-05-02 03:01:23', '2024-05-02 03:01:23'),
('e58fa6b85c0e416df565dd1846a0d206', '7a856b48-8a3b-411b-885f-e6b29e4ead12', '494feecb-6064-4ecf-a146-e8cf97af39ab', 1, 'pending', '2024-05-01 05:13:29', '2024-05-01 05:13:29'),
('f50bc0559c6f94b74a958cfff931a66b', 'af0ebc4d-f28d-485f-965e-bff2c0721145', '86e95767-0686-4000-afa4-51abe7c17de9', 1, 'pending', '2024-04-30 15:10:48', '2024-04-30 15:10:48');

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
('04f7cd3d-68ad-481f-9a1a-add0b1d212dd', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'b431a822-c584-462d-8e9e-a958b9a4eb0f', 5, '`book is good`\n\n![alt image][https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS546L7Wu7KsKsoiEtEfjzFkk4nwh75jibz-g&s]', '2024-05-07 19:53:12', '2024-05-07 19:53:12'),
('3d805164-a377-4408-8559-1a5b6bce3886', '73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', '7a856b48-8a3b-411b-885f-e6b29e4ead12', 4, 'I read Alex’s first book when preparing for my job change and it helped me land a job that I really enjoy. When I heard there was volume 2, I immediately bought it and read it. After doing interviews on both sides as a candidate and an interviewer, I could say these two books are truly useful. This volume 2 book even has broader and deeper technical content than volume 1. \n\nI particularly liked the proximity service and hotel reservation chapters. ', '2024-04-30 14:48:15', '2024-04-30 14:48:15'),
('4335955a-b403-4f68-9882-35d57b93ebab', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'b431a822-c584-462d-8e9e-a958b9a4eb0f', 5, '`book is good`\n\n![alt image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS546L7Wu7KsKsoiEtEfjzFkk4nwh75jibz-g&s)', '2024-05-07 19:53:34', '2024-05-07 19:53:34'),
('49e140a9-79d7-4508-9b46-55896009e47b', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', '7a856b48-8a3b-411b-885f-e6b29e4ead12', 4, '# جيد\nهذا الكتاب جد و كنت مستمتع بالقراءه\n', '2024-05-06 19:15:14', '2024-05-06 19:15:14'),
('ce1785c3-798b-44d2-a720-74fc3989c543', 'e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'b431a822-c584-462d-8e9e-a958b9a4eb0f', 4, 'استلمت الحساب البوم شكرا \n![image from book](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVTOurTyuR_uybcCH0UHJJWNYZPSkH1QHxsA&s)', '2024-05-07 19:55:00', '2024-05-07 19:55:00');

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
  `suspended` int(11) DEFAULT 0,
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `created`, `suspended`, `updated`, `admin`) VALUES
('1e08a92d-f9f2-4b0b-97a9-30e5ddd3f3c4', 'ahmedali', 'melanthacoffee@fthcapital.com', '$2b$10$D8xKDVpgE3MrPBtppJP0VOAcmh0JJvxVrLDvd9nylzvHQoiiQODZC', 'avatar.png', '2024-05-02 04:13:02', 1, '2024-05-03 07:19:59', 0),
('2226690d-ddd6-4f48-ac8c-a72a75fab6c8', 'ahmedali', 'cherie637@fthcapital.com', '$2b$10$Fkirh5D1EwX4yK.tcUYPAOJ2wHUT9rDBeHphIxpcs1zJg6/rqhEPe', 'avatar.png', '2024-04-30 14:38:20', 0, '2024-04-30 14:38:20', 0),
('3f4a2e3e-2c5e-496b-b4cc-33106a2acc69', 'jzdzqpmt', 'surprising3039@fthcapital.com', '$2b$10$dFMd6bT2/0cA4KslB/U2UuzIv.eJAnBWMbyuXL3Dq2.oCBKR..kQi', 'avatar.png', '2024-04-30 14:07:41', 0, '2024-04-30 14:07:41', 0),
('5344a9ec-7911-4967-9732-7e4ffc01626f', 'ahmedali', 'gusti7616@fthcapital.com', '$2b$10$fvl5SY9/UmySOBIlsi3siu1.u3//3m/BoA3aEg1hIlKdoPpu26Hf2', 'avatar.png', '2024-05-04 04:45:40', 0, '2024-05-04 04:45:40', 0),
('58fb4cc7-4753-47c3-898a-e18f43be29ec', 'admin', '7461morena@fthcapital.com', '$2b$10$CfmXTcUcJjA6IAfpea1q0ewQyTA.9BhztKWD1vOKyC1w4NFCmq2ji', 'avatar.png', '2024-05-04 04:47:24', 0, '2024-05-04 04:47:24', 0),
('6444bbc0-ac7d-448f-a22d-53620956b648', 'ahmedali', 'hah5d133qf@elatter.com', '$2b$10$UTigSjomBazZFd9A/YwsweRZp4i1nxhmMq38jczEnxQ66eW2onv4S', 'avatar.png', '2024-05-04 06:45:30', 0, '2024-05-04 06:45:30', 0),
('73b6f4f3-e529-42a9-afd7-e6d4cd04c2dd', 'ahmedali', 'heidi4873@fthcapital.com', '$2b$10$2t80Goalrt0YX0qthfmgF.gC30JUw/cufMtwSUwWirmoQJb6RvyTy', 'avatar.png', '2024-04-30 14:09:14', 0, '2024-04-30 14:09:14', 0),
('e4b0f587-36bc-46cf-99f4-b07c78de76e3', 'abdelrahmaneisa625', 'abdelrahmaneisa625@gmail.com', '$2b$10$fIhHWoZJkc7gXBf6fPb5x.VAQTxwZ22kVWCB8ROHbEsZ.csTjFNbO', 'avatar.png', '2024-05-06 19:13:18', 0, '2024-05-06 19:13:18', 0),
('e68587d9-dc6d-425b-b0d9-29f932fcd5ee', 'admin', 'admin@gmail.com', '$2b$10$kSJTLI82XOSM2OcEb27SueaRZeok2lWti6ko5xwfa.Z6njAusix9u', 'avatar.png', '2024-05-02 09:00:53', 0, '2024-05-02 09:00:53', 1),
('ffe86ef7-6c9f-48a6-92eb-a93da4b25390', 'jzdzqpmt', 'indigo7685@awgarstone.com', '$2b$10$dvDAerzzwHmsASYkHaZ9fOgqcUd25nlwKd53YyRLPk1phvfmHWOKW', 'avatar.png', '2024-04-30 14:06:37', 0, '2024-05-03 06:20:25', 0);

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
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `order_id` (`order_id`);

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
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

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
