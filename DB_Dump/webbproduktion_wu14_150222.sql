-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Värd: localhost
-- Skapad: 22 feb 2015 kl 23:48
-- Serverversion: 5.5.41
-- PHP-version: 5.4.36-0+deb7u3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databas: `webbproduktion_wu14`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pid`),
  KEY `user_id` (`user_id`),
  KEY `img_id` (`img_id`),
  KEY `video_id` (`video_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumpning av Data i tabell `pages`
--

INSERT INTO `pages` (`pid`, `title`, `content`, `user_id`, `img_id`, `video_id`, `created`) VALUES
(1, 'Start', 'Hej och välkomna till stället som fångar dom mest extraordinära nyheterna från nätet. Vi jaga alltid efter det färskaste på, och utanför nätet. Har du några tips? Hör då av dig till oss......Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 14:47:11'),
(2, 'Om oss', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 14:48:13'),
(3, 'Hitta till oss', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin. Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 14:48:45'),
(4, 'Senaste nytt', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:36:35'),
(6, 'Nyheter 2015 02 22', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:40:26'),
(7, 'Nyheter 2015 02 21', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:41:12'),
(8, 'Nyheter 2015 02 20', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:42:16'),
(9, 'Arkivet', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:42:48'),
(10, 'Kontakta oss', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:43:40'),
(11, '2014', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:44:52'),
(12, 'Januari', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:45:23'),
(13, 'Februari', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:45:59'),
(15, 'Mars', 'Bacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.\nBacon ipsum dolor sit amet shoulder prosciutto capicola porchetta jerky doner short loin beef ribs pig tenderloin ribeye corned beef leberkas bresaola tri-tip. Chuck bacon biltong pork belly spare ribs bresaola sirloin pork loin shankle landjaeger. Drumstick swine leberkas meatloaf beef ribs chicken tail filet mignon bresaola ribeye. Biltong pork belly short ribs, drumstick turducken pastrami ground round sirloin doner shankle kevin.', 1, NULL, NULL, '2015-02-22 22:47:37');

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `pages_ibfk_2` FOREIGN KEY (`img_id`) REFERENCES `images` (`iid`),
  ADD CONSTRAINT `pages_ibfk_3` FOREIGN KEY (`video_id`) REFERENCES `videos` (`vid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
