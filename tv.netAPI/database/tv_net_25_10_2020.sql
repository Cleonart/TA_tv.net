-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2020 at 04:23 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tv.net`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `accounts_id` varchar(100) NOT NULL,
  `accounts_name` varchar(100) NOT NULL,
  `accounts_username` varchar(100) NOT NULL,
  `accounts_password` varchar(100) NOT NULL,
  `accounts_service` varchar(100) NOT NULL,
  `accounts_join_date` varchar(100) NOT NULL,
  `accounts_lat` varchar(100) NOT NULL,
  `accounts_long` varchar(100) NOT NULL,
  `officer_id` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`accounts_id`, `accounts_name`, `accounts_username`, `accounts_password`, `accounts_service`, `accounts_join_date`, `accounts_lat`, `accounts_long`, `officer_id`, `status`) VALUES
('CUS94766598', 'Chrisdityra Lengkey', '', '', 'S1312121', '24-10-2020', '1.0488204258341227', '124.31764449982018', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` varchar(100) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_nominal` int(11) NOT NULL,
  `service_information` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_name`, `service_nominal`, `service_information`) VALUES
('S1312121', 'Phoenix', 100000, '');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` varchar(100) NOT NULL,
  `transaction_customer_id` varchar(100) NOT NULL,
  `transaction_officer_id` varchar(100) NOT NULL,
  `transaction_day` int(11) NOT NULL,
  `transaction_month` int(11) NOT NULL,
  `transaction_year` int(11) NOT NULL,
  `transaction_nominal` int(11) NOT NULL,
  `transaction_admin` int(11) NOT NULL,
  `transaction_status` varchar(100) NOT NULL,
  `transaction_note` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `transaction_customer_id`, `transaction_officer_id`, `transaction_day`, `transaction_month`, `transaction_year`, `transaction_nominal`, `transaction_admin`, `transaction_status`, `transaction_note`) VALUES
('TRC43415274', 'CUS94766598', '', 0, 2, 2020, 100000, 50000, 'MENUNGGU PEMBAYARAN', 'PEMASANGAN BARU');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `trx_detail_id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `trx_payment_month` varchar(100) NOT NULL,
  `trx_payment_nominal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`accounts_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`trx_detail_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `trx_detail_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
